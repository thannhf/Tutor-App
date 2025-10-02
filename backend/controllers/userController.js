import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import tutorModel from "../models/tutorModel.js";
import sessionModel from "../models/sessionModel.js";
import Stripe from "stripe";

// Stripe gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = process.env.CURRENCY;

// API to reigster user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Credential" });
    }

    // Checking if email is valid
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email is not valid" });
    }

    // Checking the password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong Password" });
    }

    // Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    // checking if user exists
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR GET USER PROFILE
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR UPDATE USER PROFILE
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, location, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      location: JSON.parse(location),
      dob,
      gender,
    });
    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR BOOK SESSION
const bookSession = async (req, res) => {
  try {
    const userId = req.userId;
    const { tutId, slotDate, slotTime } = req.body;
    const tutData = await tutorModel.findById(tutId).select("-password");

    if (!tutData.available) {
      return res.json({ success: false, message: "tutor not available" });
    }

    let slots_booked = tutData.slots_booked;

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    const sessionData = {
      userId,
      tutId,
      userData,
      tutData,
      slotDate,
      slotTime,
      amount: tutData.fees,
      date: Date.now(),
    };
    const newSession = new sessionModel(sessionData);
    await newSession.save();

    // save new slots data in tutData
    await tutorModel.findByIdAndUpdate(tutId, { slots_booked });

    res.json({ success: true, message: "Session Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user sessions for frontend
const listSessions = async (req, res) => {
  try {
    const userId = req.userId;
    const sessions = await sessionModel.find({ userId });

    res.json({ success: true, sessions });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR CANCEL THE SESSION
const cancelSession = async (req, res) => {
  try {
    const userId = req.userId;
    const { sessionId } = req.body;
    const sessionData = await sessionModel.findById(sessionId);

    // verify session User
    if (sessionData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    await sessionModel.findByIdAndUpdate(sessionId, { cancelled: true });

    // Release tutor slot
    const { tutId, slotDate, slotTime } = sessionData;
    const tutData = await tutorModel.findById(tutId);
    let slots_booked = tutData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await tutorModel.findByIdAndUpdate(tutId, { slots_booked });

    res.json({ success: true, message: "Session cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for stripe payment
const paymentStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { sessionId } = req.body;
    const origin = req.headers.origin;
    const sessionData = await sessionModel.findById(sessionId);

    if (!sessionData || sessionData.cancelled) {
      return res.json({
        success: false,
        message: "Session not found or cancelled",
      });
    }

    // verify session user
    if (sessionData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized access" });
    }
    const amount = sessionData.amount * 100; //amount in cents

    // Create Stripe Checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `Session with ${sessionData.tutData.name}`,
              description: `Subject: ${sessionData.tutData.subject}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/my-sessions?success=true&sessionId=${sessionId}`,
      cancel_url: `${origin}/my-sessions?success=false`,
    });

    res.json({ success: true, session_url: stripeSession.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to verify stripe payment {temporary method - secure method is using webhooks}
const verifyStripe = async(req, res)=>{
  try {
    const {sessionId} = req.query
    console.log("Verifying payment for session ID:", sessionId)
    const session = await sessionModel.findById(sessionId)

    if(!session){
      console.log("Session not found for ID:", sessionId)
      return res.json({success:false, message:"Session not found"})
    }

    // update payment status to true
    session.payment = true
    await session.save()
    console.log('Payment status updated for session:', session)

    res.json({success:true, message: "Payment status updated"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookSession,
  listSessions,
  cancelSession,
  paymentStripe,
  verifyStripe,
};

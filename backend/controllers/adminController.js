import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import tutorModel from "../models/tutorModel.js";
import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModel.js";
import userModel from "../models/userModel.js";

// API for adding a tutor for admin panel
const addTutor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      qualification,
      subject,
      experience,
      about,
      fees,
      location,
    } = req.body;

    const imageFile = req.file;
    if (
      !name ||
      !email ||
      !password ||
      !qualification ||
      !subject ||
      !experience ||
      !about ||
      !fees ||
      !location
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email address",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // handling image
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    } else {
      // provide a default image url if no file is uploaded
      imageUrl = "http://placeholder.co/400";
    }

    const tutorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      qualification,
      subject,
      experience,
      about,
      fees,
      location: JSON.parse(location),
      available: true,
      date: Date.now(),
    };

    const newTutor = await tutorModel(tutorData);
    await newTutor.save();

    res.json({ success: true, message: "tutor added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR Get All Tutors list for the admin panel
const allTutors = async (req, res) => {
  try {
    const tutors = await tutorModel.find({}).select("-password");
    res.json({ success: true, tutors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API TO get all sessions list
const sessionsAdmin = async (req, res) => {
  try {
    const sessions = await sessionModel.find({});
    res.json({ success: true, sessions });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel the session
const sessionCancel = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const sessionData = await sessionModel.findById(sessionId);

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

// api to get dashboard data
const adminDashboard = async (req, res) => {
  try {
    const tutors = await tutorModel.find({});
    const users = await userModel.find({});
    const sessions = await sessionModel.find({});

    const dashData = {
      tutors: tutors.length,
      sessions: sessions.length,
      clients: users.length,
      latestSessions: sessions.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addTutor,
  loginAdmin,
  allTutors,
  sessionsAdmin,
  sessionCancel,
  adminDashboard,
};

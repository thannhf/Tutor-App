import React, { useContext, useState } from "react";
import upload_icon from "../../assets/upload_icon.png";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const AddTutor = () => {
  // Local state hooks for form fields
  const [tutImg, setTutImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [subject, setSubject] = useState("Science");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [qualification, setQualification] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const { atoken } = useContext(AdminContext);
  const { backendUrl } = useContext(AppContext);

  // Handle image upload
  const handleImageChange = (e) => {
    setTutImg(e.target.files[0]);
  };

  // handle for submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!tutImg) {
        return toast.error("Please select an image first.");
      }

      // Prepare data for backend
      const formData = new FormData();
      formData.append("image", tutImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("subject", subject);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("qualification", qualification);
      formData.append("location", JSON.stringify({ city, country }));

      // send request to backend
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-tutor",
        formData,
        {headers: {atoken}}
      );
      if(data.success) {
        toast.success(data.message)
        // Reset Form
        setTutImg(false)
        setName('')
        setEmail("")
        setPassword('')
        setExperience("1 Year")
        setFees("")
        setAbout("")
        setSubject("Science")
        setQualification("")
        setCity("")
        setCountry("")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  return (
    <div className="px-2 sm:px-8 py-12 h-screen sm:pl-[23%]">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row gap-4 lg:gap-12 medium-14"
      >
        {/* LEFT SIDE */}
        <div className="flex gap-y-3 flex-col">
          <div className="w-full">
            <h5 className="h5">Tutor Name</h5>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="write here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-full"
            />
          </div>
          <div className="w-full">
            <h5 className="h5">Tutor Email</h5>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="write here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-full"
            />
          </div>
          <div className="w-full">
            <h5 className="h5">Tutor Password</h5>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="write here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-full"
            />
          </div>
          <div className="w-full">
            <h5 className="h5">About Tutor</h5>
            <textarea
              rows={5}
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              placeholder="write here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-full"
            />
          </div>
          <div className="w-full">
            <h5 className="h5">Tutor Address</h5>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                onChange={(e) => setCity(e.target.vaue)}
                value={city}
                placeholder="write City..."
                className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-full"
              />
              <input
                type="text"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                placeholder="write Country..."
                className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="hidden lg:block btn-dark !rounded mt-3 max-w-44 sm:w-full"
          >
            Add Tutor
          </button>
        </div>
        {/* Right Side */}
        <div className="flex gap-y-3 flex-col">
          {/* Qualification */}
          <div className="w-full">
            <h5 className="h5">Qualification</h5>
            <input
              type="text"
              onChange={(e) => setQualification(e.target.value)}
              value={qualification}
              placeholder="Qualification..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-full"
            />
          </div>
          {/* Subject */}
          <div className="w-full">
            <h5 className="h5">Subject</h5>
            <select
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
              className="px-3 py-2 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 sm:w-full"
            >
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Languages">Languages</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Arts">Arts</option>
              <option value="Computer">Computer</option>
            </select>
          </div>
          {/* Experience */}
          <div className="w-full">
            <h5 className="h5">Experience</h5>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="px-3 py-2 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 sm:w-full"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
              <option value="11 Year">11 Year</option>
            </select>
          </div>
          {/* Fee */}
          <div className="w-full">
            <h5 className="h5">Fees</h5>
            <input
              type="number"
              onChange={(e)=>setFees(e.target.value)}
              value={fees}
              min={5}
              placeholder="Fees..."
              className="px-3 py-2 ring-1 ring-slate-900/10 rounded bg-tertiary/5 mt-1 w-20"
            />
          </div>
          {/* Image */}
          <div className="w-full">
            <h5 className="h5">Image</h5>
            <label htmlFor="tutImg">
              <img
                src={tutImg ? URL.createObjectURL(tutImg) : upload_icon}
                alt=""
                className="w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-light rounded-lg"
              />
              <input onChange={handleImageChange} type="file" name="tutImg" id="tutImg" hidden />
            </label>
          </div>
          <button
            type="submit"
            className="block lg:hidden btn-dark !rounded mt-3 max-w-44 sm:w-full"
          >
            Add Tutor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTutor;

import React, { useContext, useEffect, useState } from "react";
import tutor1 from "../assets/tutor1.png";
import tutor2 from "../assets/tutor2.png";
import tutor3 from "../assets/tutor3.png";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { subjectsData } from "../assets/data";
import { FaStar } from "react-icons/fa";

const Tutors = () => {
  const { subject: subjectParam } = useParams();
  const { navigate, tutors } = useContext(AppContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTutors, setFilteredTutors] = useState([]);

  // handle subject click
  const handleSubjectClick = (subjectName) => {
    navigate(`/tutors/${subjectName}`);
  };

  // Filter the tutors based on the selected subject
  useEffect(() => {
    if (subjectParam) {
      setFilteredTutors(
        tutors.filter((tutor) => tutor.subject === subjectParam)
      );
    } else {
      setFilteredTutors(tutors);
    }
  }, [subjectParam, tutors]);

  return (
    <div className="max-padd-container py-28">
      {/* title */}
      <div className="max-w-xl mx-auto text-center pb-12">
        <div className="h3">
          <div className="inline-flex flexCenter gap-2 flex-wrap capitalize">
            Get Started With a Skilled tutor
            <div className="flex items-center -space-x-3">
              <img
                src={tutor1}
                alt=""
                width={44}
                height={44}
                className="rounded-full shadow-sm ring-1 ring-slate-900/5 object-cover aspect-square"
              />
              <img
                src={tutor2}
                alt=""
                width={44}
                height={44}
                className="rounded-full shadow-sm ring-1 ring-slate-900/5 object-cover aspect-square"
              />
              <img
                src={tutor3}
                alt=""
                width={44}
                height={44}
                className="rounded-full shadow-sm ring-1 ring-slate-900/5 object-cover aspect-square"
              />
            </div>
          </div>
        </div>
        <p>
          Our platform is designed to empower professional tutors who are
          passionate about sharing knowledge and shaping futures.
        </p>
      </div>
      {/* Tabs */}
      <button
        onClick={() => setShowFilters((prev) => !prev)}
        className={`btn-secondary !py-1.5 mb-5 !rounded sm:hidden transition-all`}
      >
        Filters
      </button>
      <div
        className={`mb-12 flex-col sm:flex-row max-sm:gap-y-12 rounded overflow-hidden max-w-5xl mx-auto ${
          showFilters ? "flexCenter" : "hidden sm:flexCenter"
        }`}
      >
        {subjectsData.map((subject, i) => (
          <button
            onClick={() => handleSubjectClick(subject.name)}
            key={i}
            className={`p-4 medium-15 cursor-pointer h-10 w-full bg-deep text-white flexStart sm:flexCenter border-2 border-transparent ${
              subject.name === subjectParam
                ? "border-b-2 border-b-secondary !text-secondary"
                : ""
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>
      {/* container / Tutor Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-x-10 sm:gap-y-12">
        {filteredTutors?.map((tutor, i) => (
          <div key={i} className="rounded-xl overflow-hidden relative group">
            <div>
              <img src={tutor.image} alt="" className="overflow-hidden" />
              <div className="absolute top-0 left-0 h-full w-full bg-black/15"></div>
            </div>
            <div className="p-3 absolute bottom-0 text-white group-hover:hidden">
              <span className="flex items-baseline gap-x-1 medium-14">
                <FaStar className="text-yellow-200" />
                4.8
              </span>
              <h5 className="h5">{tutor.name}</h5>
              <p className="text-white/80">{tutor.subject}</p>
            </div>
            <div className="absolute inset-0 flex items-end bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <div className="flex flex-col w-full gap-2 p-4">
                <button
                  onClick={() => {
                    navigate(`/session/${tutor._id}`), scrollTo(0, 0);
                  }}
                  className="btn-white !font-bold !text-xs !p-2"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;

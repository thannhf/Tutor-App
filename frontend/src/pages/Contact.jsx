import React from "react";
import {
  FaEnvelope,
  FaHeadphones,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

const Contact = () => {
  return (
    <section className="max-padd-container my-24">
      {/* contact form and details */}
      <div className="flex flex-col xl:flex-row gap-20 py-6">
        {/* contact form */}
        <div>
          {/* title */}
          <div className="max-w-lg pb-16">
            <h3 className="h3 capitalize">
              Get <span className="font-[400]">in Touch</span>
            </h3>
            <p>
              Have question or need help? Send us a message, and we'll get back
              to you as soon as possible.
            </p>
          </div>
          <form>
            <div className="flex gap-x-5">
              <div className="w-1/2 mb-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-white rounded"
                />
              </div>
              <div className="w-1/2 mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-white rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message here"
                className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-white rounded resize-none"
              ></textarea>
            </div>
            <button type="submit" className="btn-secondary !rounded shadow-sm">
              Send Message
            </button>
          </form>
        </div>
        {/* contact details */}
        <div>
          {/* title */}
          <div className="max-w-lg pb-16">
            <h3 className="h3 capitalize">
              Contact <span className="font-[400]">Details</span>
            </h3>
            <p>
              We are always here to assist you! Feel free to reach out to us
              through any of the following methods
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h5 className="h5 capitalize mr-4">Location:</h5>
              <p className="flexStart gap-x-2">
                <FaLocationDot /> 1234 Elm Street Springfield, IL USA
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="h5 capitalize mr-4">email:</h5>
              <p className="flexStart gap-x-2">
                <FaEnvelope /> info@primetutor.com
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="h5 capitalize mr-4">phone:</h5>
              <p className="flexStart gap-x-2">
                <FaPhone /> +1 (800) 123-4567
              </p>
            </div>
            <div className="flex flex-col">
              <h5 className="h5 capitalize mr-4">Support:</h5>
              <p className="flexStart gap-x-2">
                <FaHeadphones /> 24/7 Support is open
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

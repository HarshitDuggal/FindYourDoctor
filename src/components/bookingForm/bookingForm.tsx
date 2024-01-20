import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import "./bookingFormStyles.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    city: "",
    company: "",
    chiefComplaints: "",
    previousExperience: "",
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && formData.name && formData.phoneNumber) {
      setStep((prevStep) => prevStep + 1);
    } else if (
      step === 2 &&
      formData.age &&
      formData.city &&
      formData.company
    ) {
      setStep((prevStep) => prevStep + 1);
    } else if (step === 3 && formData.chiefComplaints) {
      if (formData.age > "40") {
        setStep((prevStep) => prevStep + 1);
      } else {
        setStep((prevStep) => prevStep + 2);
      }
    } else if (step === 4 && formData.previousExperience) {
      setStep((prevStep) => prevStep + 1);
    } else {
      toast.error("Please fill all the required fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleFormSubmit = () => {
    setStep(5);
  };

  return (
    <>
      <motion.div
        className="form-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4 }}
      >
        {step !== 5 && (
          <section className="heading-container">
            <h4>
              Book an Appointment for{" "}
              <span className="line-through">Rs 1000</span>{" "}
              <span className="free-color">FREE</span>{" "}
            </h4>
            <p>60+ Expert Physiotherapists for 200+ Conditions</p>
          </section>
        )}
        <ToastContainer />
        {step === 1 && (
          <>
            <input
              required
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              required
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <button onClick={handleNextStep}>Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              required
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
            />
            <input
              required
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              required
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleInputChange}
            />
            <button onClick={handleNextStep}>Next</button>
          </>
        )}
        {step === 3 && (
          <>
            <input
              required
              type="text"
              name="chiefComplaints"
              placeholder="Chief Complaints"
              value={formData.chiefComplaints}
              onChange={handleInputChange}
            />
            <button onClick={handleNextStep}>Next</button>
          </>
        )}

        {step === 4 && (
          <>
            <input
              required
              type="text"
              name="previousExperience"
              placeholder="Any previous experience with physiotherapy"
              value={formData.previousExperience}
              onChange={handleInputChange}
            />
            <button
              onClick={handleFormSubmit}
              disabled={!formData.previousExperience}
            >
              Submit
            </button>
          </>
        )}
        {step === 5 && (
          <motion.div
            animate={{ scale: 1.1 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              color: "white",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IoCheckmarkDoneCircle size={80} />
            <div>Recommended Doctors coming your way</div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default BookingForm;

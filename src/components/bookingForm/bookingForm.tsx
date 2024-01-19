import { useState } from "react";
import { motion } from "framer-motion";
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
  const [formFilled, setFormFilled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = () => {
    if (formData.name && formData.phoneNumber) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleFormSubmit = () => {
    setStep(5);
  };

  return (
    <motion.div
      className="form-box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4 }}
    >
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
        <div style={{ color: "white" }}>
          Recommended Doctors coming your way
        </div>
      )}
    </motion.div>
  );
};

export default BookingForm;

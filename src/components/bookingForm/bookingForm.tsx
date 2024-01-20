import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import "./bookingFormStyles.css";
import axios from "axios";
interface BookingFormProps {
  onCityChange: (city: string) => void;
}
const BookingForm: React.FC<BookingFormProps> = ({ onCityChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    city: "",
    company: "",
    chiefComplaints: "",
    previousExperience: "",
  });

  interface Doctor {
    id: number;
    name: string;
    city: string;
    image: string;
    expertise: string;
    createdAt: string;
  }

  const [step, setStep] = useState(1);
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);

  const getDoctorData = async () => {
    console.log("This was called");

    try {
      const response = await axios.get(
        "https://642aaf37b11efeb7599fc2a1.mockapi.io/DoctorData"
      );

      console.log("Doctor Data:", response.data);
      setDoctorData(response.data);
      console.log("Seted Data:", doctorData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const getMatchingDoctorCount = () => {
    if (formData.city && doctorData.length > 0) {
      const matchingDoctors = doctorData.filter(
        (doctor) => doctor.city.toLowerCase() === formData.city.toLowerCase()
      );
      return matchingDoctors.length;
    }
    return 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    if (step === 5) {
      getDoctorData();
    }
  }, [step]);
  const handleNextStep = () => {
    if (step === 1 && formData.name && formData.phoneNumber) {
      if (!/^(?:\+\d{1,2}\s?)?\d{10}$/.test(formData.phoneNumber)) {
        toast.error(
          "Please enter a valid phone number. It should be 10 digits long, or start with '+91' followed by 10 digits.",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } else {
        setStep((prevStep) => prevStep + 1);
      }
    } else if (
      step === 2 &&
      formData.age &&
      formData.city &&
      formData.company
    ) {
      onCityChange(formData.city);
      if(!/^[1-9][0-9]*$/.test(formData.age)){
        toast.error(
          "Please enter age in numbers",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }else{
        setStep((prevStep) => prevStep + 1);
      }
      
    } else if (step === 3 && formData.chiefComplaints) {
      if (formData.age > "40") {
        setStep((prevStep) => prevStep + 1);
      } else {
        getDoctorData();
        setStep((prevStep) => prevStep + 2);
      }
    } else if (step === 4 && formData.previousExperience) {
      getDoctorData();
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
        {formData.city && step === 5 && (
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
            <p>
              Number of Doctors in {formData.city}: {getMatchingDoctorCount()}
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default BookingForm;

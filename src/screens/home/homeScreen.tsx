import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import HeroImage from "../../assets/svg/HeroImage.svg";
import BookingForm from "../../components/bookingForm/bookingForm";
import "./homeScreenStyles.css";
import { motion } from "framer-motion";
import DoctorsCarousel from "../../components/doctorsCarousel/doctorsCarousel";
import Testimonials from "../../components/testimonials/testimonials";

const heroImageVarient = {
  hidden: {
    opacity: 0,
    x: "15vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 3,
    },
  },
};
const logoImageVarient = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

const Home = () => {
  const [formDataCity, setFormDataCity] = useState<string | "">("");

  const handleCityChange = (city: string) => {
    setFormDataCity(city);
  };
  return (
    <div className="home-container">
      <div>
        <Navbar />
      </div>
      <div className="image-container">
        <motion.img
          variants={logoImageVarient}
          initial="hidden"
          animate="visible"
          src="https://ik.imagekit.io/tcfp7i31d/logo_with_yp_black_urUeyjKwY.svg"
          alt="Logo"
        />
      </div>
      <div className="heroImage-container">
        <motion.img
          variants={heroImageVarient}
          initial="hidden"
          animate="visible"
          src={HeroImage}
          alt="Logo"
        />
        <section>
          <BookingForm onCityChange={handleCityChange} />
        </section>
      </div>
      <div style={{ margin: "0 2%" }}>
        <DoctorsCarousel formDataCity={formDataCity} />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;

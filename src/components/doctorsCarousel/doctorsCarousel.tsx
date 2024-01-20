import React,{ useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./doctorCarouselStyles.css";

interface Doctor {
  id: number;
  name: string;
  city: string;
  image:string;
  expertise: string;
  createdAt: string;
}

const DctorsCarousel = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [width, setWidth] = useState<number>(0);

  const carousel = useRef<any>();

  useEffect(() => {
    getDoctorData();
   
  }, []);
  useEffect(() => {
    console.log(carousel.current.scrollWidth ,carousel.current.offsetWidth);
    
   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    console.log("This is Width:",width);
  }, [doctorData,carousel])
  

  const getDoctorData = async () => {
    try {
      const response = await axios.get(
        "https://642aaf37b11efeb7599fc2a1.mockapi.io/DoctorData"
      );

      console.log("Doctor Data:", response.data);
      setDoctorData(response.data);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  return (
    <>
    <motion.div whileHover={{
      scale: 1.1,
    }} className="doctor-heading-container">
       <h3 className = 'heading' >Meet Our Experts </h3>
       <h5 className = 'sub-heading'>Experience the Benefits of Advanced Technology and Expert Care</h5> 
    </motion.div>
      <motion.div ref = {carousel} className="doctors-carousel-container">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-carousel-container"
        >
          {doctorData.map((doctor) => (
            <div key={doctor.id} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src={doctor.image}
                    alt="Avatar"
                    style={{ width: "100%", height: "100%" ,borderRadius:7,objectFit:'cover'}}
                  />
                </div>
                <div className="flip-card-back">
                  <h1>{doctor.name}</h1>
                  <p>{doctor.city}</p>
                  <p>{doctor.expertise}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default DctorsCarousel;

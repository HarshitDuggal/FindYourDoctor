import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./doctorCarouselStyles.css";

interface Doctor {
  id: number;
  name: string;
  city: string;
  expertise: string;
  createdAt: string;
}

const DctorsCarousel = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  // const [width, setWidth] = useState<number>(0);

  // const carousel = useRef<any>();

  useEffect(() => {
    getDoctorData();
    // console.log(carousel.current.scrollWidth,carousel.current.offsetWidth);
    // setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    // console.log("This is Width:",width);
  }, []);

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
      <motion.div className="doctors-carousel-container">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -3800 }}
          className="inner-carousel-container"
        >
          {doctorData.map((doctor) => (
            <div key={doctor.id} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1673953510158-174d4060db8b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNhbCUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Avatar"
                    style={{ width: "100%", height: "100%" }}
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

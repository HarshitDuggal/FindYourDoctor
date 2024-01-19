import Navbar from '../../components/navbar/navbar'
import HeroImage from '../../assets/svg/HeroImage.svg'
import './homeScreenStyles.css';
import {motion} from 'framer-motion';


const Home = () => {
  return (
    <div className='home-container'>
      <div>
      <Navbar/>
      </div>
      <div className='image-container'>
        <img src='https://ik.imagekit.io/tcfp7i31d/logo_with_yp_black_urUeyjKwY.svg' alt='Logo'/>
      </div>
      <div className='heroImage-container'>
      <img src={HeroImage} alt='Logo'/>
      </div>
    </div>
  )
}

export default Home
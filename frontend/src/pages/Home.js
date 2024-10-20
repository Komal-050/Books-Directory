import React from 'react';
import Slider from 'react-slick';
import './Home.css';

const Home = () => {
  const sliderSettings = {
    dots: true,          
    infinite: true,      
    speed: 500,          
    slidesToShow: 1,     
    slidesToScroll: 1,   
    autoplay: true,     
    autoplaySpeed: 3000, 
  };

  const images = [
    '/images/slider1.jpg',
    '/images/slider2.jpg',
    '/images/slider3.jpg',
    '/images/slider4.jpg',
    '/images/slider5.jpg',
  ];

  return (
    <div>
      <Slider {...sliderSettings} className="image-slider">
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;

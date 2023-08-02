import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";
import './ProductCarousel.css';

const ProductCarousel = () => {
  const products = [
    {
      name: 'Management Excel',
      description: 'Upload and Download Product Excel Sheets',
      imageUrl: image3,
    },
    {
      name: 'Manage Products',
      description: 'Change Filters, Price, Image paths and more',
      imageUrl: image2,
    },
    {
      name: 'Product Inventory',
      description: 'Check vendors inventory',
      imageUrl: image1,
    },
    // Add more product objects as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the time between each slide transition (3 seconds in this case)
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map((product, index) => (
        <div className="product-item" key={index}>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
          <div className="image-container">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductCarousel;

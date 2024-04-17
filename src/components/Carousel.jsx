import React from 'react';
import image1 from '../carouselImages/1711482554252wallpaperflare.com_wallpaper (2).jpg';
import image2 from '../carouselImages/1009363.jpg';
import image3 from '../carouselImages/images.jpeg';

const Carousel = () => {
    console.log("Carousel");
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={image1} className="d-block w-100" alt="Slide 1" style={{ maxHeight: '800px' }} />
          </div>
          <div className="carousel-item">
            <img src={image2} className="d-block w-100" alt="Slide 2" style={{ maxHeight: '800px' }} />
          </div>
          <div className="carousel-item">
            <img src={image3} className="d-block w-100" alt="Slide 3" style={{ maxHeight: '800px' }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;

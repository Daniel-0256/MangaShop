import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Home.css";  // Assicurati che il file CSS sia correttamente collegato

const Home = () => {
  return (
    <div className="home-container">
      <div className="carousel-container">
        <Carousel id="Carousel">
          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRixYF_u2KysPTzJueuPqJx-VYiuRrTTApN8en2DSCiGw&s"
                alt="Primo slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://ilovevg.it/wp-content/uploads/2020/05/anime-e-manga-generi.jpg"
                alt="Secondo slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      
      <div className="container-card">
        {/* Prima Card */}
        <div className="card-container">
          <Link to={`/products/${encodeURIComponent("One Piece")}`} className="card-link">
            <div className="card">
              <img
                src="https://cdn.anisearch.it/images/anime/cover/2/2227_600.webp"
                alt="One Piece"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">One Piece</h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Seconda Card */}
        <div className="card-container">
          <Link to={`/products/${encodeURIComponent("Dragon Ball")}`} className="card-link">
            <div className="card">
              <img
                src="https://www.antoniogenna.net/doppiaggio/anim/dragonball.jpg"
                alt="Dragon Ball"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Dragon Ball</h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Terza Card */}
        <div className="card-container">
          <Link to={`/products/${encodeURIComponent("Naruto")}`} className="card-link">
            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDudPcCdZqXCEVUpaIQmwy_G0Pw7-Qd7f2cHCnEkVEQ&s"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Naruto</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

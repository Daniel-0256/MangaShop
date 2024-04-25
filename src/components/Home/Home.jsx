import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="carousel-container">
        <Carousel id="Carousel">

          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://c4.wallpaperflare.com/wallpaper/924/717/253/manga-anime-one-piece-wallpaper-preview.jpg"
                alt="Primo slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://images3.alphacoders.com/727/727963.jpg"
                alt="Secondo slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://www.bhmpics.com/downloads/naruto-manga-wallpaper/14.naruto-shippuden-manga-panel-fn786o60s6gw0i5v.jpg"
                alt="Secondo slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://e1.pxfuel.com/desktop-wallpaper/178/214/desktop-wallpaper-berserk-manga-berserk.jpg"
                alt="Secondo slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://i.pinimg.com/736x/46/ec/52/46ec52beac255849ce49b03f90ba54a7.jpg"
                alt="Secondo slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://i.pinimg.com/736x/92/64/d4/9264d41f19e24e14e793b5ed0cc4f5ab.jpg"
                alt="Secondo slide"
              />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="image-wrapper">
              <img
                className="img-carousel d-block"
                src="https://c4.wallpaperflare.com/wallpaper/779/156/983/denji-chainsaw-man-bat-devil-chainsaw-man-manga-anime-hd-wallpaper-preview.jpg"
                alt="Secondo slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      
      <div className="container-cards">
        {/* Prima Card */}
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


        {/* Seconda Card */}
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

        {/* Terza Card */}
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

        {/* Quarta Card */}
          <Link to={`/products/${encodeURIComponent("Jujutsu Kaisen")}`} className="card-link">
            <div className="card">
              <img
                src="https://www.animeclick.it/immagini/anime/Jujutsu_Kaisen/cover/Jujutsu_Kaisen-cover.jpg"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Jujutsu Kaisen</h5>
              </div>
            </div>
          </Link>

        {/* Quinta Card */}
          <Link to={`/products/${encodeURIComponent("Attacco dei Giganti")}`} className="card-link">
            <div className="card">
              <img
                src="https://www.animeclick.it/immagini/anime/Attack_on_Titan/cover/Attack_on_Titan-cover.jpg"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Attacco dei Giganti</h5>
              </div>
            </div>
          </Link>

        {/* Sesta Card */}
          <Link to={`/products/${encodeURIComponent("Berserk")}`} className="card-link">
            <div className="card">
              <img
                src="https://storage.googleapis.com/pod_public/750/193107.jpg"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Berserk</h5>
              </div>
            </div>
          </Link>

        {/* Settima Card */}
          <Link to={`/products/${encodeURIComponent("Demon Slayer")}`} className="card-link">
            <div className="card">
              <img
                src="https://www.animeclick.it/immagini/anime/Kimetsu_no_Yaiba/cover/Kimetsu_no_Yaiba-cover.jpg"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Demon Slayer</h5>
              </div>
            </div>
          </Link>

        {/* Ottava Card */}
          <Link to={`/products/${encodeURIComponent("Haikyu")}`} className="card-link">
            <div className="card">
              <img
                src="https://m.media-amazon.com/images/I/71DRngOUBAS._AC_UF1000,1000_QL80_.jpg"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Haikyu</h5>
              </div>
            </div>
          </Link>

        {/* Nona Card */}
          <Link to={`/products/${encodeURIComponent("Vinland Saga")}`} className="card-link">
            <div className="card">
              <img
                src="https://www.animeclick.it/immagini/anime/Vinland_Saga/cover/Vinland_Saga-cover.jpg"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Vinland Saga</h5>
              </div>
            </div>
          </Link>

        {/* Decima Card */}
          <Link to={`/products/${encodeURIComponent("Chainsaw Man")}`} className="card-link">
            <div className="card">
              <img
                src="https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=480,height=720,quality=85/catalog/crunchyroll/922742d9acaeba7d887ed11b6caab0e4.jpe"
                alt="Naruto"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">Chainsaw Man</h5>
              </div>
            </div>
          </Link>

      </div>
    </div>
  );
};

export default Home;

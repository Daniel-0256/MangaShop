import "./Home.css";
import { Carousel, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
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

      <Row                                                                            >
        {/* Prima Card */}
        <Col className="container-card">
          <Link
            to={`/products/${encodeURIComponent("One Piece")}`}
            style={{ textDecoration: "none" }}
            className="a"
          >
            <Card className="card">
              <Card.Img
                variant="top"
                src="https://cdn.anisearch.it/images/anime/cover/2/2227_600.webp"
                className="card-img"
              />
              <Card.Body>
                <Card.Title>One Piece</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        {/* Seconda Card */}
        <Col className="container-card">
          <Link
            to={`/products/${encodeURIComponent("Dragon Ball")}`}
            style={{ textDecoration: "none" }}
            className="a"
          >
            <Card className="card">
              <Card.Img
                variant="top"
                src="https://www.antoniogenna.net/doppiaggio/anim/dragonball.jpg"
                className="card-img"
              />
              <Card.Body>
                <Card.Title>Dragon Ball</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        {/* Terza Card */}
        <Col className="container-card">
          <Link
            to={`/products/${encodeURIComponent("Naruto")}`}
            style={{ textDecoration: "none" }}
            className="a"
          >
            <Card className="card">
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDudPcCdZqXCEVUpaIQmwy_G0Pw7-Qd7f2cHCnEkVEQ&s"
                className="card-img"
              />
              <Card.Body>
                <Card.Title>Naruto</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

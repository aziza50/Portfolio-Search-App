import React from "react";
import Spline from "@splinetool/react-spline";
import "../styling/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <div className="spline-wrapper">
        <Spline scene="https://prod.spline.design/mCZy7js8-124Y2zF/scene.splinecode" />
        <div className="watermark-overlay"></div>
      </div>
      <div className="container">
        <Link to="/display-profiles" className="button">
          <div className="star"></div>
          <div className="star s2"></div>
          <div className=" star s3"></div>
          <span>Explore</span>
          <div className="moon"></div>
        </Link>{" "}
      </div>
      <section className="info-section d-flex text-white">
        <div style={{ margin: "5px 70px" }}>
          <h2>We Believe</h2>

          <h2>Our Mission</h2>
        </div>

        <div style={{ margin: "5px 50px" }}>
          <p>
            In showcasing your interests, proudest accomplishments. In inspiring
            and connecting with others in all sector of fields. We believe in
            empowering users to bring their portfolios to life and create
            immersive experiences that inspire.
          </p>

          <p>
            At Illumina, we strive to build a platform where users can showcase
            their work that is dynamic, expressive, and accessible.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

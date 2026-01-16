import React from "react";
import TourButton from "../TourButton/TourButton";
import classes from "./Banner.module.css";
import { HashLink } from "react-router-hash-link";

const Banner = () => {
  return (
    <section className={classes.banner}>
      <video
        className={classes["banner-video"]}
        src="/travel-booking.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className={classes["banner-overlay"]}></div>

      <div className={classes["banner-content"]}>
        <h1>Welcome To I Trip World</h1>
        <h3>Think of a place, We'll arrange it for you</h3>
        <HashLink smooth to="#tours" className={classes["hero-btn"]}>
          Discover our Tours
        </HashLink>
      </div>
    </section>
  );
};

export default Banner;

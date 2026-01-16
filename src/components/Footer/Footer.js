import React from "react";
import classes from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
const Footer = () => {
  //Footer Section
  return (
    <footer className={classes.footer}>
      <div className="my-5">
        <div
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#679cc159" }}
        >
          <div
            className="justify-content-between p-4 text-center"
            style={{ backgroundColor: "#ffffff", color: "#679cc1" }}
          >
            <div>
              <span style={{ marginRight: "10px" }}>Get connected with us on social networks :  </span>

              <a href="#" className="text-white me-4">
                <FaFacebookF style={{ color: "#679cc1" }} />
              </a>
              <a href="#" className="text-white me-4">
                <FaTiktok style={{ color: "#679cc1" }} />
              </a>
              <a href="#" className="text-white me-4">
                <FaInstagram style={{ color: "#679cc1" }} />
              </a>
            </div>

          </div>

          <section className="">
            <div className="container text-center text-md-start mt-5">

              <div className="row mt-3">

                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                  <h6 className="text-uppercase fw-bold">I Trip World</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                  />
                  <p>
                    You can regularly visit our website for Exciting Updates and Packages . To avail more , you can register to our website .
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-40">

                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                  />
                  <p><i className="fas fa-home mr-3"></i> Faisalabad</p>
                  <p><i className="fas fa-envelope mr-3"></i> itripworld@gmail.com</p>
                  <p><i className="fas fa-phone mr-3"></i>+44 380 95 561 20 45</p>
                  {/* <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p> */}
                </div>

              </div>

            </div>
          </section>

        </div>


      </div>

      <p className={classes.copyright}>
        Copyright © 2026 All rights reserved | I Trip World
      </p>
    </footer>
  );
};

export default Footer;

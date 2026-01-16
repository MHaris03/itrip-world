import React, { useEffect, useState } from "react";
import TourButton from "../TourButton/TourButton";
import classes from "./Tours.module.css";
import { MdCalendarToday, MdHiking } from "react-icons/md";
import { FaRegClock, FaUserFriends } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import { useHistory } from "react-router";
import Rating from "react-rating";
import { toast, Toaster } from "react-hot-toast";
import "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore"
const Tours = () => {
  const [tours, setTours] = useState([]);
  const history = useHistory();


  useEffect(() => {
    const fetchTours = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "newTour"));
        const tourData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTours(tourData);
      } catch (error) {
        toast.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);
  function isEndDatePassed(endDate) {
    const currentDate = new Date();
    const isPassed = endDate < currentDate;
    return isPassed;
  }
  return (
    <section className={classes.tours} id="tours">
      <div className="container">
        <h2 className="section-heading">MOST POPULAR TOURS</h2>
        {!tours.length && <Spinner />}

        <div className="row gy-5">
          {tours.map((tour) => {
            const image = tour.imageCover?.startsWith("tour-")
              ? `tours/${tour.imageCover}`
              : tour.imageCover;
            const isTourEnded = isEndDatePassed(new Date(tour.endDates));
            return (
              <div className="col-lg-4 col-md-6" key={tour.id}>
                <div className={classes["card"]}>
                  <div className={classes["card__header"]}>
                    <div className={classes["card__picture"]}>
                      <div className={classes["card__picture-overlay"]}>
                        &nbsp;
                      </div>
                      <img
                        src={image}
                        alt={tour.name}
                        className={classes["card__picture-img"]}
                      />
                    </div>

                    <h3 className={classes["heading-tertirary"]}>
                      <span>{tour.name}</span>
                    </h3>
                  </div>

                  <div className={classes["card__details"]}>
                    <p className={classes["card__text"]}>{tour.summary}</p>
                    <div className={classes["card__data"]}>
                      <MdHiking className={classes["card__icon"]} />

                      <span>{tour.difficulty}</span>
                    </div>
                    <div className={classes["card__data"]}>
                      <MdCalendarToday className={classes["card__icon"]} />
                      <span>
                        <b>Start Date:</b>{" "}
                        {new Date(tour.startDates).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                      <span>
                        <b>End Date:</b>{" "}
                        {new Date(tour.endDates).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className={classes["card__data"]}>
                      <FaRegClock className={classes["card__icon"]} />
                      <span>{tour.duration} Days</span>
                    </div>
                    <div className={classes["card__data"]}>
                      <FaUserFriends className={classes["card__icon"]} />
                      <span>Rs.{tour.coupleprice} <b>Couples</b></span>
                    </div>
                  </div>

                  <div className={classes["card__footer"]}>
                    <p>
                      <span className={classes["card__footer-value"]}>
                        Rs.{tour.price}
                      </span>
                      <span className={classes["card__footer-text"]}>
                        Per person
                      </span>
                    </p>
                    <p className={classes["card__ratings"]}>
                      <span className={classes["card__footer-value"]}>
                        {tour.ratingsAverage} / 5
                      </span>
                      <span className={classes["card__footer-text"]}>
                        <span className={classes.rating}>
                          <Rating
                            emptySymbol="far fa-star icon"
                            fullSymbol="fas fa-star icon"
                            initialRating={tour.ratingsAverage}
                            readonly
                          />
                        </span>
                      </span>
                    </p>
                    <TourButton
                      color="green"
                      size="lg"
                      onClick={() => {
                        if (!isTourEnded) {
                          history.push(`/tours/${tour.id}`);
                        } else {
                          toast.error("This tour has ended.");
                        }
                      }}
                      disabled={isTourEnded}
                    >
                      {isTourEnded ? "Tour Ended" : "Book"}
                    </TourButton>
                    <Toaster />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tours;

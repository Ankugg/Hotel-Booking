import "./hotel.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import FooterList from "../../components/footer/Footer";
import useFetch from "../../components/hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

export const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/allhotel/${id}`
  );

  const { date, options } = useContext(SearchContext);
  const MILLISECOND_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECOND_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(date[0].endDate, date[0].startDate);
  console.log(days);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "L") {
      newSlideNumber = slideNumber === 0 ? 8 : slideNumber - 1;
    } else {
      if (direction === "r") {
        newSlideNumber = slideNumber === 8 ? 0 : slideNumber + 1;
      }
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () =>{
    
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("L")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Exellent location -{data.distance}
            </span>
            <span className="hotelPriceHighlight">
              Book a stay ${data.cheapestPrice} at this property and get a free
              airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImageWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetaisText">
                <h1>{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetaisPrice">
                <h1>Perfect for a {days}-night stay</h1>
                <span>
                  The Taj Mahal Tower is in the popular Colaba area and is just
                  a 10-minute walk from the National Gallery of Modern Art.
                  Mumbai International Airport is 16 mi away.
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b>({days}
                  -night)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now</button>
              </div>
            </div>
          </div>
          <MailList />
          <FooterList />
        </div>
      )}
    </div>
  );
};

export default Hotel;

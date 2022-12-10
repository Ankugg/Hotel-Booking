import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="search">
      <div className="searchItem">
        <img src={item.photos[0]} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>
          <span className="siDistance">{item.distance}</span>
          <span className="siTaxiOp">free airport taxi</span>
          <span className="siSubtitle">{item.desc}</span>

          <span className="breakFast">
            Free Breakfast and Free cancellation
          </span>
          <span className="siCancelOp"></span>
          <span className="siCancelOpSubtitle">
            You can cancel later,so lock in this great price today
          </span>
        </div>
        <div className="siDetails">
          {item.rating && (
            <div className="siRating">
              <span>Excellent</span>
              <button>{item.rating}</button>
            </div>
          )}
          <div className="siDeatilTexts">
            <span className="siPrice">{item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/allhotel/${item._id}`}>
              <button className="siCheckButton">See Availibility</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

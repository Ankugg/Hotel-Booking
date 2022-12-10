import "./FeaturedProperties.css";
import useFetch from "../hooks/useFetch";

const FeaturedProperty = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/allhotel?featured=true&limit=4"
  );
  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem"key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice"> Starting from ${item.cheapestPrice}</span>
             { item.rating && <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperty;

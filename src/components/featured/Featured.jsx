import useFetch from "../hooks/useFetch";
import "./Featured.css";

export const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/countbycity?cities=mumbai,delhi"
  );

  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Delhi</h1>
          <h2>123 property</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684716.webp?k=4c3f55236cffa6597afa0ef11a9f012636f535bf9cc6c0e2ed8142e01fa14766&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>manali</h1>
          <h2>123 property</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Banglore</h1>
          <h2>123 property</h2>
        </div>
      </div>
    </div>
  );
};
export default Featured;

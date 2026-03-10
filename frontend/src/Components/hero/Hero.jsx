import { Link } from "react-router-dom";
import "./hero.css";
const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="herol">
          <div className="heroleft">
            <span className="ltop"><span>100%</span> Meaningful ideas, simple tips, and thoughtful advice</span>
            <h1 className="herohead">
              Get Inspired. Discover Ideas. Transform Your Home
            </h1>
            <p className="pegep">Welcome to a place where ideas come to life.
              Discover smart ideas, helpful guides, and inspiring insights
              created to make things simpler, better, and more beautiful. Our
              blog is here to help you learn, explore, and grow.
            </p>
              <Link to={"/blogs"} className="a">
            <button className="herobtn">
                EXPLORE MORE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#132b09"
                    d="M13.293 7.293a1 1 0 0 0 0 1.414L15.586 11H8a1 1 0 0 0 0 2h7.586l-2.293 2.293a.999.999 0 1 0 1.414 1.414L19.414 12l-4.707-4.707a1 1 0 0 0-1.414 0"
                  />
                </svg>
            </button>
              </Link>
          </div>
        </div>
        <div className="heroR">
          <div className="imgcards">
            <div className="cardpic"></div>
            <div className="imagecard2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

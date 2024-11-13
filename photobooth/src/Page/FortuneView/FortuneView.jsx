import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import bname from "../../assets/fortune-teller.png";
import tia from "../../assets/tia.png";
import logo from "../../assets/logo-2.png";
import { useNavigate } from "react-router-dom";
import { getPredictionByID } from "../../utilities/Prediction";
import ReactCardFlip from "react-card-flip";

const FortuneView = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [predictionNumber, setPredictionNumber] = useState("");
  const [predictionText, setPredictionText] = useState("");

  useEffect(() => {
    logMovies();
    console.log("name = ", name);
  }, [name]);

  async function logMovies() {
    const response = await fetch(
      "https://sunquick-scoreboard.xri.com.bd/fortune-teller/last-user"
    );
    const movies = await response.json();
    setName(movies.user_name);
    setPredictionNumber(movies.prediction);
    const predictionName = await getPredictionByID(predictionNumber);
    setPredictionText(predictionName);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log(event.key);
      if (event.key === "X" || event.key === "x") {
        navigate("/");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <section className="relative bg-[#F4ECE1] bg-[url('/src/assets/bg-1.png')] bg-cover bg-center bg-no-repeat bgbg bg-fixed">
        <div className="mx-auto max-w-screen-xl px-4  flex h-screen items-center">
          <div className="mx-auto max-w-7xl text-center ">
            <div className="relative mx-auto  mt-20 element">
              <img
                src={tia}
                className="  lg:w-1/3 md:w-1/2 w-[70%] mx-auto emad absolute lg:-top-28 xl:-top-36 right-[47%] "
                alt=""
              />
              <img
                src={bname}
                className=" lg:w-1/3  md:w-1/2 w-[70%] mx-auto z-30"
                alt="brandName"
              />
            </div>

            {name && (
              <p className="text-3xl my-3 bg-gradient-to-t from-[#400c43] to-[#820d96] bg-clip-text font-extrabold text-transparent">
                Welcome {name.toLocaleUpperCase()}
              </p>
            )}

            {predictionText && (
              <p className="py-4 w-[100%] textgradient text-[60px] emad bg-gradient-to-t from-[#eb475c] to-[#fba209] bg-clip-text font-extrabold text-transparent ">
                <TypeAnimation
                  style={{
                    whiteSpace: "pre-line",
                    height: "220px",
                    display: "block",
                    lineHeight: "80px",
                  }}
                  className="lg:h-[100px] lg:text-6xl pb-6 "
                  sequence={[predictionText, 1000]}
                />
              </p>
            )}
          </div>
        </div>

        <img
          src={logo}
          className=" lg:w-28 md:w-20 w-12 absolute bottom-8 right-12 "
          alt="logo"
        />
      </section>
    </>
  );
};

export default FortuneView;

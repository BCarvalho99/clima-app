import axios from "axios";
import { Settings, DateTime } from "luxon";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { RiCelsiusFill, RiEyeLine, RiWindyFill } from "react-icons/ri";
import { GiShamrock } from "react-icons/gi";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsWater,
  BsThermometer,
  BsSearch,
  BsBuilding,
} from "react-icons/bs";
const API_KEY = "e7495a12f8d050460be991f1f7cb6056";
function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Brasilia, BR");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (input !== "") {
      setLocation(input);
    }

    e.preventDefault();

    const inputBar = document.querySelector("input");

    inputBar.value = "";
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt&appid=${API_KEY}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);

          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  //mensagem de erro
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    //limpar temporizador
    return () => {
      clearTimeout(timer);
    };
  }, [errorMsg]);

  //  Se a data for falsa mostra um icone de carregamento animado
  if (!data) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-[#477397] via-[#1d384dfd] to-[#092031] flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className="text-5xl text-white animate-spin" />
        </div>
      </div>
    );
  }

  //decisao icone de acordo com clima
  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className=" text-cyan-400" />;
      break;
    case "Clear":
      icon = <IoMdSunny className=" text-yellow-400" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-cyan-800" />;
      break;
    case "Snow":
      icon = <IoMdSnow className=" text-cyan-50" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  // Formatando o luxon

  Settings.defaultLocale = "pt-BR";

  const date = DateTime.fromISO(DateTime.now().setLocale("pt-BR")).toFormat(
    "cccc, dd  LLL yyyy | t"
  );

  date.toLocaleString();
  return (
    <div className=" min-h-screen w-full h-full flex flex-col items-center justify-center px-4 lg:px0">
      {errorMsg && (
        <div className="w-full max-w-xl lg:max-w-sm bg-red-600 text-white top-2 lg:top-10 my-10 p-6 capitalize rounded-sm">{`${errorMsg.response.data.message}`}</div>
      )}

      <div className="shadow-xl shadow-black/80 w-full bg-white/10 max-w-xl min-h-fit text-white backdrop-blur-[32px] rounded-2xl py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-8xl animate-spin" />
          </div>
        ) : (
          <div>
            <form className="shadow-md shadow-black/60  h-16  w-full max-w-xl  rounded-2xl backdrop-blur-[32px] mb-12">
              <div className="  h-full relative flex items-center justify-between p-2">
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  placeholder="Procure por uma cidade ou pa??s"
                  className=" flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-medium pl-6 h-full"
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="bg-[#1c65a1] hover:bg-[#2e7dbe] w-20 h-12 rounded-xl flex justify-center items-center transition"
                >
                  <BsSearch className="text-2xl text-white" />
                </button>
              </div>
            </form>
            {/* SP to Dublin */}
            <div className="flex justify-end mb-2">
              <button
                onClick={(e) => setLocation("S??o Paulo, BR")}
                className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-2 w-[120px] items-center justify-center inline-flex mr-4"
              >
                <BsBuilding />
                <p className="ml-2">S??o Paulo</p>
              </button>
              <button
                onClick={(e) => setLocation("Dublin, IE")}
                className="  bg-gradient-to-r from-green-900 to-green-700 rounded-2xl p-2 w-[120px] items-center justify-center inline-flex "
              >
                <GiShamrock />

                <p className="ml-2">Dublin</p>
              </button>
            </div>
            <div className=" flex items-center gap-x-5">
              <div className="text-[45px]">{icon}</div>

              <div className="text-xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
            </div>

            <div className="my-2 ">
              <div className="flex align-center justify-center">
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <RiCelsiusFill />
                </div>
              </div>
              {/* description */}
              <div className="flex font-extralight justify-center py-4 text-2xl text-cyan-200">
                <p className="capitalize">{data.weather[0].description}</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="text-xl py-6">{date}</div>
              </div>
            </div>

            <div className="max-w-md mx-auto flex flex-col gap-y-6 ">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className=" text-2xl">
                    <RiEyeLine />
                  </div>
                  <div>
                    Visibilidade{" "}
                    <span className="m-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className=" text-2xl">
                    <BsThermometer />
                  </div>
                  <div className="flex align-center items-center">
                    Sensa????o T??rmica{" "}
                    <div className=" flex m-2">
                      {parseInt(data.main.feels_like)}
                      <RiCelsiusFill />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className=" text-2xl">
                    <BsWater />
                  </div>
                  <div>
                    Umidade <span className="m-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className=" text-2xl">
                    <RiWindyFill />
                  </div>
                  <div className="flex align-center items-center">
                    Vento <span className="m-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from "react-icons/io";

import { BsCloudHaze2Fill, BsCloudDrizzleFill } from "react-icons/bs";
const API_KEY = "e7495a12f8d050460be991f1f7cb6056";
function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Porto");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  //  Se a data for falsa mostra um icone de carregamento animado
  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  //decisao icone de acordo com clima
  let icon;

  switch ("data.weather[0].main") {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  // date bject
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#477397] via-[#1d384dfd] to-[#092031] flex flex-col items-center justify-center px-4 lg:px0">
      {/* FORM */}
      <form>FORM</form>
      <div className="shadow-xl shadow-black/80 w-full bg-white/10 max-w-[450px] min-h-[584px] text-white backdrop-blur-[32px] rounded-2xl py-12 px-6">
        {/* TOP */}
        <div>
          <div className="text-[87px]">{icon}</div>
          {/* nome país */}
          <div className="text-2xl font-semibold">
            {data.name}, {data.sys.country}
          </div>
          date
          <div>
            {date.getUTCDate()}/{date.getUTCMonth() + 1}
          </div>
        </div>
        {/* BODY */}
        <div>card body</div>
        {/* BOTTOM */}
        <div>card bottom</div>
      </div>
    </div>
  );
}

export default App;

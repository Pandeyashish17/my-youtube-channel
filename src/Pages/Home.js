import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import VideoCard from "../components/Videocard";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/channel/videos/",
      params: { id: "UCEXyYYR_mMyHPpppI4ltXEA", hl: "en", gl: "US" },
      headers: {
        "X-RapidAPI-Key": "3f8506bb7amsh7c5a857a3bf7852p148abdjsna612a9c11446",
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        if (!cancelledRef.current) {
          setData(response.data.contents);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        if (!cancelledRef.current) {
          setIsError(true);
          setIsLoading(false);
        }
      });
  }, []);
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {data &&
          data.map((item) => {
            return <VideoCard item={item.video} key={item.video} />;
          })}
      </div>
    </div>
  );
};

export default Home;

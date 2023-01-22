import React, { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const SuggestionVideoCard = () => {
  const [suggestions, setSuggestions] = useState(null);
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
        setSuggestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const VideoTime = (length) => {
    return moment()?.startOf("day")?.seconds(length)?.format("H:mm:ss");
  };

  return (
    <>
      {suggestions?.contents?.map((item, index) => {
        const { video } = item;
        return (
          <Link to={`/video/${video?.videoId}`} key={index}>
            <div className="flex mb-3">
              <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={video?.thumbnails[0]?.url}
                />
                {video?.lengthSeconds && (
                  <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
                    {VideoTime(video?.lengthSeconds)}
                  </span>
                )}
              </div>
              <div className="flex flex-col ml-3 overflow-hidden">
                <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
                  {video?.title}
                </span>
                <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                  )}
                </span>
                <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                  <span>{`${abbreviateNumber(
                    video?.stats?.views,
                    2
                  )} views`}</span>
                  <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                    .
                  </span>
                  <span className="truncate">{video?.publishedTimeText}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default SuggestionVideoCard;

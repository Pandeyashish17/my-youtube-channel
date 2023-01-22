import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import moment from "moment";

const VideoCard = ({ item }) => {
  const {
    videoId,
    thumbnails,
    lengthSeconds,
    title,
    stats,
    publishedTimeText,
  } = item;

  const VideoTime = moment()
    ?.startOf("day")
    ?.seconds(lengthSeconds)
    ?.format("H:mm:ss");

  return (
    <Link to={`/video/${videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={thumbnails[0]?.url}
          />
          {
            <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
              {VideoTime}
            </span>
          }
        </div>
        <div className="flex text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={
                  "/ashishcodes.jpg"
                }
              />
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">{title}</span>
            <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
              {title}
              <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
            </span>
            <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
              <span>{`${abbreviateNumber(stats?.views, 2)} views`}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">{publishedTimeText}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

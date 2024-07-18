import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../../utils/api";
import { Destination } from "../../utils/types";
import { CheckCircle } from "phosphor-react";

export const ModalDetail = ({ id }: { id: string }) => {
  const [data, setData] = useState<Destination | undefined>(undefined);

  const fetchData = useCallback(async () => {
    const data = await getData();
    setData(data?.find((destination) => destination.id === Number(id)));
  }, []);
  const { photo_url, title, status, description, itinerary } = data || {};

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //TODO  add a function to toggle the status
  const handleToggle = () => {};

  return (
    data && (
      <div className="">
        <img
          src={photo_url}
          alt="Portugal"
          className="w-full object-cover h-[250px] absolute top-0 left-0 "
        />
        <div className="mt-[183px] flex flex-col gap-4">
          <h1 className="text-[32px] leading-8">{title}</h1>
          <button onClick={handleToggle}>
            <div
              className={`${
                status === "done" ? "text-green-500" : "text-gray-500"
              } flex gap-2`}
            >
              <CheckCircle size={24} />
              {status === "done" ? (
                <div>Complete</div>
              ) : (
                <div>Mark as complete</div>
              )}
            </div>
          </button>
          <p>{description}</p>
          {Boolean(itinerary?.length) && (
            <>
              <hr className="border-gray-300" />
              <h2 className="text-2xl">Itinerary</h2>
            </>
          )}
          <div className="relative">
            {itinerary?.map((item, index) => (
              <div className="">
                <div
                  key={index}
                  className="pb-10 ml-6 relative "
                >
                  {/* line */}
                  {index + 1 !== itinerary.length && (
                    <div className="absolute top-3 -left-7 w-1 h-full bg-black "></div>
                  )}
                  {/* Dot */}
                  <div className="absolute top-2 -left-8 w-3 h-3 rounded-full bg-black "></div>
                  <h2 className="text-xl ">
                    Day {item.day}: {item.location}
                  </h2>
                  <p className="mt-2 text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

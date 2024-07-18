"use client";
import React, { useEffect, useState } from "react";
import { TabButton } from "./TabButton";
import { Destinations } from "../../utils/types";
import { Card } from "../Card";

export const TabContainer = ({ data }: { data: Destinations }) => {
  const [activeTab, setActiveTab] = useState<"all" | "todo" | "done">("all");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState(data);

  const filterBySearch = data.filter((destination) => {
    const titleMatch = searchValue.toLowerCase()
      ? destination.title.toLowerCase().includes(searchValue)
      : true;
    const descriptionMatch = searchValue.toLowerCase()
      ? destination.description.toLowerCase().includes(searchValue)
      : true;

    return titleMatch || descriptionMatch;
  });

  const filterByTab = results.filter((destination) => {
    // Filter by Status
    if (activeTab === "all") {
      // return all the objects
      return destination;
    }
    //Filter by tab
    return destination.status === activeTab;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults(filterBySearch);
  };

  useEffect(() => {
    setResults(data);
  }, [data]);
  return (
    <>
      <div className="py-16  max-w-sm m-auto">
        <h1 className="text-2xl">The places you dream of</h1>
        <p className="text-xl mt-2">Let's live new adventures</p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex justify-between rounded-full border border-gray-300 min-w-full"
        >
          <input
            type="text"
            placeholder="Search trips"
            className="pl-4 flex-1 rounded-l-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black rounded-full text-white py-1 px-2 text-sm h-9 w-[74px] m-1.5"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        <div className="border border-gray-300 rounded-full w-fit m-auto">
          <TabButton
            isActive={activeTab === "all"}
            label="All"
            placement="left"
            onClick={() => setActiveTab("all")}
          />
          <TabButton
            isActive={activeTab === "todo"}
            label="Upcoming"
            placement="center"
            onClick={() => setActiveTab("todo")}
          />
          <TabButton
            isActive={activeTab === "done"}
            placement="right"
            label="Completed"
            onClick={() => setActiveTab("done")}
          />
        </div>
        <ul>
          {filterByTab.map((destination) => (
            <li
              key={destination.title}
              // The key should be destination.id but the endpoint is returning 2 values with id:5
              // And causing inconsistency with the rendering objects
            >
              <Card destination={destination} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

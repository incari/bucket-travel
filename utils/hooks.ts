import { useEffect, useState } from "react";
import { Destinations } from "./types";

export const useFilterDestinations = (data: Destinations) => {
  const [activeTab, setActiveTab] = useState<"all" | "todo" | "done">("all");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState(data);

  //To handle the search value
  const filterBySearch = data.filter((destination) => {
    const titleMatch = searchValue.toLowerCase()
      ? destination.title.toLowerCase().includes(searchValue)
      : true;
    const descriptionMatch = searchValue.toLowerCase()
      ? destination.description.toLowerCase().includes(searchValue)
      : true;

    return titleMatch || descriptionMatch;
  });

  // Filter by Status tab
  const filterByTab = results.filter((destination) => {
    if (activeTab === "all") {
      return destination;
    }
    return destination.status === activeTab;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResults(filterBySearch);
  };

  // Refresh data when delete/edit with the search value
  useEffect(() => {
    setResults(filterBySearch);
  }, [data]);

  return {
    activeTab,
    setActiveTab,
    searchValue,
    setSearchValue,
    results: filterByTab,
    handleSubmit,
  };
};

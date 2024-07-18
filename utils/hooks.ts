import { useState } from "react";

type Destination = {
  title: string;
  description: string;
  status: "all" | "todo" | "done";
};

type Destinations = Destination[];

export const useFilterDestinations = (data: Destinations) => {
  const [activeTab, setActiveTab] = useState<"all" | "todo" | "done">("all");
  const [searchValue, setSearchValue] = useState("");

  const filteredResults = data.filter((destination) => {
    const lowerSearchValue = searchValue.toLowerCase();
    const titleMatch = lowerSearchValue
      ? destination.title.toLowerCase().includes(lowerSearchValue)
      : true;
    const descriptionMatch = lowerSearchValue
      ? destination.description.toLowerCase().includes(lowerSearchValue)
      : true;

    const matchesSearch = titleMatch || descriptionMatch;
    const matchesTab = activeTab === "all" || destination.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    activeTab,
    setActiveTab,
    searchValue,
    setSearchValue,
    results: filteredResults,
    handleSubmit,
  };
};

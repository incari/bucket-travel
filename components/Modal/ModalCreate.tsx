"use client";

import { useCallback, useEffect, useState } from "react";
import { MHeader } from "./MHeader";
import { MForm } from "./MForm";
import { Dropdown } from "./Dropdown";
import { usePathname } from "next/navigation";
import { PlusCircle } from "phosphor-react";
import { getData } from "../../utils/api";
import { Destination, ItineraryItem } from "../../utils/types";

export type FormValues = {
  title: string;
  introduction: string;
  description: string;
  photo_url: string;
  itinerary: ItineraryItem[];
};

export const ModalCreate = ({ id }: { id?: string }) => {
  const [data, setData] = useState<Destination | undefined>(undefined);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { day: 0, location: "", description: "" },
  ]);

  const [formValues, setFormValues] = useState<FormValues>({
    title: data?.title || "",
    introduction: "",
    description: data?.description || "",
    photo_url: data?.photo_url || "",
    itinerary: data?.itinerary || [{ day: 0, location: "", description: "" }],
  });
  // TODO Refactor form-hooks

  // TODO Refactor with React query
  const fetchData = useCallback(async () => {
    const data = await getData();

    const trip = data?.find((destination) => destination.id === Number(id));

    setData(trip);
    setItinerary(
      trip?.itinerary || [{ day: 0, location: "", description: "" }]
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleItineraryChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newItinerary = [...(data?.itinerary || [])];
    newItinerary[index] = { ...newItinerary[index], [name]: value };
    setFormValues({ ...formValues, itinerary: newItinerary });
  };

  const addItinerary = () => {
    setFormValues({
      ...formValues,
      itinerary: [
        ...formValues.itinerary,
        { day: 0, location: "", description: "" },
      ],
    });
  };

  const handleChangeDay = (day: number) => {
    const newItinerary = [...(data?.itinerary || [])];
    newItinerary[day - 1] = { ...newItinerary[day - 1], day };
    setFormValues({ ...formValues, itinerary: newItinerary });
  };

  return (
    <div>
      <MForm
        onChange={handleInputChange}
        formValues={data}
      />

      <div className="flex flex-col gap-2 mt-6">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm mb-2">
            Day by day Itinerary
          </label>

          <button
            type="button"
            className=""
            onClick={addItinerary}
          >
            <PlusCircle size={21} />
          </button>
        </div>

        {itinerary.map((day, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg 
          text-sm text-gray-700"
          >
            <div className="flex space-x-2">
              <Dropdown
                options={itinerary}
                byDay={day}
                onChange={handleChangeDay}
              />

              <div className="w-full ">
                <input
                  type="text"
                  name="location"
                  value={day.location}
                  onChange={(e) => handleItineraryChange(index, e)}
                  placeholder="Location"
                  className="border rounded-full h-12 w-full text-gray-700 pl-4 mb-2"
                />
                <textarea
                  name="description"
                  value={day.description}
                  onChange={(e) => handleItineraryChange(index, e)}
                  placeholder="Description"
                  className="border rounded-xl h-24 w-full text-gray-700 pl-4 pt-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-start mt-6">
        <button
          type="button"
          className="border rounded-full h-12  w-[160px] text-white bg-black "
        >
          Save
        </button>
      </div>
    </div>
  );
};

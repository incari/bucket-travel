"use client";

import { useCallback, useEffect, useState } from "react";
import { MHeader } from "./MHeader";
import { MForm } from "./MForm";
import { Dropdown } from "./Dropdown";
import { usePathname } from "next/navigation";
import { PlusCircle } from "phosphor-react";
import { useAddNewDestination, useEditById, useGetData } from "../../utils/api";
import { Destination, ItineraryItem } from "../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";

export const ModalCreate = ({ id }: { id?: string }) => {
  const useEdit = useEditById();
  const useAdd = useAddNewDestination();
  const { data, isLoading } = useGetData();

  const destination = data?.find(
    (destination) => destination.id === Number(id)
  );

  console.log(destination);
  const { control, register, handleSubmit, setValue, getValues } =
    useForm<Destination>({
      defaultValues: { ...destination },
    });

  const addItinerary = () => {
    setValue("itinerary", [
      ...(destination?.itinerary || []),
      { day: 0, location: "", description: "" },
    ]);
  };

  const onSubmit: SubmitHandler<Destination> = (data) => {
    console.log(data);

    handleSave(data as Destination);
  };

  const handleChangeDay = (newDay: number, originalDay: number) => {
    const currentItinerary = getValues("itinerary") || [];

    // Find the item that needs to be moved
    const itemToMove = currentItinerary.find(
      (item) => item.day === originalDay
    );
    if (!itemToMove) {
      console.error(`Item with original day ${originalDay} not found`);
      return;
    }

    // Create a new itinerary array without the item to move
    const filteredItinerary = currentItinerary.filter(
      (item) => item.day !== originalDay
    );

    // Insert the item to its new position
    const newItinerary = [
      ...filteredItinerary.slice(0, newDay - 1),
      { ...itemToMove, day: newDay },
      ...filteredItinerary
        .slice(newDay - 1)
        .map((item) => ({ ...item, day: item.day + 1 })),
    ];

    // Update form state with the new itinerary
    setValue("itinerary", newItinerary);
  };

  const handleSave = (data: Destination) => {
    if (id && data) {
      useEdit.mutate({ id: Number(id), data });
    } else {
      useAdd.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MForm register={register} />

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

        {destination?.itinerary?.map((day, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg 
          text-sm text-gray-700"
          >
            <div className="flex space-x-2">
              <Dropdown
                options={destination.itinerary}
                register={register}
                index={index}
                onChangeDay={handleChangeDay}
              />

              <div className="w-full ">
                <input
                  type="text"
                  placeholder="Location"
                  className="border rounded-full h-12 w-full text-gray-700 pl-4 mb-2"
                  {...register(`itinerary.${index}.location`)}
                />
                <textarea
                  placeholder="Description"
                  className="border rounded-xl h-24 w-full text-gray-700 pl-4 pt-2"
                  {...register(`itinerary.${index}.description`)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-start mt-6">
        <button
          type="submit"
          className="border rounded-full h-12  w-[160px] text-white bg-black "
        >
          Save
        </button>
      </div>
    </form>
  );
};

import { UseFormSetValue } from "react-hook-form";
import { Destination, ItineraryItem } from "./types";
import { navigate } from "../app/actions";
import { useAddNewDestination, useEditById } from "./api";

export const handleChangeDay = (
  newDay: number,
  originalDay: number,
  currentItinerary: ItineraryItem[],
  setValue: UseFormSetValue<Destination>
) => {
  // Find the item that needs to be moved
  const itemToMove = currentItinerary.find((item) => item.day === originalDay);
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

export const handleSave = async (
  useEdit: ReturnType<typeof useEditById>,
  useAdd: ReturnType<typeof useAddNewDestination>,
  path: string,
  data: Destination,
  id?: string
) => {
  if (id && data) {
    await useEdit.mutate({ id: Number(id), data });
  } else {
    await useAdd.mutate(data);
  }

  navigate(path);
};

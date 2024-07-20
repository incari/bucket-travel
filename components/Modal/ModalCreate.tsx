"use client";
import { MForm } from "./MForm";
import { Dropdown } from "./Dropdown";
import { usePathname } from "next/navigation";
import { PlusCircle } from "phosphor-react";
import { useAddNewDestination, useEditById, useGetData } from "../../utils/api";
import { Destination, ItineraryItem } from "../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { handleChangeDay, handleSave } from "../../utils/helpers";

export const ModalCreate = ({ id }: { id?: string }) => {
  const { data, isLoading } = useGetData();

  const useEdit = useEditById();
  const useAdd = useAddNewDestination();
  const path = usePathname();

  const { register, handleSubmit, setValue, getValues, reset, watch } =
    useForm<Destination>({
      defaultValues: { itinerary: [{ day: 1, location: "", description: "" }] },
    });

  const addItinerary = () => {
    const currentItinerary = getValues("itinerary") || [];

    const newDay =
      currentItinerary.length > 0
        ? Math.max(...currentItinerary.map((item) => item.day)) + 1
        : 1;

    const newItinerary = [
      ...currentItinerary,
      { day: newDay, location: "", description: "" },
    ];

    setValue("itinerary", newItinerary);
  };

  useEffect(() => {
    if (data && !isLoading) {
      const destination = data.find((dest) => dest.id === Number(id));
      if (destination) {
        reset(destination);
      }
    }
  }, [data, isLoading, id, reset, setValue]);

  const onSubmit: SubmitHandler<Destination> = (data) => {
    handleSave(useEdit, useAdd, path, data, id);
  };

  watch("itinerary");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-left flex flex-col gap-4"
    >
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

        {getValues("itinerary").map((day, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700"
          >
            <div className="flex space-x-2">
              <Dropdown
                options={getValues("itinerary")}
                register={register}
                index={index}
                onChangeDay={(newDay, originalDay) =>
                  handleChangeDay(
                    newDay,
                    originalDay,
                    getValues("itinerary"),
                    setValue
                  )
                }
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
          data-testid="save-button"
          type="submit"
          className="border rounded-full h-12 w-[160px] text-white bg-black "
        >
          Save
        </button>
      </div>
    </form>
  );
};

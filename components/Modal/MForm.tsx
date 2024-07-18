import React from "react";
import { FormValues } from "./ModalCreate";
import { Destination } from "../../utils/types";

export const MForm = ({
  onChange,
  formValues,
}: {
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formValues?: Destination;
}) => {
  return (
    <>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formValues?.title || ""}
          onChange={onChange}
          placeholder="Italy"
          className="border rounded-full h-12 w-full text-gray-700 pl-4"
        />
      </div>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Introduction (max. 240 characters)</label>
        <textarea
          name="introduction"
          //TODO change to introduction
          value={formValues?.description || ""}
          onChange={onChange}
          className="border rounded-xl h-24 w-full text-gray-700 pl-4 pt-2"
          maxLength={240}
          placeholder="From Rome to Venice..."
        />
      </div>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formValues?.description || ""}
          onChange={onChange}
          className="border rounded-xl h-24 w-full text-gray-700 pl-4 pt-2"
          placeholder="Discover the wonders of the Roman empire..."
        />
      </div>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Image</label>
        <input
          type="text"
          name="image"
          value={formValues?.photo_url || ""}
          onChange={onChange}
          className="border rounded-full h-12 w-full text-gray-700 pl-4"
          placeholder="Image URL"
        />
      </div>
    </>
  );
};

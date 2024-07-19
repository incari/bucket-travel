export const MForm = ({ register }: { register: any }) => {
  return (
    <>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="title"
          placeholder="Italy"
          className="border rounded-full h-12 w-full text-gray-700 pl-4"
          {...register("title", { required: true })}
          required
        />
      </div>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Introduction (max. 240 characters)</label>
        <textarea
          name="introduction"
          className="border rounded-xl h-24 w-full text-gray-700 pl-4 pt-2"
          maxLength={240}
          placeholder="From Rome to Venice..."
          {...register("introduction")}
        />
      </div>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          className="border rounded-xl h-24 w-full text-gray-700 pl-4 pt-2"
          placeholder="Discover the wonders of the Roman empire..."
          {...register("description")}
        />
      </div>
      <div className="text-sm text-gray-700">
        <label className="block mb-1">Image</label>
        <input
          type="text"
          name="image"
          className="border rounded-full h-12 w-full text-gray-700 pl-4"
          placeholder="Image URL"
          {...register("photo_url")}
        />
      </div>
    </>
  );
};

import { Destination } from "../utils/types";
import Link from "next/link";
import { useDeleteById } from "../utils/api";

export const Card = ({ destination }: { destination: Destination }) => {
  const { id, title, description, photo_url, introduction } = destination;
  const useDelete = useDeleteById();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useDelete.mutate(id);
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
      <div className="flex max-h-[200px]">
        <img
          src={photo_url}
          alt={title}
          className="w-1/2 object-cover"
        />
        <div className="p-6 w-1/2 text-start">
          <h2 className="text-2xl">{title}</h2>
          <p className="text-gray-500 mt-2 line-clamp-3 ">
            {Boolean(introduction) ? introduction : description}
          </p>
          <div className="flex justify-between underline underline-offset-2 mt-4">
            <Link
              data-testid="see-trip-details"
              href={`?modal=detail&id=${id}`}
              className=""
            >
              <div className="hover:text-gray-500 underline hover:decoration-gray-500">
                See trip details
              </div>
            </Link>

            <div className="flex gap-4">
              <Link
                href={`?modal=edit&id=${id}`}
                data-testid="edit-trip"
              >
                <div className="hover:text-gray-500 underline hover:decoration-gray-500">
                  Edit
                </div>
              </Link>

              <form onSubmit={onSubmit}>
                <button
                  data-testid="delete-trip"
                  type={"submit"}
                  className="underline decoration-red-500 text-red-500 hover:text-red-700 hover:decoration-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

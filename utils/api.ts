import axios from "axios";
import { Destinations } from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL =
  "https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels";

export async function getData(): Promise<Destinations> {
  const { data } = await axios.get(BASE_URL);

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export const useGetData = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: getData,
  });
};
export const useDeleteById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Optimistically update the UI
    onMutate: async (id: number) => {
      // Optimistically update the cache
      queryClient.setQueryData(["destinations"], (old: any) =>
        old ? old.filter((destination: any) => destination.id !== id) : []
      );
    },
  });
};

export async function deleteDestination(id: number) {
  const { data } = await axios.delete(`api/${id}`);

  if (!data) {
    throw new Error("Failed to delete data");
  }

  return data;
}

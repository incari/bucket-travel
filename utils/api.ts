import axios from "axios";
import { Destination, Destinations } from "./types";
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
    //To keep the data for 5 min to not refresh data after modifying it
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddNewDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    //mutatefn: making Add request
    // Optimistically update the UI
    onMutate: async (data: Destination) => {
      // Optimistically update the cache
      queryClient.setQueryData(["destinations"], (old: any) => [data, ...old]);
    },
  });
};

export const useDeleteById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    //mutatefn: making Delete request

    // Optimistically update the UI
    onMutate: async (id: number) => {
      // Optimistically update the cache
      queryClient.setQueryData(["destinations"], (old: any) =>
        old ? old.filter((destination: any) => destination.id !== id) : []
      );
    },
  });
};

export const useEditById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    //mutatefn: making PATCH request

    onMutate: async ({ id, data }: { id: number; data: Destination }) => {
      // Optimistically update the cache
      console.log(data);
      queryClient.setQueryData(["destinations"], (old: any) =>
        old
          ? old.map((destination: any) =>
              destination.id === id ? { ...destination, ...data } : destination
            )
          : []
      );
    },
  });
};

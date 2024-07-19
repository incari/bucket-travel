type ItineraryItem = {
  day: number;
  location: string;
  description: string;
};

type Destination = {
  id: number; // There are 2 ids with the same value (id:5)
  title: string;
  description: string;
  photo_url: string;
  status: "todo" | "done";
  itinerary: ItineraryItem[];
  introduction?: string; // The endpoint is missing this field
};

type Destinations = Destination[];

export type { Destinations, Destination, ItineraryItem };

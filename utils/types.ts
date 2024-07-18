type ItineraryItem = {
  day: number;
  location: string;
  description: string;
};

type Destination = {
  id: number;
  title: string;
  description: string;
  photo_url: string;
  status: "todo" | "done";
  itinerary: ItineraryItem[];
};

type Destinations = Destination[];

export type { Destinations, Destination, ItineraryItem };

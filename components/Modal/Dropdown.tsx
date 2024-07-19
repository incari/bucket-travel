import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ItineraryItem } from "../../utils/types";

const ChevronDownIcon = () => (
  <svg
    className="w-5 h-5 ml-2 -mr-1 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const Dropdown = ({
  options,
  register,
  index,
  onChangeDay,
}: {
  options: ItineraryItem[];
  register: any;
  index: number;
  onChangeDay: (
    newDay: number,
    originalDay: number,
    itinerary: ItineraryItem[]
  ) => void;
}) => {
  const currentDay = options[index]?.day || 0;

  const handleDayChange = (newDay: number) => {
    onChangeDay(newDay, currentDay, options);
  };

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <MenuButton className="flex gap-4 items-center p-4 bg-white text-gray-400 border rounded-full h-12 w-full pl-4 line-clamp-1 mb-2">
          {currentDay || "Day"}
          <ChevronDownIcon aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1">
          {options.map(({ day }) => (
            <MenuItem key={day}>
              {({ active }) => (
                <button
                  type="button"
                  className={`block w-full text-right px-4 py-2 text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleDayChange(day)}
                >
                  {day}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

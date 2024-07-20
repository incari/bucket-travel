import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-[#121212] p-4 justify-between items-center flex rounded-xl">
      <div className="bg-white h-12 w-12  text-black rounded-full">
        <div className="text-center align-middle cursor-pointer">
          <Link
            data-testid="logo"
            href="/"
          >
            <img src="/logo.svg" />
          </Link>
        </div>
      </div>

      <Link
        href="?modal=create"
        data-testid="create-trip"
      >
        <button
          type="button"
          className="h-12 bg-white text-black px-4 py-2 rounded-full"
        >
          Create new trip
        </button>
      </Link>
    </header>
  );
};

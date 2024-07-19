"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ModalCreate } from "./Modal/ModalCreate";
import { ModalDetail } from "./Modal/ModalDetail";
import { MHeader } from "./Modal/MHeader";
import { Suspense } from "react";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const label =
    (modal &&
      { create: "Create a trip", edit: "Edit trip", detail: "" }[modal]) ||
    "";
  const pathname = usePathname();

  const renderModal = () => {
    if (modal === "create") {
      return <ModalCreate />;
    }
    if (modal === "edit") {
      const id = searchParams.get("id");

      return id && <ModalCreate id={id} />;
    }

    if (modal === "detail") {
      const id = searchParams.get("id");
      return id && <ModalDetail id={id} />;
    }

    return null;
  };

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-screen bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8 ">
            <div className="flex flex-col items-center">
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-[640px] w-full flex flex-col gap-6 max-h-full overflow-y-auto relative">
                  <MHeader
                    href={pathname}
                    label={label}
                  />
                  {renderModal()}
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

const ModalHoc = () => {
  <Suspense>
    <Modal />
  </Suspense>;
};
export { ModalHoc as Modal };

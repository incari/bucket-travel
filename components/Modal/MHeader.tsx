import Link from "next/link";
import { XCircle } from "phosphor-react";
import React from "react";
import { useCloseOnEsc } from "../CloseOnEsc";

export const MHeader = ({ href, label }: { href: string; label: string }) => {
  //Adding close modal pushing ESC key
  useCloseOnEsc();

  return (
    <div className="flex justify-between relative z-10">
      <h2 className="text-[32px] leading-8">{label}</h2>
      <Link href={href}>
        <button type="button">
          <XCircle
            size={28}
            weight="fill"
          />
        </button>
      </Link>
    </div>
  );
};

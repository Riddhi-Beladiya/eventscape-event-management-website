import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/event">
        <span className="cursor-pointer text-blue-600 font-bold hover:underline">
          Logo in
        </span>
      </Link>
    </div>
  );
};

export default Logo;
 
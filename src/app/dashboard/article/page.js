"use client";
import { background } from "@/app/components/images";
import Image from "next/image";
import React, { useEffect } from "react";

const page = () => {
  return (
    <div>
      {" "}
      <div className="fixed inset-0 -z-10">
        <Image
          src={background}
          alt="background"
          fill
          className="object-cover opacity-50 pointer-events-none"
          priority
        />
      </div>
    </div>
  );
};

export default page;

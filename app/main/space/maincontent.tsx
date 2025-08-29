"use client";
import React from "react";

import Customnavbar from "../../main-components/customnavbar";
import { spaces } from "./data/spaces"
import { SpacesTable } from "./components/spaces-table"

interface MaincontentProps {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  title: string;
}

const Maincontent: React.FC<MaincontentProps> = ({
  toggled,
  setToggled,
  title,
}) => {
  return (
    <div className="w-full h-[100%] md:h-[100vh] overflow-y-scroll flex flex-col items-start justify-start">
      <Customnavbar
        title="Spaces"
        toggled={toggled}
        setToggled={setToggled}
      />

      <div className="pt-3  pb-5 px-4 md:px-7 w-full mt-2 ">
        {/* Main content goes here */}

        <h1 className="text-sm md:text-sm font-semibold text-[#2C3A50]">
          {title}{" "}
        </h1>

        <div className="w-full mx-auto py-3">
      <SpacesTable data={spaces} />
    </div>

        




 



        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default Maincontent;

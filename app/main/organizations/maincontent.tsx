"use client";
import React from "react";
import { organizations } from "../organizations/data/organizations"
import { OrganizationsTable } from "../organizations/components/organizations-table"

import Customnavbar from "../../main-components/customnavbar";


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
        title="Organizations"
        toggled={toggled}
        setToggled={setToggled}
      />

      <div className="pt-3 pb-5 px-4 md:px-7 w-full mt-2">
        {/* Main content */}
        <h1 className="text-sm md:text-sm font-semibold text-[#2C3A50]">
          {title}
        </h1>

        <div className="w-full mx-auto py-3">
      <OrganizationsTable data={organizations} />
    </div>

       
      </div>
    </div>
  );
};

export default Maincontent;

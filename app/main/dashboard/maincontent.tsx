"use client";
import React from "react";

import Customnavbar from "../../main-components/customnavbar";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datepicker-withrange";
import { FileOutput } from "lucide-react";
import { CardDataSection } from "./components/card-data";
import {
  cardData,
  organizations,
  paymentData,
  spacePerformance,
  weeklyEstimates,
} from "./data/dashboard-data";
import { PaymentReport } from "./components/payment-report";
import { WeeklyEstimateChart } from "./components/weekly-estimate";
import { TopOrganization } from "./components/top-organization";
import { TopSpace } from "./components/top-space";

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
        title="Dashboard"
        toggled={toggled}
        setToggled={setToggled}
      />

      <div className="pt-3  pb-5 px-4 md:px-7 w-full mt-2 ">
        {/* Main content goes here */}

        <h1 className="text-sm md:text-sm font-semibold text-[#2C3A50]">
          {title}{" "}
        </h1>

        <div className="flex flex-row w-full justify-between mt-2 gap-2 ">
          <Button
            variant="ghost"
            className=" h-8 w-auto px-2 rounded-sm border border-[#e0e2e5] flex flex-row  bg-[#FFFFFF] text-muted-foreground"
          >
            <FileOutput />
            <span className="hidden sm:block text-xs font-normal">Report</span>
          </Button>

          <DatePickerWithRange />
        </div>




       <div className=" mx-auto  py-3">
  <div className="flex flex-col space-y-4 w-full">
    <CardDataSection data={cardData} />
    
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <div className="w-full">
        <PaymentReport data={paymentData} />
      </div>
      <div className="w-full">
        <WeeklyEstimateChart data={weeklyEstimates} />
      </div>
    </div> 

    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
      <div className="lg:col-span-5 w-full">
        <TopOrganization data={organizations} />
      </div>
      <div className="lg:col-span-3 w-full">
        <TopSpace data={spacePerformance} />
      </div>
    </div>
  </div>
</div>




        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default Maincontent;

"use client";
import React, { useState } from 'react';

import Maincontent from './maincontent';

const MainDashboard: React.FC = () => {
  const [toggled, setToggled] = useState(false);


  return (
    <div className="flex min-h-screen w-full bg-[#F8F8F8]">
   
      <Maincontent 
        toggled={toggled}
        setToggled={setToggled} 
        title={'Settings'}     
       
        />
    </div>
  );
};

export default MainDashboard;

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Notification item type
interface NotificationItem {
  id: string;
  avatar: string;
  initials: string;
  message: string;
  timestamp: string;
}

// Notifications component
const Notifications: React.FC = () => {
  // Notifications data inside the component
  const notifications: NotificationItem[] = [
    {
      id: "1",
      avatar: "",
      initials: "KD",
      message: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis",
      timestamp: "June 24, 2024 02:40pm",
    },
    {
      id: "2",
      avatar: "",
      initials: "SG",
      message: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis",
      timestamp: "June 24, 2024 02:40pm",
    },
     {
      id: "3",
      avatar: "",
      initials: "AB",
      message: "Lorem ipsum dolor sit amet consectetur. Fusce bibendum mi placerat quis",
      timestamp: "June 24, 2024 02:40pm",
    },
    // Add more notifications as needed
  ];

  return (
    <AnimatePresence>
      {notifications.map((notification, index) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-4 p-2 rounded-lg hover:bg-slate-50 "
        >
          <Avatar className="bg-[#D9E3F7]">
            <AvatarImage src={notification.avatar} />
            <AvatarFallback className="bg-[#D9E3F7]">{notification.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-[0.8rem] text-slate-600">{notification.message}</p>
            <p className="text-xs text-slate-400">{notification.timestamp}</p>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default Notifications;

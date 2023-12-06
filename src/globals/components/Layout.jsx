import React, { useState } from "react";
import Sidebar, { SidebarItem } from "./SideBar";
import {  TagIcon, Users2,  } from "lucide-react";

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex">
      <div
        className={`transition-all ${expanded ? "w-[80%] lg:w-[20%]" : "w-[30%] lg:w-[10%]"}`}
      >
        <Sidebar setExpanded={setExpanded} expanded={expanded}>
          <SidebarItem
            icon={<Users2 size={20} />}
            text="Pacientes"
            route={"/"}
            alert
          />
          <SidebarItem icon={<TagIcon />} text="Tags" route={"/tags"} />
        </Sidebar>
      </div>
      <div className="w-[100%]">{children}</div>
    </div>
  );
}
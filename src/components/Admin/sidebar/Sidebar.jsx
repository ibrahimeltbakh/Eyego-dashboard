"use client";

import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden absolute top-19 left-4 z-50 bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] p-2 rounded"
        onClick={() => setIsOpen(true)}>
        <BiMenu />
      </button>

      <aside
        className={`relative top-0 left-0 h-full bg-[hsl(var(--sidebar-background))] 
          text-[hsl(var(--sidebar-foreground))] border-r border-[hsl(var(--sidebar-border))] 
          p-4 transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-64`}>
        <div className="flex justify-end items-center mb-4 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[hsl(var(--sidebar-accent-foreground))] bg-[hsl(var(--sidebar-accent))] p-2 rounded">
            <MdClose />
          </button>
        </div>

        {children}
      </aside>
    </>
  );
};

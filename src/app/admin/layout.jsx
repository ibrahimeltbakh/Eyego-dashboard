"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "../../components/Admin/sidebar/Sidebar";
import { SidebarGroup } from "../../components/Admin/sidebar/SidebarGroup";
import { SidebarItem } from "../../components/Admin/sidebar/SidebarItem";
import { BiSolidDownArrowAlt } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { useEffect, useState } from "react";

const sidebarGroups = [
  {
    icon: <AiOutlineProduct className="w-4 h-4" />,
    title: "Products",
    links: [
      { label: "Products List", href: "/admin/products" },
      { label: "Add Product", href: "/admin/products/add" },
    ],
  },
];

export default function AdminLayout({ children }) {
  const [activeGroup, setActiveGroup] = useState(null);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const location = usePathname();

  useEffect(() => {
    if (location === "/admin/home") {
      setIsHomeActive(true);
      setActiveGroup(null);
    } else {
      setIsHomeActive(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex">
      <Sidebar>
        <div
          className={`border font-semibold rounded mb-5 flex items-center justify-center px-3 py-1 
          ${
            isHomeActive
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-[hsl(var(--sidebar-accent))]"
          }`}>
          <FaHome />
          <SidebarItem label="Home" href="/admin" />
        </div>

        {sidebarGroups.map((group, index) => (
          <SidebarGroup
            key={index}
            isActive={activeGroup === index}
            onClick={() => setActiveGroup(index)}
            title={
              <span className="flex justify-between items-center gap-1 h-8">
                <span className="flex flex-row items-center gap-1">
                  {group.icon} {group.title}
                </span>
                <BiSolidDownArrowAlt className="w-4 h-4" />
              </span>
            }>
            {group.links.map((link, idx) => (
              <SidebarItem key={idx} label={link.label} href={link.href} />
            ))}
          </SidebarGroup>
        ))}
      </Sidebar>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

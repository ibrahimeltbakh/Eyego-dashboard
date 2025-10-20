"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "../../components/Admin/sidebar/Sidebar";
import { SidebarGroup } from "../../components/Admin/sidebar/SidebarGroup";
import { SidebarItem } from "../../components/Admin/sidebar/SidebarItem";
import { BiSolidDownArrowAlt } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/features/auth/authSlice";

export default function AdminLayout({ children }) {
  const sidebarGroups = [
    {
      icon: <AiOutlineProduct className="w-4 h-4" />,
      title: "Products",
      links: [{ label: "Products List", href: "/admin/products" }, ,],
    },
  ];

  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  if (user?.user.role === "admin") {
    sidebarGroups[0].links.push({
      label: "Add Product",
      href: "/admin/products/addProduct",
    });
  }

  const [activeGroup, setActiveGroup] = useState(null);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const location = usePathname();

  useEffect(() => {
    if (location === "/admin") {
      setIsHomeActive(true);
      setActiveGroup(null);
    } else {
      setIsHomeActive(false);
    }
  }, [location]);

  return (
    <div className="flex">
      <Sidebar>
        <div
          className={`border font-semibold rounded mb-5 flex items-center justify-center px-3 py-1 
          ${
            isHomeActive
              ? "bg-gradient-to-l from-blue-300 to-blue-500 text-white"
              : "hover:bg-gradient-to-l hover:from-blue-300 hover:to-blue-500 hover:text-white"
          }`}>
          <SidebarItem icon={<FaHome />} label="Home" href="/admin" />
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

      <div className="w-full p-6">{children}</div>
    </div>
  );
}

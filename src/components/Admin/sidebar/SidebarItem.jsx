import Link from "next/link";

export const SidebarItem = ({ icon, label, href }) => (
  <Link
    href={href}
    className="flex items-center justify-center gap-2 px-3 py-2 rounded   w-full text-sm">
    {icon}
    {label}
  </Link>
);

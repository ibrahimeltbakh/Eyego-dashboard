import Link from "next/link";

export const SidebarItem = ({ label, href }) => (
  <Link
    href={href}
    className="block px-3 py-2 rounded hover:bg-[hsl(var(--sidebar-accent))] text-sm">
    {label}
  </Link>
);

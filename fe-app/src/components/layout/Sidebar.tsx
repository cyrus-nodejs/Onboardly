"use client";
import { APP_NAME } from "../../lib/constant";
import { Link } from "@/components/ui/Link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Mail, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/Button";

import { Nav } from "../ui/Nav";
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invitations", href: "/invitations", icon: Mail },
  { label: "Users", href: "/employees", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside
      className="
        bg-slate-900 
        lg:w-64 lg:min-h-screen
        w-full
        lg:flex lg:flex-col
      "
    >
      <div className="hidden lg:block p-6  font-bold tracking-wide border-b border-slate-800">
        <Text variant="navItem"> {APP_NAME} </Text>
      </div>

      <Nav
        className="
          flex lg:flex-col
          gap-2
          overflow-x-auto lg:overflow-visible
          px-4 py-3 lg:p-4
          scrollbar-hide
        "
      >
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white",
              )}
            >
              <Icon size={18} />
              <Text variant="navItem">{item.label}</Text>
            </Link>
          );
        })}
      </Nav>

      <div className="hidden lg:block mt-auto p-4 border-t border-slate-800">
        <Text variant="muted">Welcome {user?.name}</Text>

        <Button onClick={logout} variant="destructive">
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </aside>
  );
}

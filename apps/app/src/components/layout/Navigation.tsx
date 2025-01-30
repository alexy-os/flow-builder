import { Link, useLocation } from "react-router-dom";
import { cn } from "@packages/ui/lib/utils";
import { LayoutGrid, LayoutDashboard } from "lucide-react";

interface NavigationProps {
  isCollapsed: boolean;
}

const navigation = [
  {
    title: "Flow Builder",
    href: "/flow",
    icon: LayoutDashboard
  },
  {
    title: "Page Builder",
    href: "/build",
    icon: LayoutGrid
  }
];

export function Navigation({ isCollapsed }: NavigationProps) {
  const location = useLocation();

  return (
    <div className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center h-10 gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100",
              isActive && "bg-gray-100 text-gray-900",
              isCollapsed ? "justify-center px-2" : "px-3"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span className="truncate">{item.title}</span>}
          </Link>
        );
      })}
    </div>
  );
} 
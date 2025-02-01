import { Outlet } from 'react-router-dom';
import { Command, LayoutGrid, Settings, LucideFlower, LucideHome } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@packages/ui/components/ui/sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@packages/ui/components/ui/sidebar';

const MENU_ITEMS = [
  { 
    icon: LucideHome, 
    label: 'Home Page', 
    path: '/' 
  },
  { 
    icon: LayoutGrid, 
    label: 'Welcome', 
    path: '/welcome' 
  },
  { 
    icon: LucideFlower, 
    label: 'Flow Editor', 
    path: '/flow' 
  }
];

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarProvider defaultOpen={false}>
    <div className="flex h-screen w-full overflow-hidden">
      {/* Главный сайдбар */}
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="md:h-8 md:p-0">
                <Link to="/">
                  <div className="flex items-center justify-center">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Flow Builder</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="flex flex-col gap-2 p-2">
          <SidebarMenu>
            {MENU_ITEMS.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  onClick={() => navigate(item.path)}
                  isActive={location.pathname === item.path}
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="size-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarTrigger />
        </SidebarFooter>
      </Sidebar>

      {/* Основной контент */}
      <main className="flex-1 min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
    </SidebarProvider>
  );
} 
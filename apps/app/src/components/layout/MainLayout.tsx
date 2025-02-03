import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
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
  SidebarProvider,
  useSidebar
} from '@packages/ui/components/ui/sidebar';
import { Button } from '@packages/ui/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

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
    <SidebarProvider key="main-sidebar" defaultOpen={false}>
      <MainLayoutContent location={location} navigate={navigate} />
    </SidebarProvider>
  );
}

// Create a separate component to use the useSidebar hook
function MainLayoutContent({ location, navigate }: { location: any, navigate: any }) {
  const { state, toggleSidebar } = useSidebar();

  return (
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
              <SidebarMenuButton
                key="main-sidebar"
                onClick={toggleSidebar}
              >
                {state === "expanded" ? (
                  <PanelLeftClose />
                ) : (
                  <PanelLeftOpen />
                )}
                <span className="sr-only">Toggle Sidebar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="size-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Основной контент */}
      <main className="flex-1 min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
} 
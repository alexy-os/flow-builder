import { Outlet } from 'react-router-dom';
import { useLayout } from '../../contexts/LayoutContext';
import { Command, ChevronLeft, LayoutGrid, Settings, File } from 'lucide-react';
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
import { Link, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { 
    icon: LayoutGrid, 
    label: 'Dashboard', 
    path: '/dashboard' 
  },
  { 
    icon: File, 
    label: 'Flow Editor', 
    path: '/flow' 
  },
];

export function MainLayout() {
  const { sidebar, isBuilderSidebarVisible } = useLayout();
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Главный сайдбар */}
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <Link to="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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

        <SidebarContent>
          <SidebarMenu>
            {MENU_ITEMS.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                >
                  <Link to={item.path}>
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
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

      <div className="flex-1 flex min-w-0">
        {/* Сайдбар страницы */}
        {sidebar && (
          <aside className={`
            w-[300px] border-r bg-background
            transition-all duration-200
            ${isBuilderSidebarVisible ? 'w-[300px]' : 'w-0 opacity-0'}
          `}>
            <div className="w-[300px]">
              {sidebar}
            </div>
          </aside>
        )}

        {/* Основной контент */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 
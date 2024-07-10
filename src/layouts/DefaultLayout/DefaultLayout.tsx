import { Sidebar } from "@/components";
import { SidebarItem } from "@/components/Sidebar/Sidebar";
import {
  LayoutDashboard,
  UserCircle,
  LifeBuoy,
  Boxes,
  Settings, 
  Package,
  Receipt,
  BarChart,
  Calendar
} from "lucide-react"
const DefaultLayout = ({ children }: { children: JSX.Element }) => {
    return (
      <div className="bg-white h-full w-full flex">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Users"
            />
          <SidebarItem
            icon={<Package size={20} />}
            text="Transport"
            />
          <SidebarItem
            icon={<Boxes size={20} />}
            text="Stock"
            />
          <SidebarItem
            icon={<Calendar size={20} />}
            text="Appointments"
            />
          <SidebarItem
            icon={<BarChart size={20} />}
            text="Staticstics"
            />
          <SidebarItem
            icon={<Receipt size={20} />}
            text="Revenue"
            />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            />
        </Sidebar>
        <main className="max-w-screen-xxl mx-auto">{children}</main>
      </div>
    );
  };
  
  export default DefaultLayout;
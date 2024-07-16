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
import { Toaster } from "@/components/ui/toaster"
import { useNavigate } from "react-router-dom";
const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
    return (
      <div className="bg-white h-full w-full flex">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard className="md:w-[20px] md:h-[20px] w-4 h-4" />}
            text="Dashboard"
            />
          <div className="bg-blue-100 text-white" onClick={()=>navigate('/userinfo')}>
            <SidebarItem
              icon={
                <UserCircle className="md:w-[20px] md:h-[20px] w-4 h-4" />
              }
              text="Users"
              />
          </div>
          <SidebarItem
            icon={<Package className="md:w-[20px] md:h-[20px] w-4 h-4" />}
            text="Transport"
            />
          <SidebarItem
            icon={<Boxes className="md:w-[20px] md:h-[20px] w-4 h-4" />}
            text="Stock"
            />
          <SidebarItem
            icon={<Calendar className="md:w-[20px] md:h-[20px] w-4 h-4" />}
            text="Appointments"
            />
          <SidebarItem
            icon={<BarChart className="md:w-[20px] md:h-[20px] w-4 h-4" />}
            text="Staticstics"
            />
          <SidebarItem
            icon={<Receipt className="md:w-[20px] md:h-[20px] w-4 h-4" />}
            text="Revenue"
            />
          <SidebarItem
            icon={<Settings className="md:w-[20px] md:h-[20px] w-4 h-4" />}
            text="Settings"
            />
        </Sidebar>
        <main className="max-w-screen-xxl mx-auto">{children}</main>
        <Toaster />
      </div>
    );
  };
  
  export default DefaultLayout;
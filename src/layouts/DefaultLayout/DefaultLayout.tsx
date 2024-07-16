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
            icon={<span className="hidden md:block"><LayoutDashboard size={20} /></span>}
            text="Dashboard"
            />
          <div className="bg-blue-100 text-white" onClick={()=>navigate('/userinfo')}>
            <SidebarItem
              icon={<span className="hidden md:block">
                <UserCircle size={20} />
              </span>}
              text="Users"
              />
          </div>
          <SidebarItem
            icon={<span className="hidden md:block"><Package size={20} /></span>}
            text="Transport"
            />
          <SidebarItem
            icon={<span className="hidden md:block"><Boxes size={20} /></span>}
            text="Stock"
            />
          <SidebarItem
            icon={<span className="hidden md:block"><Calendar size={20} /></span>}
            text="Appointments"
            />
          <SidebarItem
            icon={<span className="hidden md:block"><BarChart size={20} /></span>}
            text="Staticstics"
            />
          <SidebarItem
            icon={<span className="hidden md:block"><Receipt size={20} /></span>}
            text="Revenue"
            />
          <SidebarItem
            icon={<span className="hidden md:block"><Settings size={20} /></span>}
            text="Settings"
            />
        </Sidebar>
        <main className="max-w-screen-xxl mx-auto">{children}</main>
        <Toaster />
      </div>
    );
  };
  
  export default DefaultLayout;
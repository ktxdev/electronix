import { Link } from "react-router-dom";

import dashboardIcon from "../assets/images/dashboard-icon.svg";
import usersIcon from "../assets/images/users-icon.svg";
import cartIcon from "../assets/images/cart-icon.svg";
import SidebarItem from "./SidebarItem";
import logo from '../assets/images/logo-full.png';

const SIDEBAR_ITEMS = [
  { title: "Dashboard", icon: dashboardIcon, to: "/admin" },
  { title: "Categories", icon: cartIcon, to: "/admin/categories" },
  { title: "Users", icon: usersIcon, to: "/admin/users" },
];

function Sidebar() {
  return (
    <aside className="w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray-300 fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 -translate-x-[300px] lg:translate-x-[0] ps" >
      <div className="py-4 pb-8 px-8 border-b border-gray-100 h-20">
        <Link to="/admin">
          <img className="w-80%" src={logo} alt="" />
        </Link>
      </div>
      <div className="px-4 py-5">
        <ul>
          {SIDEBAR_ITEMS.map((sidebarItem) => (
            <SidebarItem
              key={sidebarItem.title}
              title={sidebarItem.title}
              icon={sidebarItem.icon}
              to={sidebarItem.to}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;

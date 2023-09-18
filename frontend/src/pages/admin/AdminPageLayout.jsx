import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminPageLayout() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  function handleToggleShowProfileOptions() {
    setShowProfileOptions((options) => !options);
  }

  return (
    <div className="bg-slate-100 h-screen">
      <Sidebar />
      <div className="lg:ml-[250px] xl:ml-[300px] w-[calc(100% - 300px)]">
        <Header
          showProfileOptions={showProfileOptions}
          onToggleProfileOptions={handleToggleShowProfileOptions}
        />
        <div className="p-8 bg-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPageLayout;

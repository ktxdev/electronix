import { Link } from "react-router-dom";

function SidebarItem({ title, icon, to }) {
  return (
    <li>
      <Link to={to} className="group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-2 mb-2 hover:bg-gray sidebar-link-active">
        <span className="inline-block mr-4 text-xl">
          <img src={icon} />
        </span>
        {title}
      </Link>
    </li>
  );
}

export default SidebarItem;

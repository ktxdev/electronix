import userDefault from "../assets/images/user-default.png";
import { useNavigate } from "react-router-dom";

export default function Header({showProfileOptions, onToggleProfileOptions}) {

    const navigate = useNavigate();

    function handleNavigateToProfileSettings() {
        onToggleProfileOptions();
        navigate("/admin/profile");
    }

    function handleLogout() {
      localStorage.removeItem("accessToken");
      navigate("/login", { replace: true })
    }

  return (
    <header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8 pr-8">
      <div className="flex justify-between">
        <div className="w-[30%]">
          <form>
            <div className="w-[250px] relative">
              <input
                className="h-12 w-full pr-11 rounded-md border border-gray-100 bg-white pl-6 text-xs outline-2 outline-offset-2 transition-all"
                type="text"
                placeholder="Search here..."
              />
              <button className="absolute top-1/2 right-6 translate-y-[-50%] hover:text-blue-500 ">
                <svg
                  className="-translate-y-[2px]"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18.9999 19L14.6499 14.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="relative w-[70%] flex justify-end items-center">
          <button
            className="relative"
            type="button"
            onClick={onToggleProfileOptions}
          >
            <img
              className="w-[40px] h-[40px] rounded-md"
              src={userDefault}
              alt=""
            />
            <span className="w-[12px] h-[12px] inline-block bg-green-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white"></span>
          </button>
          <div
            className="absolute w-[280px] top-full right-0 shadow-lg rounded-md bg-white py-5 px-5"
            style={{ display: `${showProfileOptions ? "block" : "none"}` }}
          >
            <div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
              <div>
                <img
                  className="w-[50px] h-[50px] rounded-md"
                  src={userDefault}
                  alt=""
                />
              </div>
              <div>
                <h5 className="text-base mb-1 leading-none">Sean Huvaya</h5>
                <p className="mb-0 text-tiny leading-none">sean@mail.com</p>
              </div>
            </div>
            <ul>
              <li>
                <button
                    onClick={handleNavigateToProfileSettings}
                  className="px-5 text-left py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                >
                  Profile Settings
                </button>
              </li>
              <li>
                <button
                onClick={handleLogout}
                  className="px-5 text-left py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

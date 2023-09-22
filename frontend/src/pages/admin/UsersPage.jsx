import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Pagination from "../../components/Pagination";
import UsersTable from "../../components/UsersTable";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const { accessToken } = useAuth();

  const [totalPages, setTotalPages] = useState(null);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const [totalElements, setTotalElements] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchAllUsers(currentPage);
  }, [currentPage]);

  async function fetchAllUsers(page) {
    const response = await fetch(
      `http://localhost:8080/api/v1/users?page=${page || currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    setTotalPages(data.totalPages);
    setNumberOfElements(data.numberOfElements);
    setTotalElements(data.totalElements);
    setUsers(data.content);
  }

  function handlePageChange(page) {
    if (page < 0) {
      return;
    }
    setCurrentPage(page);
    fetchAllUsers(page);
  }

  return (
    <div>
      <div className="page-title mb-10">
        <h3 className="mb-0 text-[28px]">Users</h3>
      </div>

      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="flex items-center justify-between px-8 py-8">
          <div className="relative">
            <input
              className="input h-[44px] w-full pl-14 rounded-md border border-gray-100 bg-white pr-6 text-xs outline-none"
              type="text"
              placeholder="Search by user name"
            />
            <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-blue-500">
              <svg
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
          <Link
            to="new"
            className="bg-blue-500 hover:bg-blue-700 text-white text-base flex items-center justify-center h-10 cursor-pointer rounded-md px-5 font-medium tracking-wide transition-all"
          >
            Create User
          </Link>
        </div>

        <div className="relative overflow-x-auto  mx-8">
          {users.length === 0 && (
            <p className="flex justify-center items-center py-20 text-center text-gray-600 text-xl">
              No users found! <br/> You can create one by clicking on the &quot;Create
              User&quot; button
            </p>
          )}
          {users.length !== 0 && <UsersTable users={users} />}
        </div>

        {users.length !== 0 && (
          <Pagination
            numberOfElements={numberOfElements}
            totalElements={totalElements}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default UsersPage;

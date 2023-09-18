import userDefault from "../../assets/images/user-default.png";
import coverDefault from "../../assets/images/default-cover.jpeg";
import BasicInfomation from "../../components/BasicInfomation";
import Security from "../../components/Security";
import { useEffect, useState } from "react";

const accessToken = localStorage.getItem("accessToken");

function ProfileSettingsPage() {
  const [userDetails, setProfileInfo] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  function handleChangeProfileInfo(e) {
    const name = e.target.name;
    const value = e.target.value;

    setProfileInfo((info) => ({ ...info, [name]: value }));
  }

  useEffect(() => {
    async function fetchMyProfile() {
      const response = await fetch(
        "http://localhost:8080/api/v1/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      setProfileInfo(data);
    }

    fetchMyProfile();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-10">
        <div className="page-title">
          <h3 className="mb-0 text-[28px]">My Profile</h3>
        </div>
      </div>

      <div className="bg-white rounded-md overflow-hidden mb-10">
        <div className="relative h-[200px] w-full">
          <div
            className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${coverDefault})` }}
          ></div>
          <input type="file" id="coverPhoto" />
          <label
            htmlFor="coverPhoto"
            className="bg-white flex gap-1 items-center px-4 py-1 rounded-md absolute right-5 top-5 sm:top-auto sm:bottom-5 z-10 text-tiny font-medium shadow-lg transition-all duration-200 border-0  hover:cursor-pointer hover:bg-blue-500 hover:text-white"
          >
            <svg
              className="-translate-y-[2px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
            >
              <path
                fill="currentColor"
                d="M19,4h-.508L16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L5.508,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A5.006,5.006,0,0,0,19,4ZM9.276,2.39A1.006,1.006,0,0,1,10.068,2h3.864a1.008,1.008,0,0,1,.792.39L15.966,4H8.034ZM22,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6H19a3,3,0,0,1,3,3Z"
              ></path>
              <path
                fill="currentColor"
                d="M12,8a6,6,0,1,0,6,6A6.006,6.006,0,0,0,12,8Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,18Z"
              ></path>
            </svg>
            <span className="text text-sm font-light">Upload Cover Photo</span>
          </label>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="-mt-[75px] mb-3 relative inline-block">
            <img
              className="w-[150px] h-[150px] rounded-[14px] border-4 border-white bg-white"
              src={userDefault}
              alt=""
            />
            <input type="file" id="profilePhoto" className="hidden" />
            <label
              htmlFor="profilePhoto"
              className="inline-block flex justify-center items-center w-8 h-8 rounded-full shadow-lg text-white bg-blue-500 border-[2px] border-white text-center absolute top-[6px] right-[6px] translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
            >
              <svg
                className="-translate-y-[2px]"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16"
                height="16"
                viewBox="0 0 36.174 36.174"
              >
                <path
                  fill="currentColor"
                  d="M23.921,20.528c0,3.217-2.617,5.834-5.834,5.834s-5.833-2.617-5.833-5.834s2.616-5.834,5.833-5.834 S23.921,17.312,23.921,20.528z M36.174,12.244v16.57c0,2.209-1.791,4-4,4H4c-2.209,0-4-1.791-4-4v-16.57c0-2.209,1.791-4,4-4h4.92 V6.86c0-1.933,1.566-3.5,3.5-3.5h11.334c1.934,0,3.5,1.567,3.5,3.5v1.383h4.92C34.383,8.244,36.174,10.035,36.174,12.244z M26.921,20.528c0-4.871-3.963-8.834-8.834-8.834c-4.87,0-8.833,3.963-8.833,8.834s3.963,8.834,8.833,8.834 C22.958,29.362,26.921,25.399,26.921,20.528z"
                ></path>
              </svg>
            </label>
          </div>
          <div>
            <h5 className="text-xl mb-0">Sean Huvaya</h5>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-8 flex flex-col gap-4">
          <BasicInfomation
            userDetails={userDetails}
            onProfileInfoChanged={handleChangeProfileInfo}
          />
          <Security userDetails={userDetails} />
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsPage;

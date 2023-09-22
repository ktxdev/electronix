import userDefault from "../../assets/images/user-default.png";
import coverDefault from "../../assets/images/default-cover.jpeg";
import BasicInfomation from "../../components/BasicInfomation";
import Security from "../../components/Security";
import { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

function ProfileSettingsPage() {
  const profileImageRef = useRef();
  const { user, accessToken } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    async function getProfileImage() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/users/${user.id}/profile-image`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        
        const data = await response.blob();

        const fileReader = new FileReader();
        fileReader.readAsDataURL(data);

        fileReader.onload = function () {
          profileImageRef.current.src = this.result;
        };
      } catch (err) {
        console.log(err);
      }
    }

    getProfileImage();
  }, [user, accessToken]);

  async function handleImageUpload(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${user.id}/profile-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (response.status !== 200) {
        showAlert("Error", data.message || "Failed to upload profile image");
        return;
      }
  
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = function () {
        profileImageRef.current.src = this.result;
      };
    } catch(err) {
      console.log(err);
      showAlert("Error", "Failed to upload profile image");
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-10">
        <div className="page-title">
          <h3 className="mb-0 text-[28px]">My Profile</h3>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-md overflow-hidden mb-10">
            <div className="relative h-[200px] w-full">
              <div
                className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${coverDefault})` }}
              ></div>
            </div>
            <div className="px-8 pb-8 relative">
              <div className="-mt-[75px] mb-3 relative inline-block">
                <img
                  ref={profileImageRef}
                  className="w-[150px] h-[150px] rounded-[14px] border-4 border-white bg-white"
                  src={userDefault}
                  alt=""
                />
                <input
                  type="file"
                  id="profilePhoto"
                  className="hidden"
                  accept=".jpg, .png, .jpeg, .gif"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="profilePhoto"
                  className="flex justify-center items-center w-8 h-8 rounded-full shadow-lg text-white bg-blue-500 border-[2px] border-white text-center absolute top-[6px] right-[6px] translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
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
                <h5 className="text-xl mb-0">
                  {user.firstName} {user.lastName}
                </h5>
              </div>
            </div>
          </div>

          <BasicInfomation />
          <Security />
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsPage;

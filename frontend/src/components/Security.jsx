import { useState } from "react";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

function Security({ userDetails }) {
  const [securityInfo, setSecurityInfo] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });


  const {accessToken} = useAuth();
  const {showAlert} = useAlert();

  function handleInputChange(e) {
    setSecurityInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
  }

  async function handleChangePassword() {
    const response = await fetch(
      `http://localhost:8080/api/v1/users/${userDetails.id}/change-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(securityInfo),
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      showAlert("Error", data.message)
      return;
    }

    console.log(data);
  }

  return (
    <div className="col-span-12 2xl:col-span-4">
      <div className="py-10 px-10 bg-white rounded-md">
        <h5 className="text-xl mb-6">Security</h5>

        <div className="">
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Current Passowrd</p>
            <input
              className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
              type="password"
              placeholder="Current Passowrd"
              name="oldPassword"
              value={securityInfo.oldPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <p className="mb-0 text-base text-black">New Passowrd</p>
            <input
              className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={securityInfo.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Confirm Passowrd</p>
            <input
              className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
              type="password"
              placeholder="Confirm Password"
              name="newPasswordConfirmation"
              value={securityInfo.newPasswordConfirmation}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-end mt-5">
            <Button onClick={handleChangePassword}>Change Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;

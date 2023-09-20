import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

function BasicInfomation({ userDetails, onProfileInfoChanged }) {


  const {accessToken} = useAuth();
  const {showAlert} = useAlert();

  async function saveBasicInfomation() {
    const response = await fetch(
      `http://localhost:8080/api/v1/users/${userDetails.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userDetails),
      }
    );
    const data = await response.json();

    if (response.status !== 200) {
      showAlert("Error", data.message);
      return;
    }

    console.log(data);
  }

  return (
    <div className="py-10 px-10 bg-white rounded-md">

      <h5 className="text-xl mb-6">Basic Information</h5>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="mb-5">
            <p className="mb-0 text-base text-black">First Name </p>
            <input
              className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={onProfileInfoChanged}
            />
          </div>
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Last Name </p>
            <input
              className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={userDetails.lastName}
              onChange={onProfileInfoChanged}
            />
          </div>
        </div>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Email </p>
          <input
            className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
            type="email"
            placeholder="Email"
            name="email"
            value={userDetails.email}
            onChange={onProfileInfoChanged}
          />
        </div>
        <div className="flex justify-end mt-5">
          <Button onClick={saveBasicInfomation}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default BasicInfomation;

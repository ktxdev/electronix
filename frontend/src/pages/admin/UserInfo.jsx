import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { useAuth } from "../../contexts/AuthContext";

function UserInfo() {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password: '',
        passwordConfirmation: ''
    });

    const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {showAlert} = useAlert();
  const {accessToken} = useAuth();

  function handleInputChange(e) {
    setUser((u) => ({...u, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    if(!user.firstName || !user.lastName || !user.email || !user.password || !user.passwordConfirmation) {
        showAlert("Error", "Please fill in all fields");
        return;
    }

    setIsLoading(true);

    const response = await fetch(
        "http://localhost:8080/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify(user), 
        }
      );
  
      const data = await response.json();
  
      if(response.status !== 201) {
        showAlert("Error", data.message || "Faild to create user! Please try again.");
        setIsLoading(false);
        return;
      }

      showAlert("Success", "User created successfully", "success");
  
      setIsLoading(false);
  
      navigate(-1);
  }

  return (
    <div>
      <div className="page-title mb-10">
        <h3 className="mb-0 text-[28px]">New User</h3>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 md:col-span-6">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px]">General</h4>

            <div className="grid grid-cols-2 gap-4">
              <Input value={user.firstName} onChange={handleInputChange} required name="firstName" label="First Name" placeholder="First Name" />
              <Input value={user.lastName} onChange={handleInputChange} required name="lastName" label="Last Name" placeholder="Last Name" />
            </div>
            <Input value={user.email} onChange={handleInputChange} required name="email" label="Email" type="email" placeholder="Email" />
            <Input value={user.password} onChange={handleInputChange} required name="password" label="Password" type="password" placeholder="Password" />
            <Input
            value={user.passwordConfirmation} onChange={handleInputChange} required name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
            />
            <div className="flex justify-between mt-10">
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button className="flex items-center gap-4" type="primary" onClick={handleSave} disabled={isLoading} >
                <span>Save</span>
                {isLoading && <Spinner />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

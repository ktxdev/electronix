import { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "./AlertContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {showAlert} = useAlert();

  const isAuthenticated = accessToken !== "";

  useEffect(() => {
    if(!accessToken) return;

    async function fetchLoggedInUser() {
      const response = await fetch(
        "http://localhost:8080/api/v1/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      setUser(data);
    }

    fetchLoggedInUser();
  }, [accessToken])

  async function login(email, password) {
    setLoading(true);

    const response = await fetch(
      "http://localhost:8080/api/v1/auth/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
      }
    );

    const data = await response.json();

    if(response.status !== 200) {
      showAlert("Error", "Signing in failed! Please try again.");
      setLoading(false)
      return;
    }

    setAccessToken(data.accessToken);
    setLoading(false);

    navigate("/admin");
  }

  function logout() {
    setAccessToken("");
    setUser({});
    navigate("/login", { replace: true });
  }

  return (
    <AuthContext.Provider value={{ accessToken, user, isAuthenticated, setUser, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const contextValue = useContext(AuthContext);
  if (contextValue === undefined) {
    throw new Error("AuthContext was used outside of AuthProvider");
  }
  return contextValue;
}

export { AuthProvider, useAuth };

import { createContext, useContext, useState } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState(null);
  const [details, setDetails] = useState([]);
  const [type, setType] = useState("error")

  function showAlert(title, message, type="error", details = []) {
    setTitle(title);
    setMessage(message);
    setDetails(details);
    setType(type)

    setTimeout(reset, 10000);
  }

  function reset() {
    setTitle(null);
    setMessage(null);
    setDetails([]);
    setType("error")
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {title && message && <Alert title={title} message={message} type={type} details={details} onClose={reset} />}
      {children}
    </AlertContext.Provider>
  );
}

function useAlert() {
  const contextValue = useContext(AlertContext);
  if (contextValue === undefined) {
    throw new Error("AlertContext was used outside AlertProvider");
  }
  return contextValue;
}

export { AlertProvider, useAlert };

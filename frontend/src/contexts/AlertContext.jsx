import { createContext, useContext, useState } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState(null);
  const [details, setDetails] = useState([]);

  function showAlert(title, message, details = []) {
    setTitle(title);
    setMessage(message);
    setDetails(details);

    setTimeout(reset, 10000);
  }

  function reset() {
    setTitle(null);
    setMessage(null);
    setDetails([]);
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {title && message && <Alert title={title} message={message} details={details} onClose={reset} />}
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

import { createContext, useContext, useState } from "react";
import Alert from "../components/Alert";

const AlertContext = createContext();

function AlertProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState(null);

  function showAlert(title, message) {
    setTitle(title);
    setMessage(message);

    setTimeout(reset, 10000);
  }

  function reset() {
    setTitle(null);
    setMessage(null);
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {title && message && <Alert title={title} message={message} onClose={reset} />}
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

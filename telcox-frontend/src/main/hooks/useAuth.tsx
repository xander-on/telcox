import { useState } from "react";

export const useAuth = () => {
  const [clienteToken, setClienteToken] = useState<string | null>(
    () => localStorage.getItem("clienteToken")
  );

  const saveToken = (token: string) => {
    localStorage.setItem("clienteToken", token);
    setClienteToken(token);
  };

  const clearToken = () => {
    localStorage.removeItem("clienteToken");
    setClienteToken(null);
  };

  return {
    clienteToken,
    saveToken,
    clearToken,
  };
};

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm, { LoginData } from "../../../components/AuthForm";
import { loginUser } from "../../services/auth";
import { useUser } from "../../context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [message, setMessage] = useState("");

  const handleLogin = async (data: LoginData) => {
    setMessage("");
    if (!data.email || !data.password) {
      setMessage("Por favor, completa email y contraseña.");
      return;
    }
    try {
      const response = await loginUser(data.email, data.password);
      localStorage.setItem("token", response.token);
      login(response.user);
      router.push("/dashboard");
    } catch (error: any) {
      setMessage(error.message || "Error en inicio de sesión");
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} message={message} />;
}

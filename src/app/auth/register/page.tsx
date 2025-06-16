"use client";

import React, { useState } from "react";
import AuthForm, { RegisterData } from "../../../components/AuthForm";
import { registerUser } from "../../services/auth";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  const handleRegister = async (data: RegisterData) => {
    setMessage("");
    if (
      !data.fullName ||
      !data.email ||
      !data.password ||
      !data.confirmPassword ||
      !data.birthDate
    ) {
      setMessage("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      await registerUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone,
        birthDate: data.birthDate,
      });
      setMessage("Registro exitoso, ya puedes iniciar sesión.");
    } catch (error: any) {
      setMessage(error.message || "Error en registro");
    }
  };

  return <AuthForm mode="register" onSubmit={handleRegister} message={message} />;
}

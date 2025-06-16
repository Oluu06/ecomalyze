export async function registerUser(userData: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  birthDate: string;
}) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Error al registrar usuario");

  return data;
}

export async function loginUser(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");

  return data;
}

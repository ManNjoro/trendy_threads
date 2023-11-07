import { redirect } from 'react-router-dom';

export async function requireAuth() {
  const isLoggedIn = localStorage.getItem("isAuthenticated")

  if (!isLoggedIn) {
    throw redirect("/login?message=You mustlog in first")
  }
  return null
}
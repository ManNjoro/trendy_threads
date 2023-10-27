import { redirect } from 'react-router-dom';

export async function requireAuth() {
  const isLoggedIn = localStorage.getItem("loggedin")

  if (!isLoggedIn) {
    throw redirect("/login?message=You mustlog in first")
    response.body=true
    return response
  }
  return null
}
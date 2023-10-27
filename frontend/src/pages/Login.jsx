import React from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { loginUser } from "../api";

export async function loginLoader({ request }) {
  return new URL(request.url).searchParams.get('message')
}


export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const data = await loginUser({ email, password})
  if (data.category == 'success') {
    localStorage.setItem("loggedin", true)
    return redirect(`/?message=${data.message}`)
  }
  else 
    return data.message
}

export default function Login() {
  const message = useLoaderData()
  const error = useActionData()
  const navigation = useNavigation()
  return (
    <div className="form-container">
      <h1>Sign in to your account</h1>
      {message && <div className="alert alert-danger alter-dismissable" role="alert">
          {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
      {error && <h2 className="red">{error}</h2>}
      <Form method="post" className="form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state == 'submitting'}>{navigation.state === 'submitting' ? 'Logging in...': 'Log in'}</button>
      </Form>
    </div>
  );
}

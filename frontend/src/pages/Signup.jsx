import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { createUser } from "../api";

export function loader() {
  return "hey"
}

export async function action({ request }) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const password1 = formData.get('password1')
  const password2 = formData.get('password2')
  const data = await createUser({name, email, password1, password2})
  if (data.category == 'success')
    return redirect('/')
  else
    return data.message
}

export default function Signup() {
  const error = useActionData()
  return (
    <div className="form-container signup">
      <h1>Create New Account</h1>
      {error && <h4 className="red">{error}</h4>}
      <Form method="post" className="form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
        />
        <input type="password" name="password1" id="password1" placeholder="Password"/>
        <input type="password" name="password2" id="password2" placeholder="Confirm Password"/>
        <button className="btn-submit">Submit</button>
      </Form>
    </div>
  );
}

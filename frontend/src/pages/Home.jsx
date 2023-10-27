import React from "react";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export default function Home() {
  const message = useLoaderData();
  return (
    <>
      {message && (
        <div className="alert alert-success alter-dismissable fade show" role="alert">
          {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    <div className="home-content">
      Home
    </div>
      </>
  );
}

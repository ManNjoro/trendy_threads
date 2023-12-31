import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

// Home component
export default function Home() {
  // Fetch the message using the useLoaderData hook
  const message = useLoaderData();
  return (
    <>
    {/* Display an alert if a message is present */}
      {message && (
        <div
          className="alert alert-success alter-dismissable fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {/* Home content */}
      <div className="home-content">
        {/* Banner with a Shop Now button */}
        <div className="banner">
          <div className="btn-shop">
            <p>Shop with us now</p>
            {/* Link to the Products page */}
            <Link to='/products'><button className="btn-shop-now">Shop Now</button></Link>
          </div>
        </div>
        <p className="project-description">
          {/* Welcome message and introduction to Trendy Threads */}
          👋 Welcome to Trendy Threads, where style meets simplicity! We're
          thrilled to have you explore our virtual fashion haven. At Trendy
          Threads, we're not just about clothes; we're about stories,
          individuality, and the joy that comes from expressing yourself through
          fashion. Our journey began with a simple idea: to make trendy and
          affordable clothing accessible to everyone. Each piece in our
          collections is carefully curated to inspire confidence and embrace
          uniqueness. From exclusive designs to eco-friendly practices, we take
          pride in being more than just an online shop; we're a community that
          celebrates the art of dressing up. So, dive into our curated
          collections, discover your signature style, and join us in making
          every day a runway. Happy shopping! 🛍️✨
        </p>
      </div>
    </>
  );
}

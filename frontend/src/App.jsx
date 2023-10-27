import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home, { loader as homeLoader } from "./pages/Home";
import Login, { loginLoader, action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";
import "./App.css";
import Products, { productLoader } from "./pages/Products";
import Cart, { cartLoader } from "./pages/Cart";
import Error from "./components/Error";
import { requireAuth } from "./utils";
import Logout from "./components/Logout";
import ProductDetail, { productDetailLoader } from "./pages/ProductDetail";
import { ShopContextProvider } from "./context/Context";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route
        path="products"
        element={<Products />}
        errorElement={<Error />}
        loader={productLoader}
      />
      <Route
        path="cart"
        element={<Cart />}
        loader={cartLoader}
      />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route path="signup" element={<Signup />} action={signupAction} />
      <Route path="logout" element={<Logout />} />
      <Route
        path="products/:id"
        element={<ProductDetail />}
        loader={productDetailLoader}
      />
    </Route>
  )
);

function App() {
  return (
    <div>
      <ShopContextProvider>
        <RouterProvider router={router} />
      </ShopContextProvider>
    </div>
  );
}

export default App;

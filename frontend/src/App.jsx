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
import ProductDetail, { productDetailLoader } from "./pages/ProductDetail";
import { ShopContextProvider } from "./context/Context";
import NotFound from "./pages/NotFound";
import PayPal from "./pages/PayPal";
import Protected from "./components/Protected";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route
        path="products"
        element={<Protected element={<Products />}/>}
        errorElement={<Error />}
        loader={productLoader}
      />
      <Route
        path="cart"
        element={<Cart />}
        loader={cartLoader}
        errorElement={<Error />}
      />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
        errorElement={<Error />}
      />
      <Route path="signup" element={<Signup />} action={signupAction} errorElement={<Error />} />
      <Route
        path="products/:id"
        element={<ProductDetail />}
        loader={productDetailLoader}
        errorElement={<Error />}
      />
      <Route path="/cart/payment" element={<PayPal />} errorElement={<Error />} />
      <Route path="*" element={<NotFound />} />
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

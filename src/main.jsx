import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./pages/AppLayout.jsx";
import Homepage from "./pages/HomePage.jsx";
import PricePage from "./pages/PricePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

import { AuthenticationProvider } from "./contexts/AuthenticationContext.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";

import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import Form from "./components/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/pricing",
    element: <PricePage/>,
  },

  {
    path: "/product",
    element: <ProductPage/>,
  },

  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/app",
    element: <AppLayout/>,
    children: [
      {
        path: "cities",
        element: <CityList />
      },
      {
        path: "cities/:id",
        element: <City />
      },
      {
        path: "countries",
        element: <CountryList/>
      },
      {
        path:"form",
        element: <Form/>
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound/>,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <AuthenticationProvider>
  <CitiesProvider>

    <RouterProvider router={router} />
      <App />
    </CitiesProvider>
  </AuthenticationProvider>
  </React.StrictMode>
);



{/* <Route index element={<HomePage />} />
<Route path="/pricing" element={<PricePage />} />
<Route path="/product" element={<ProductPage />} />
<Route path="/login" element={<LoginPage />} />

<Route path="/app" element={<AppLayout />}>
  <Route index element={<Navigate replace to={"cities"} />} />
  <Route path="cities" element={<CityList />} />
  <Route path="cities/:id" element={<City />} />
  <Route path="countries" element={<CountryList />} />
  <Route path="form" element={<Form />} />
</Route>
<Route path="*" element={<PageNotFound />} /> */}
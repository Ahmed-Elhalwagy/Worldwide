import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PricePage from "./pages/PricePage";
import ProductPage from "./pages/ProductPage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";

export default function App() {
  return (
    <div>
      <CitiesProvider>
        <AuthenticationProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
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
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthenticationProvider>
      </CitiesProvider>
    </div>
  );
}

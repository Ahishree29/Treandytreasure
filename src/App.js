import React from "react";
import EntryPage from "./components/Authentication/EntryPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/UI/AppLayout";
import Home from "./components/Pages/Home";
import TrendyProvider from "./context/TrendyProvider";
import Product from "./components/Pages/Product";
import ProductView from "./components/Pages/ProductView";
import Stepper from "./components/UI/Stepper";
import MyOrder from "./components/Pages/MyOrder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <TrendyProvider>
              <AppLayout />
            </TrendyProvider>
          }
        >
          <Route index element={<Navigate replace to="Home" />} />
          <Route
            path="Home"
            element={
              <TrendyProvider>
                <Home />
              </TrendyProvider>
            }
          />
          <Route
            path="/Product"
            element={
              <TrendyProvider>
                <Product />
              </TrendyProvider>
            }
          />
          <Route
            path="/ProductView"
            element={
              <TrendyProvider>
                <ProductView />
              </TrendyProvider>
            }
          />
          <Route
            path="/Cart"
            element={
              <TrendyProvider>
                <Stepper />
              </TrendyProvider>
            }
          />
          <Route
            path="/MyOrder"
            element={
              <TrendyProvider>
                <MyOrder />
              </TrendyProvider>
            }
          />
        </Route>
        <Route path="/login" element={<EntryPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./container/Layout";

const Transfer = lazy(() => import("./components/Transfer"));
const Wallet = lazy(() => import("./components/Wallet"));

const Fallback = () => {
  return <>Loading</>;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Fallback />}>
              <Wallet />
            </Suspense>
          }
        />
        <Route
          path="/transfer"
          element={
            <Suspense fallback={<Fallback />}>
              <Transfer />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;

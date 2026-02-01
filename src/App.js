import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useState } from "react";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import RankPage from "./pages/RankPage";
import Layout from "./Layout";

const routes = [{
   path: "/",
   element: <Layout />,
  children : [{
      path: "/",
      element: <HomePage />
    },{
      path: "/game",
      element: <GamePage />
    },{
      path: "/ranks",
      element: <RankPage />
    }]
}]

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; 
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Project from "./pages/Project.tsx";
import DashboardLayout from "./components/Dashboard/DashboardLayout.tsx";


// Define router with correct TypeScript types
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // Add other routes if needed and ensure any imported components are correctly typed
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/project",
    element: (
      <DashboardLayout>
        <Project />
      </DashboardLayout>
    ),
  },
  // {
  //   path: "/dashboard/user",
  //   element: (
  //     <DashboardLayout>
  //       <User />
  //     </DashboardLayout>
  //   ),
  // },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <DashboardLayout>
  //       <DashboardPage />
  //     </DashboardLayout>
  //   ),
  // },
  // {
  //   path: "/dashboard/recipe",
  //   element: (
  //     <DashboardLayout>
  //       <Recipe />
  //     </DashboardLayout>
  //   ),
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

    <RouterProvider router={router} />
  
);

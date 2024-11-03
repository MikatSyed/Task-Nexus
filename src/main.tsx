
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Project from "./pages/Project.tsx";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout.tsx";
import ProjectDetails from "./pages/ProjectDetails.tsx";


// Define router with correct TypeScript types
const router = createBrowserRouter([
 
  // Add other routes if needed and ensure any imported components are correctly typed
  {
    path: "/",
    element: (
      <DashboardLayout>
        <Project />
      </DashboardLayout>
    ),
  },
 
  {
    path: "/dashboard/project/view/:id",
    element: (
      <DashboardLayout>
        <ProjectDetails />
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

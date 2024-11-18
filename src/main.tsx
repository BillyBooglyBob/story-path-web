import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import ProjectList from "./pages/Project/ProjectList.tsx";
import LocationList from "./pages/Location/LocationList.tsx";
import App from "./App.tsx";
import Preview from "./pages/Preview.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateProjectForm from "./pages/Project/AddProjectForm.tsx";
import UpdateProjectForm from "./pages/Project/EditProjectForm.tsx";
import AddLocationForm from "./pages/Location/AddLocationForm.tsx";
import EditLocationForm from "./pages/Location/EditLocationForm.tsx";
import { AnimatePresence } from "framer-motion";
import AboutPage from "./pages/AboutPage.tsx";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size for Leaflet icons
  iconAnchor: [12, 41], // Anchor for the icon base
});


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/project",
        element: <ProjectList />,
      },
      {
        path: "/project/add",
        element: <CreateProjectForm />,
      },
      {
        path: "/project/:projectId",
        element: <UpdateProjectForm />,
      },
      {
        path: "/project/:projectId/location",
        element: <LocationList />,
      },
      {
        path: "/project/:projectId/location/add/:locationOrder",
        element: <AddLocationForm />,
      },
      {
        path: "/project/:projectId/location/:locationId",
        element: <EditLocationForm />,
      },
      {
        path: "/project/:projectId/preview",
        element: <Preview />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    </QueryClientProvider>
  </StrictMode>
);

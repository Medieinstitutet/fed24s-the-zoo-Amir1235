import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import AnimalsOverview from "./pages/AnimalsOverview";
import AnimalDetail from "./pages/AnimalDetail";
import NotFound from "./pages/NotFound";

function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <Link to="/" className="app-title">Zoo</Link>
        <nav>
          <Link to="/animals" className="app-nav-link">Djur</Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "animals", element: <AnimalsOverview /> },
      { path: "animals/:id", element: <AnimalDetail /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

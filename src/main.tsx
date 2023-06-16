import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store, persistor } from "./app/store.ts";
import ErrorPage from "./error-page.tsx";
import "./index.css";
import Root from "./routes/Root.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        // element: <PrivateRoute />,
        children: [
          {
            path: "/travel",
            children: [
              {
                path: "/travel/create",
                async lazy() {
                  const { default: TravelCreate } = await import(
                    "./features/travel/Create.tsx"
                  );
                  return { element: <TravelCreate /> };
                },
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        async lazy() {
          const { default: Login } = await import("./features/login/Login.tsx");
          return { element: <Login /> };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

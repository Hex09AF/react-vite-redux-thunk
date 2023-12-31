import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store, persistor } from "./app/store.ts";
import ErrorPage from "./error-page.tsx";
import "./index.css";
import Root from "./routes/Root.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./configs/theme.ts";
import "mapbox-gl/dist/mapbox-gl.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <PrivateRoute />,
				children: [
					{
						path: "/",
						async lazy() {
							const { default: LandingRive } = await import(
								"./features/landing-rive/LandingRive.tsx"
							);
							return { element: <LandingRive /> };
						},
					},
					{
						path: "/travel",
						children: [
							{
								path: "/travel",
								async lazy() {
									const { default: Travel } = await import("./features/travel/Travel.tsx");
									return { element: <Travel /> };
								},
							},
							{
								path: "/travel/create",
								async lazy() {
									const { default: TravelCreate } = await import("./features/travel/Create.tsx");
									return { element: <TravelCreate /> };
								},
							},
							{
								path: "/travel/:travelId/edit",
								async lazy() {
									const { default: TravelEdit } = await import("./features/travel/Edit.tsx");
									return { element: <TravelEdit /> };
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
	// <React.StrictMode>
	<ChakraProvider theme={theme}>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</ChakraProvider>
	// </React.StrictMode>
);

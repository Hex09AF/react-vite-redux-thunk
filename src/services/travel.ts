import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import env from "../configs/environment";

export interface User {
	username: string;
}

export interface CreateResponse {
	url: string;
}

export interface CreateRequest {
	title: string;
	content: string;
	file: File;
}
export interface updateRequest {
	id: string;
	data: Partial<Travel>;
}

export interface Travel {
	id: number;
	title: string;
	content: string | null;
	url: string | null;
	published: boolean | null;
	authorId: number | null;
}

export const travelApi = createApi({
	reducerPath: "api/travel",
	baseQuery: fetchBaseQuery({
		baseUrl: env.BASE_API_URL,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getDetailTravel: builder.query<Travel, string>({
			query: (id) => `/photos/${id}`,
		}),
		getTravel: builder.query<Travel[], void>({
			query: () => "/photos",
		}),
		createTravel: builder.mutation<CreateResponse, FormData>({
			query: (data) => ({
				url: "/photos/upload-firebase",
				method: "POST",
				body: data,
			}),
		}),
		updateTravel: builder.mutation<CreateResponse, updateRequest>({
			query: ({ id, data }) => {
				return {
					url: `/photos/${id}`,
					method: "PATCH",
					body: data,
				};
			},
		}),
	}),
});

export const {
	useCreateTravelMutation,
	useGetTravelQuery,
	useGetDetailTravelQuery,
	useUpdateTravelMutation,
} = travelApi;

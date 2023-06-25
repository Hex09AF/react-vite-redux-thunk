import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import env from "../configs/environment";

export interface User {
	username: string;
}

export interface UserResponse {
	user: User;
	token: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export const api = createApi({
	reducerPath: "api/auth",
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
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: "/auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useLoginMutation } = api;

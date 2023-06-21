import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reverseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places",
	}),
	endpoints: (builder) => ({
		reverse: builder.query({
			query: (path) => path,
		}),
	}),
});

export const { useLazyReverseQuery } = reverseApi;

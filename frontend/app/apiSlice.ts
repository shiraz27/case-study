import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: '/auth',
                method: 'Get',
                headers: {
                    Authorization: `Bearer f9akif`,
                },
            }),
        }),
    }),
});

export const {useGetMeQuery} = api;
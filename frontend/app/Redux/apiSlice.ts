import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken, AuthState } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = selectToken(getState() as AuthState);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  tagTypes: ["getMe", "getOrders", "fetchOrder"],
  endpoints: (builder) => ({
    // Get user
    getMe: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      providesTags: ["getMe"],
    }),

    // Get a list of orders
    getOrders: builder.query({
      query: () => ({
        url: "/billing",
        method: "GET",
      }),
      providesTags: ["getOrders"],
    }),

    // Create an order
    createOrder: builder.mutation({
      query: () => ({
        url: "/billing",
        method: "PUT",
      }),
    }),

    // Fetch a specific order
    fetchOrder: builder.query({
      query: (orderId) => ({
        url: `/billing/${orderId}`,
        method: "GET",
      }),
      providesTags: ["fetchOrder"],
    }),

    // Login / Create user
    login: builder.mutation({
      query: () => ({
        url: "/auth",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useFetchOrderQuery,
  useLoginMutation,
} = api;

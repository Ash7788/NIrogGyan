import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = api;
export default api;

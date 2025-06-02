// src/redux/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://your-api.com/api"; // replace with your real API URL

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.token) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    registerUser: builder.mutation({
      query: ({ email, password, fname, lname }) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          email,
          password,
          firstName: fname,
          lastName: lname,
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

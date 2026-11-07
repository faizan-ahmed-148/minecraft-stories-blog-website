import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getApi = createApi({
  reducerPath: "getApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),

  endpoints: (builder) => ({
    getSiteMap: builder.query({
      query: (args) => {
        const { baseUrl, apiType } = args;
        if (!baseUrl) {
          return { url: "", method: "GET" };
        }
        let customUrl = new URL(baseUrl + apiType);
        return {
          url: customUrl.toString(), // Ensure it's a string
          method: "GET",
        };
      },
    }),
  }),
});

// Correct export of hook
export const { useGetSiteMapQuery } = getApi;
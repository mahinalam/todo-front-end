import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "../features/todoSlice";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["todo"],
  endpoints: (build) => ({
    getTodo: build.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return `/tasks?${params}`;
      },
      providesTags: ["todo"],
    }),
    addTodo: build.mutation({
      query(body: Omit<ITodo, "_id">) {
        return {
          url: "/task",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["todo"],
    }),
    updateTodo: build.mutation({
      query(data) {
        console.log("data", data);
        const { _id, ...body } = data;
        return {
          url: `/task/${_id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["todo"],
    }),
    removeTodo: build.mutation({
      query(id) {
        return {
          url: `/task/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["todo"],
    }),
    toogleStateChange: build.mutation({
      query(data) {
        return {
          url: `/task/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});
console.log("hi");
console.log({ baseApi });

export const {
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useToogleStateChangeMutation,
} = baseApi;

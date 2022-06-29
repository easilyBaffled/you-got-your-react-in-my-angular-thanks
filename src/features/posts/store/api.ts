import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
    id: string;
    name: string;
}

type PostsResponse = Post[];

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: (build) => ({
        addPost: build.mutation<Post, Partial<Post>>({
            invalidatesTags: [{ id: "LIST", type: "Post" }],
            query: (body) => ({
                body,
                method: "POST",
                url: `posts`
            })
        }),
        deletePost: build.mutation<{ success: boolean; id: number }, number>({
            invalidatesTags: (result, error, id) => [{ id, type: "Post" }],
            query(id) {
                return {
                    method: "DELETE",
                    url: `posts/${id}`
                };
            }
        }),
        getPost: build.query<Post, string>({
            providesTags: (result, error, id) => [{ id, type: "Post" }],
            query: (id) => `posts/${id}`
        }),
        getPosts: build.query<PostsResponse, void>({
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              id,
                              type: "Post" as const
                          })),
                          { id: "LIST", type: "Post" }
                      ]
                    : [{ id: "LIST", type: "Post" }],
            query: () => "posts"
        }),
        updatePost: build.mutation<void, Pick<Post, "id"> & Partial<Post>>({
            invalidatesTags: (result, error, { id }) => [{ id, type: "Post" }],
            query: ({ id, ...patch }) => ({
                body: patch,
                method: "PUT",
                url: `posts/${id}`
            })
        })
    }),
    tagTypes: ["Post"]
});

export const {
    useGetPostQuery,
    useGetPostsQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = api;

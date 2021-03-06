import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spacer,
    Stat,
    StatLabel,
    StatNumber,
    useToast
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Post, useAddPostMutation, useGetPostsQuery } from "../store";

const AddPost = () => {
    const initialValue = { name: "" };
    const [post, setPost] = useState<Pick<Post, "name">>(initialValue);
    const [addPost, { isLoading }] = useAddPostMutation();
    const toast = useToast();

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const handleAddPost = async () => {
        try {
            await addPost(post).unwrap();
            setPost(initialValue);
        } catch {
            toast({
                description: "We couldn't save your post, try again!",
                duration: 2000,
                isClosable: true,
                status: "error",
                title: "An error occurred"
            });
        }
    };

    return (
        <Flex p={5}>
            <Box flex={10}>
                <FormControl
                    isInvalid={Boolean(post?.name.length < 3 && post?.name)}
                >
                    <FormLabel htmlFor="name">Post name</FormLabel>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter post name"
                        value={post?.name}
                        onChange={handleChange}
                    />
                </FormControl>
            </Box>
            <Spacer />
            <Box>
                <Button
                    mt={8}
                    colorScheme="purple"
                    isLoading={isLoading}
                    onClick={handleAddPost}
                >
                    Add Post
                </Button>
            </Box>
        </Flex>
    );
};

export const PostsCountStat = () => {
    const { data: posts } = useGetPostsQuery();

    if (!posts) return null;

    return (
        <Stat>
            <StatLabel>Active Posts</StatLabel>
            <StatNumber>{posts?.length}</StatNumber>
        </Stat>
    );
};

export const PostsManager = () => {
    return (
        <Box>
            <Flex bg="#011627" p={4} color="white">
                <Box>
                    <Heading size="xl">Manage Posts</Heading>
                </Box>
                <Spacer />
                <Box>
                    <PostsCountStat />
                </Box>
            </Flex>
            <Divider />
            <AddPost />
            <Divider />
            <Flex wrap="wrap">
                <Box flex={1} borderRight="1px solid #eee">
                    <Box p={4} borderBottom="1px solid #eee">
                        <Heading size="sm">Posts</Heading>
                    </Box>
                    {/* <Box p={4}>*/}
                    {/*	<PostList/>*/}
                    {/* </Box>*/}
                </Box>
                <Box flex={2}>
                    <Routes>
                        {/* <Route path="/posts/:id" element={<PostDetail/>}/>*/}
                        <Route
                            element={
                                <Center h="200px">
                                    <Heading size="md">
                                        Select a post to edit!
                                    </Heading>
                                </Center>
                            }
                        />
                    </Routes>
                </Box>
            </Flex>
        </Box>
    );
};

import React, { useState } from "react";
import { Box, Heading, List, useColorModeValue, Stack } from "@chakra-ui/react";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import PostListItem from "../../../components/postListItem";
import { postsData } from "./constants";

const ProfessionalCollabration = () => {
  const [posts, setPosts] = useState(postsData);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const handleUpvote = (id) => {
    console.log("id", id);

    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, count: post.count + 1 } : post
      )
    );
  };
  return (
    <Box bg={bgColor} p={4} rounded="md">
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as="h3" mb={4}>
          Professional Forums
        </Heading>
        <List spacing={4}>
          {posts.map((forum) => (
            <PostListItem
              key={forum.id}
              post={forum}
              handleUpvote={handleUpvote}
            />
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default ProfessionalCollabration;

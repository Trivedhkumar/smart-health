import {
  Button,
  Heading,
  HStack,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: {
    id: number | string;
    forumId: number;
    author: string;
    title: string;
    content: string;
    date: string;
    count: number;
  };
  handleUpvote?: (id: number | string) => void;
}
const PostListItem = ({ post, handleUpvote }: PostProps) => {
  const navigate = useNavigate();
  const handleOpenPost = (id) => {
    navigate(`/professionalcollaboration/${id}`);
  };

  return (
    <ListItem borderWidth={1} p={2} borderRadius={5} key={post.id}>
      <HStack>
        <HStack
          borderWidth={1}
          borderRadius={10}
          px={2}
          py={1}
          cursor={"pointer"}
          onClick={() => {
            handleUpvote && handleUpvote(post.id);
          }}
        >
          <FaArrowCircleUp color="teal" />
          <Text mr={2}>2</Text>
        </HStack>
        <Heading as="h6" size={"md"}>
          {post.title}
        </Heading>
      </HStack>
      <Text fontSize="sm">by {post.author}</Text>
      <Spacer />
      <Text fontSize="sm">{post.date}</Text>
      <Button size="xs" variant="ghost" onClick={() => handleOpenPost(post.id)}>
        View Post
      </Button>
    </ListItem>
  );
};
export default PostListItem;

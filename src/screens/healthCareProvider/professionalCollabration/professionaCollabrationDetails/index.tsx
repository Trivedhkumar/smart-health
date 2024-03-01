import React, { useState } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  Flex,
  Stack,
  FormControl,
  FormErrorMessage,
  List,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getMenuItemsByRole } from "../../../../utils/functions";
import { NavBar } from "../../../../components";
import PostListItem from "../../../../components/postListItem";
import { postsData } from "../constants";
import { useParams } from "react-router-dom";
import { messages as messageData } from "./constants";

const validationSchema = z.object({
  message: z.string().min(1, { message: "Message can't be empty" }),
});
type ValidationSchema = z.infer<typeof validationSchema>;

const defaultFormValues = {
  message: "",
};
const ProfessionalCollabrationDetails = () => {
  const [messages, setMessages] = useState(messageData);
  const role = localStorage.getItem("user");
  const userMenu = getMenuItemsByRole(role);
  const { id } = useParams();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    register,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = (values: ValidationSchema) => {
    setMessages([
      ...messages,
      {
        id: uuidv4(),
        message: values.message,
        role: role,
        sender: "You",
        timestamp: new Date().toLocaleString(),
      },
    ]);
    console.log(values);
    reset();
  };
  const post = postsData.find((post) => post.id.toString() === id);

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <List spacing={4}>
          <PostListItem post={post} />
        </List>
        <Box
          mb={4}
          bg="gray.50"
          borderRadius="md"
          overflowY="auto"
          maxHeight="400px"
        >
          <Box>
            {messages.map((message) => (
              <Flex p={4} key={message.id} _hover={{ bg: "gray.100" }}>
                <Box>
                  <Text fontWeight="bold">{message.sender}</Text>
                  <Text fontSize="sm">{message.message}</Text>
                  <Text mt={2} fontSize="xs">
                    {message.timestamp}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>

        <form>
          <FormControl my={2} isInvalid={!!errors.message}>
            <Textarea
              {...register("message")}
              placeholder="Compose new message"
            />

            <FormErrorMessage colorScheme="red">
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            borderRadius={0}
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="solid"
            colorScheme="teal"
          >
            Comment
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default ProfessionalCollabrationDetails;

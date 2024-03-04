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
} from "@chakra-ui/react";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { messagesData } from "./constants";

const validationSchema = z.object({
  message: z.string().min(1, { message: "Message can't be empty" }),
});
type ValidationSchema = z.infer<typeof validationSchema>;

const defaultFormValues = {
  message: "",
};
const ChatScreen = () => {
  const [messages, setMessages] = useState(messagesData);
  const role = localStorage.getItem("user");
  const userMenu = getMenuItemsByRole(role);
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
    reset();
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Box
          mb={4}
          bg="gray.50"
          borderRadius="md"
          overflowY="auto"
          maxHeight="400px"
        >
          <Box>
            {messages.map((message) => (
              <Flex
                p={4}
                key={message.id}
                justifyContent="space-between"
                _hover={{ bg: "gray.100" }}
              >
                {message.sender !== "You" && <Box></Box>}
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
            Send
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default ChatScreen;

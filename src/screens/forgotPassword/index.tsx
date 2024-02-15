import { useForm } from "react-hook-form";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "../../constants";
import { useNavigate } from "react-router";
import React from "react";
const CFaUserAlt = chakra(FaUserAlt);

const ForgotPasswordScreen = () => {
  const validationSchema = z.object({
    email: z
      .string({ required_error: ERROR_MESSAGES.requiredField })
      .email({ message: ERROR_MESSAGES.validEmail }),
  });
  const defaultFormValues = {
    email: "",
  };
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
  };
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Reset Password</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isInvalid={!!errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="email address"
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <Stack direction="row" spacing={4} align="center">
                <Button
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  borderRadius={0}
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Go Back
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPasswordScreen;

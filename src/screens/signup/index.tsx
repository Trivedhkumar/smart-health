import { useState } from "react";
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
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaMailBulk } from "react-icons/fa";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES, ROLES } from "../../constants";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import React from "react";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaMail = chakra(FaMailBulk);

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = z
    .object({
      email: z
        .string({ required_error: ERROR_MESSAGES.requiredField })
        .email({ message: ERROR_MESSAGES.validEmail }),
      password: z
        .string({ required_error: ERROR_MESSAGES.requiredField })
        .min(3, { message: ERROR_MESSAGES.minLength })
        .max(8, { message: ERROR_MESSAGES.maxPassword }),
      name: z
        .string({ required_error: ERROR_MESSAGES.requiredField })
        .min(3, { message: ERROR_MESSAGES.minLength })
        .max(30, { message: ERROR_MESSAGES.maxLength }),
      confirmPassword: z
        .string({ required_error: ERROR_MESSAGES.requiredField })
        .min(3, { message: ERROR_MESSAGES.minLength })
        .max(8, { message: ERROR_MESSAGES.maxPassword }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    });
  const defaultFormValues = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  };
  const handleShowClick = () => setShowPassword(!showPassword);
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
  const userMenu = getMenuItemsByRole(ROLES.GUEST);

  return (
    <Box width="100wh" backgroundColor="gray.200" height="100vh">
      <NavBar menuarray={userMenu} isLogoutButtonRequired={false} />
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl isInvalid={!!errors.name}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input {...register("name")} placeholder="Name" />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaMail color="gray.300" />}
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
                <FormControl isInvalid={!!errors.password}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPassword}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      {...register("confirmPassword")}
                      type={"password"}
                      placeholder="Confirm Password"
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Sign up
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already have an account?{" "}
          <Link color="teal.500" href="/login">
            Login
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUpScreen;

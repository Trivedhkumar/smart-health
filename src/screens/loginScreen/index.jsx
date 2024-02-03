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
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "../../constants";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = z.object({
    email: z
      .string({ required_error: ERROR_MESSAGES.requiredField })
      .email({ message: ERROR_MESSAGES.validEmail }),
    password: z
      .string({ required_error: ERROR_MESSAGES.requiredField })
      .min(3, { message: ERROR_MESSAGES.minLength })
      .max(8, { message: ERROR_MESSAGES.maxPassword }),
  });
  const defaultFormValues = {
    email: "",
    password: "",
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
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isInvalid={errors.email}>
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
              <FormControl isInvalid={errors.password}>
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
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
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
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="/signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default LoginScreen;

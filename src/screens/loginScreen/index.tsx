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
import { ERROR_MESSAGES, ROLES,ROLES_ID } from "../../constants";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import React from "react";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const validationSchema = z.object({
  email: z
    .string({ required_error: ERROR_MESSAGES.requiredField })
    .email({ message: ERROR_MESSAGES.validEmail }),
  password: z
    .string({ required_error: ERROR_MESSAGES.requiredField })
    .min(3, { message: ERROR_MESSAGES.minLength }),
});
type ValidationSchema = z.infer<typeof validationSchema>;
const defaultFormValues = {
  username:"",
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

  const onSubmit = async (values: ValidationSchema) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:values.email,
          password: values.password,
        }),
      });
  
      if (!response.ok) {
        // Handle error response
        throw new Error('Login failed');
      }
  
      const data = await response.json();
  
      // Save the token to local storage for subsequent requests
      localStorage.setItem('token', data.token);
  
      // Save the user ID to local storage for session access
      localStorage.setItem('userID', data.user.userID.toString());
      //save user role 
      localStorage.setItem('userRole',data.user.userRoleID);
  
      // Navigate to dashboard with state
      if (data.user.userRoleID == ROLES_ID.HEALTHCARE_PROVIDERS_ROLE_ID){
        navigate('/eprescriptions', {
          state: {
            email: values.email,
          },
        });
      }else{
        navigate('/dashboard', {
          state: {
            email: values.email,
          },
        });
      }
     
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  
  const userMenu = parseInt(localStorage.getItem('userRole'))== ROLES_ID.HEALTHCARE_PROVIDERS_ROLE_ID? getMenuItemsByRole(ROLES.HEALTHCARE_PROVIDERS) : getMenuItemsByRole(ROLES.GUEST);

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
                  <FormHelperText textAlign="right">
                    <Link href="/forgotPassword">forgot password?</Link>
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
    </Box>
  );
};

export default LoginScreen;

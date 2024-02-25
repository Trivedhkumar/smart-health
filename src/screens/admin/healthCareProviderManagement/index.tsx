import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { startCase } from "lodash";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { DOCTORS } from "../../home/constants";
import { HEALTHCARE_PROVIDERS } from "./constants";
const validationSchema = z.object({
  name: z.string().min(1, { message: "Please enter the name" }),
  email: z.string().email().min(1, { message: "Please enter the email" }),
  mobile: z.string().min(1, { message: "Please enter the mobile" }),
});
type ValidationSchema = z.infer<typeof validationSchema>;
const defaultFormValues = {
  name: "",
  email: "",
  mobile: "",
};
const HealthCareProviderManagement = () => {
  const [healthCareProviders, setHealthCareProviders] =
    useState(HEALTHCARE_PROVIDERS);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const handleEdit = (id: number | string) => {
    setHealthCareProviders(
      healthCareProviders.map((user) =>
        user.id === id ? { ...user, deactivated: true, activated: false } : user
      )
    );
    onOpen();
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    register,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (values: ValidationSchema) => {
    console.log("values", values);

    // Simulate backend call
    reset();
    onClose();
    toast({
      title: "Details updated successfully",
      description: "We've updated the user details for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as={"h3"} size={"md"}>
          Health Care Providers
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {healthCareProviders.map((user) => (
                <Tr key={user.id}>
                  <Td>{startCase(user.name)}</Td>
                  <Td>{user.email}</Td>
                  <Td>{startCase(user.mobile)}</Td>
                  <Td>
                    <Button
                      onClick={() => handleEdit(user.id)}
                      colorScheme={"teal"}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl my={2} isInvalid={!!errors.name}>
                <Input type={"text"} placeholder="name" {...register("name")} />
                <FormErrorMessage colorScheme="red">
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl my={2} isInvalid={!!errors.email}>
                <Input
                  type={"text"}
                  placeholder="email@xyz.com"
                  {...register("email")}
                />

                <FormErrorMessage colorScheme="red">
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl my={2} isInvalid={!!errors.mobile}>
                <Input
                  type={"number"}
                  placeholder="9999999999"
                  {...register("mobile")}
                />

                <FormErrorMessage colorScheme="red">
                  {errors.mobile && errors.mobile.message}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
            >
              Confirm
            </Button>
            <Button colorScheme="red" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default HealthCareProviderManagement;

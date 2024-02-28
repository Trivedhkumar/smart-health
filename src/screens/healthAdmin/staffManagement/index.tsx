import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Input,
  FormControl,
  useDisclosure,
  Badge,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormHelperText,
  FormErrorMessage,
  Select,
  useToast,
} from "@chakra-ui/react";
import { FaTrash, FaUserFriends } from "react-icons/fa";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreatableSelect } from "chakra-react-select";
import { departments, permissions, roles, staffData } from "./constants";

const permissionSchema = z.object({
  label: z.string(),
  value: z.string(),
});
const validationSchema = z.object({
  name: z.string().min(1, { message: "Please enter the name" }),

  permissions: z.array(permissionSchema).superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select at least one ",
      });
    }
  }),
  role: z.string().min(1, { message: "Please choose a option" }),
  department: z.string().min(1, { message: "Please choose a option" }),
});
const defaultFormValues = {
  name: "",
  department: "",
  permissions: [],
  role: "",
};
type ValidationSchema = z.infer<typeof validationSchema>;

const StaffManagement = () => {
  const [staff, setStaff] = useState(staffData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStaff, setselectedStaff] = useState(null);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const handleEditStaff = (staff) => {
    setselectedStaff(staff);
    onOpen();
  };
  const handleDeleteStaff = (id) => {
    setStaff(staff.filter((facality) => facality.id !== id));
    toast({
      title: "Staff deleted successfully",
      description: "We've deleted the staff details for you.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const toast = useToast();
  const handleCloseModal = () => {
    reset();
    onClose();
  };
  const handleFormSubmit = (values: ValidationSchema) => {
    // Implement form validation and submission logic (optional)
    console.log("Values", values);
    handleCloseModal();
    if (selectedStaff) {
      toast({
        title: "Staff updated successfully",
        description: "We've updated the staff details for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Staff added successfully",
        description: "We've added the staff details for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    // setFacilities([
    //   {
    //     id: uuidv4(),
    //     department: values.department,
    //     name: values.name,
    //     permissions: {

    //     }
    //     role: values.role,
    //   },
    // ]);
  };
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const handleAddFacility = () => {
    setselectedStaff(null);
    onOpen();
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as="h1" mb={4}>
          Staff Coordination
        </Heading>
        <Box mb={4}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Permissions</Th>
                  <Th>Role</Th>
                  <Th>Department</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {staff.map((staff) => (
                  <Tr key={staff.id}>
                    <Td>
                      <Stack>
                        <HStack>
                          <FaUserFriends />
                          <Text fontWeight="bold">{staff.name}</Text>
                        </HStack>
                        <Text fontSize="sm">{staff.department}</Text>
                      </Stack>
                    </Td>
                    <Td>
                      <HStack
                        alignItems={"center"}
                        spacing={2}
                        flexWrap={"wrap"}
                      >
                        {staff.permissions.map((permission) => (
                          <Badge
                            key={permission.value}
                            variant="outline"
                            colorScheme="teal"
                          >
                            {permission.label}
                          </Badge>
                        ))}
                      </HStack>
                    </Td>
                    <Td>
                      <Text>{staff.role}</Text>
                    </Td>
                    <Td>
                      <Text>{staff.department}</Text>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button onClick={() => handleEditStaff(staff)}>
                          Edit
                        </Button>
                        <FaTrash
                          onClick={() => handleDeleteStaff(staff.id)}
                          cursor={"pointer"}
                          color="red"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Button colorScheme={"teal"} onClick={handleAddFacility}>
          Add Staff
        </Button>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {!selectedStaff ? "Add Staff" : "Edit Staff"}
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              {/* Form fields for name, department, permissions, role, contact, hours */}
              <form>
                <FormControl>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter staff name"
                    {...register("name")}
                  />
                  <FormHelperText color={"red"}>
                    {errors?.name?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Select
                    {...register("department")}
                    name="department"
                    placeholder="Select Role"
                    mb={4}
                  >
                    {departments.map((department) => (
                      <option key={department.id} value={department.value}>
                        {department.label}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.department?.message}
                  </FormHelperText>
                </FormControl>
                <Controller
                  control={control}
                  name="permissions"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, error },
                  }) => (
                    <FormControl py={4} isInvalid={invalid} id="permissions">
                      <CreatableSelect
                        isMulti
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        options={permissions}
                        placeholder="Select permissions"
                        closeMenuOnSelect={false}
                      />

                      <FormErrorMessage colorScheme="red">
                        {error && error.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                />
                <FormControl>
                  <Select
                    {...register("role")}
                    name="role"
                    placeholder="Select Role"
                    mb={4}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.role?.message}
                  </FormHelperText>
                </FormControl>
                {/* ... other form fields */}

                <Button
                  my={2}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  type="submit"
                  colorScheme={"teal"}
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  {!selectedStaff ? "Add Staff" : "Edit Staff"}
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};
export default StaffManagement;

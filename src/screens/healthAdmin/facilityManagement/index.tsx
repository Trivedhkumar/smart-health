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
import { FaHospitalAlt, FaTrash } from "react-icons/fa";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreatableSelect } from "chakra-react-select";
import { v4 as uuidv4 } from "uuid";
import { ROLES } from "../../../constants";

const facilitiesData = [
  // Replace with actual facility data
  {
    id: uuidv4(),
    name: "Central Hospital",
    location: "New York, NY",
    services: [
      {
        label: "Emergency Care",
        value: "emergency_care",
      },
      {
        label: "Cardiology",
        value: "cardiology",
      },
      {
        label: "Pediatrics",
        value: "pediatrics",
      },
    ],
    status: "active",
  },
  {
    id: uuidv4(),
    name: "East Clinic",
    location: "Los Angeles, CA",
    services: [
      {
        label: "Family Medicine",
        value: "family_medicine",
      },
      {
        label: "Dermatology",
        value: "dermatology",
      },
    ],
    status: "inactive",
  },
  // ... add more facilities
];

const services = [
  {
    label: "Emergency Care",
    value: "emergency_care",
  },
  {
    label: "Cardiology",
    value: "cardiology",
  },
  {
    label: "Pediatrics",
    value: "pediatrics",
  },
  {
    label: "Family Medicine",
    value: "family_medicine",
  },
  {
    label: "Dermatology",
    value: "dermatology",
  },
];
const serviceSchema = z.object({
  label: z.string(),
  value: z.string(),
});
const validationSchema = z.object({
  name: z.string().min(1, { message: "Please enter the name" }),
  location: z.string().min(1, { message: "Please enter the location" }),
  services: z.array(serviceSchema).superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select at least one ",
      });
    }
  }),
  status: z.string().min(1, { message: "Please choose a option" }),
});
const defaultFormValues = {
  name: "",
  location: "",
  services: [],
  status: "",
};
type ValidationSchema = z.infer<typeof validationSchema>;

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState(facilitiesData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFacility, setSelectedFacility] = useState(null);

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
  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
    onOpen();
  };
  const handleDeleteFacility = (id) => {
    setFacilities(facilities.filter((facality) => facality.id !== id));
    toast({
      title: "Facility deleted successfully",
      description: "We've deleted the facility details for you.",
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
    if (selectedFacility) {
      toast({
        title: "Facility updated successfully",
        description: "We've updated the facility details for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Facility added successfully",
        description: "We've added the facility details for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    // setFacilities([
    //   {
    //     id: uuidv4(),
    //     location: values.location,
    //     name: values.name,
    //     services: {

    //     }
    //     status: values.status,
    //   },
    // ]);
  };
  const userMenu = getMenuItemsByRole(ROLES.HEALTH_ADMINISTRATOR);
  const handleAddFacility = () => {
    setSelectedFacility(null);
    onOpen();
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as="h1" mb={4}>
          Facility Management
        </Heading>
        <Box mb={4}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Facility</Th>
                  <Th>Services Offered</Th>
                  <Th>Operational Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {facilities.map((facility) => (
                  <Tr key={facility.id}>
                    <Td>
                      <Stack>
                        <HStack>
                          <FaHospitalAlt />
                          <Text fontWeight="bold">{facility.name}</Text>
                        </HStack>
                        <Text fontSize="sm">{facility.location}</Text>
                      </Stack>
                    </Td>
                    <Td>
                      <HStack
                        alignItems={"center"}
                        spacing={2}
                        flexWrap={"wrap"}
                      >
                        {facility.services.map((service) => (
                          <Badge
                            key={service.value}
                            variant="outline"
                            colorScheme="teal"
                          >
                            {service.label}
                          </Badge>
                        ))}
                      </HStack>
                    </Td>
                    <Td>
                      <Badge
                        variant={
                          facility.status === "active" ? "success" : "warning"
                        }
                      >
                        {facility.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button onClick={() => handleFacilityClick(facility)}>
                          Edit
                        </Button>
                        <FaTrash
                          onClick={() => handleDeleteFacility(facility.id)}
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
          Add Facility
        </Button>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {!selectedFacility ? "Add Facility" : "Edit Facility"}
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              {/* Form fields for name, location, services, status, contact, hours */}
              <form>
                <FormControl>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter facility name"
                    {...register("name")}
                  />
                  <FormHelperText color={"red"}>
                    {errors?.name?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter location name"
                    {...register("location")}
                  />
                  <FormHelperText color={"red"}>
                    {errors?.location?.message}
                  </FormHelperText>
                </FormControl>
                <Controller
                  control={control}
                  name="services"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, error },
                  }) => (
                    <FormControl py={4} isInvalid={invalid} id="services">
                      <CreatableSelect
                        isMulti
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        options={services}
                        placeholder="Select services"
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
                    {...register("status")}
                    name="status"
                    placeholder="Select Operational Status"
                    mb={4}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.status?.message}
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
                  {!selectedFacility ? "Add Facility" : "Edit Facility"}
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};
export default FacilityManagement;

import React, { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Stack,
  useDisclosure,
  Badge,
  Tag,
  FormControl,
  FormHelperText,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  assignedTo,
  incidentData,
  incidentStatuses,
  incidentTypes,
  severities,
  severityColors,
} from "./constants";

const validationSchema = z.object({
  type: z.string().min(1, { message: "Please choose a option" }),

  severity: z.string().min(1, { message: "Please choose a option" }),
  status: z.string().min(1, { message: "Please choose a option" }),
  assignedTo: z.string().min(1, { message: "Please choose a option" }),
});
const defaultFormValues = {
  type: "",
  severity: "",
  permissions: [],
  role: "",
};
type ValidationSchema = z.infer<typeof validationSchema>;

const IncidentResponse = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = (incident) => {
    setSelectedIncident(incident);
    onOpen();
  };
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const handleFormSubmit = () => {
    handleCloseModal();
    toast({
      title: "Incident updated successfully",
      description: "We've updated the incident details for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const toast = useToast();
  const handleCloseModal = () => {
    reset();
    onClose();
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as="h1" mb={4}>
          Incident Response
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Severity</Th>
              <Th>Status</Th>
              <Th>Assigned To</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {incidentData.map((incident) => (
              <Tr key={incident.id}>
                <Td>{incident.type}</Td>
                <Td>
                  <Badge colorScheme={severityColors[incident.severity]}>
                    {incident.severity}
                  </Badge>
                </Td>
                <Td>
                  <Tag
                    colorScheme={incident.status === "Closed" ? "green" : "red"}
                  >
                    {incident.status}
                  </Tag>
                </Td>
                <Td>{incident.assignedTo}</Td>
                <Td isNumeric>
                  <Flex gap={2}>
                    <FaEdit onClick={() => handleOpenModal(incident)} />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Incident Details
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <form>
                <FormControl>
                  <Select
                    {...register("type")}
                    name="type"
                    placeholder="Select Role"
                    mb={4}
                  >
                    {incidentTypes.map((type) => (
                      <option key={type.id} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.type?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Select
                    {...register("severity")}
                    name="severity"
                    placeholder="Select Role"
                    mb={4}
                  >
                    {severities.map((severity) => (
                      <option key={severity.id} value={severity.value}>
                        {severity.label}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.severity?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <Select
                    {...register("status")}
                    name="status"
                    placeholder="Select Role"
                    mb={4}
                  >
                    {incidentStatuses.map((incidentStatus) => (
                      <option
                        key={incidentStatus.id}
                        value={incidentStatus.value}
                      >
                        {incidentStatus.label}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.status?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Select
                    {...register("assignedTo")}
                    name="assignedTo"
                    placeholder="Select Role"
                    mb={4}
                  >
                    {assignedTo.map((assign) => (
                      <option key={assign.id} value={assign.value}>
                        {assign.label}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.assignedTo?.message}
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
                  Update
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};

export default IncidentResponse;

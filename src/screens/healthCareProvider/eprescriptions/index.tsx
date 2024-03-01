import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  // Chakra UI components
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
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormHelperText,
  Select,
  useToast,
} from "@chakra-ui/react";
import { FaUserMd, FaPencilAlt, FaTrash } from "react-icons/fa";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const mockPatients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const mockMedications = [
  { id: 1, name: "Medication A", dosage: "10mg", frequency: "Twice daily" },
  { id: 2, name: "Medication B", dosage: "20mg", frequency: "Once daily" },
];
const validationSchema = z.object({
  patient: z.string().min(1, { message: "Please choose a option" }),
  frequency: z.string().min(1, { message: "Please enter the frequency" }),
  medication: z.string().min(1, { message: "Please choose a option" }),

  dosage: z.string().min(1, { message: "Please enter dosage" }),
  instructions: z.string(),
});
const defaultFormValues = {
  patient: "",
  medication: "",
  dosage: "",
  frequency: "",
  instructions: "",
};
type ValidationSchema = z.infer<typeof validationSchema>;

const dummyPrescriptions = [
  {
    id: 1,
    patientId: 1, // Replace with patient ID
    patientName: "John Doe", // Replace with patient name
    medicationId: 1, // Replace with medication ID
    medicationName: "Medication A", // Replace with medication name
    dosage: "10mg",
    frequency: "Twice daily",
    instructions: "Take one tablet by mouth twice a day, with or without food.",
    createdAt: new Date("2024-03-01T00:00:00.000Z"), // Replace with actual creation date
  },
  {
    id: 2,
    patientId: 2, // Replace with patient ID
    patientName: "Jane Smith", // Replace with patient name
    medicationId: 2, // Replace with medication ID
    medicationName: "Medication B", // Replace with medication name
    dosage: "20mg",
    frequency: "Once daily",
    instructions: "Take one tablet by mouth once a day, in the morning.",
    createdAt: new Date("2024-02-20T00:00:00.000Z"), // Replace with actual creation date
  },
  // ... Add more dummy prescriptions
];

const EPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(dummyPrescriptions);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
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

  const handleAddPrescription = () => {
    setSelectedPrescription(null);
    onOpen();
  };

  const handleEditPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    onOpen();
  };

  const handleDeletePrescription = (id) => {
    toast({
      title: "Prescription deleted successfully",
      description: "We've deleted the prescription details for you.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  const handleFormSubmit = (data) => {
    toast({
      title: "Prescription added successfully",
      description: "We've added the Prescription details for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSelectedPrescription(null);
    onClose();
  };
  const handleCloseModal = () => {
    reset();
    onClose();
  };
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <HStack justifyContent={"space-between"}>
          <Heading as="h1" mb={4}>
            E-Prescriptions
          </Heading>
          <Button colorScheme="teal" onClick={handleAddPrescription}>
            Add Prescription
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Patient</Th>
                <Th>Medication</Th>
                <Th>Dosage</Th>
                <Th>Frequency</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {prescriptions.map((prescription) => (
                <Tr key={prescription.id}>
                  <Td>
                    <HStack>
                      <FaUserMd />
                      <Text>
                        {mockPatients.find(
                          (p) => p.id === prescription.patientId
                        )?.name || "N/A"}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Text>
                      {mockMedications.find(
                        (m) => m.id === prescription.medicationId
                      )?.name || "N/A"}
                    </Text>
                  </Td>
                  <Td>{prescription.dosage}</Td>
                  <Td>{prescription.frequency}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="teal"
                        onClick={() => handleEditPrescription(prescription)}
                      >
                        <FaPencilAlt />
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="red"
                        onClick={() =>
                          handleDeletePrescription(prescription.id)
                        }
                      >
                        <FaTrash />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {!selectedPrescription ? "Add Facility" : "Edit Facility"}
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <form>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <Select
                      placeholder="Select Patient"
                      {...register("patient")}
                    >
                      {mockPatients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name}
                        </option>
                      ))}
                    </Select>

                    <FormHelperText color={"red"}>
                      {errors?.patient?.message}
                    </FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <Select
                      {...register("medication")}
                      placeholder="Select Medication"
                    >
                      {mockMedications.map((med) => (
                        <option key={med.id} value={med.id}>
                          {med.name}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText color={"red"}>
                      {errors?.medication?.message}
                    </FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <Input {...register("dosage")} placeholder="Dosage" />
                    <FormHelperText color={"red"}>
                      {errors?.dosage?.message}
                    </FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <Input {...register("frequency")} placeholder="Frequency" />
                    <FormHelperText color={"red"}>
                      {errors?.frequency?.message}
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <Input
                      {...register("instructions")}
                      placeholder="Instructions"
                    />
                    <FormHelperText color={"red"}>
                      {errors?.instructions?.message}
                    </FormHelperText>
                  </FormControl>
                  {/* Form Validation (e.g., using useForm or react-hook-form) */}
                  {/* ... implementation to be added */}
                  <Button
                    type="button"
                    colorScheme="teal"
                    isDisabled={isSubmitting}
                    onClick={handleSubmit(handleFormSubmit)}
                  >
                    {selectedPrescription
                      ? "Update Prescription"
                      : "Create Prescription"}
                  </Button>
                </Stack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};
export default EPrescriptions;

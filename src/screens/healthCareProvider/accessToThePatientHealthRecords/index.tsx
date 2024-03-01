import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  Input,
  Button,
  Stack,
  Select,
  FormHelperText,
  HStack,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    dob: "1970-01-01",
    gender: "Male",
    address: "123 Main St, Anytown, CA 12345",
    phone: "(555) 555-5555",
    medications: [
      { id: 1, name: "Medication A", dosage: "10mg", frequency: "Twice daily" },
      { id: 2, name: "Medication B", dosage: "20mg", frequency: "Once daily" },
    ],
    conditions: ["Diabetes", "Hypertension"],
    allergies: ["Penicillin"],
  },
  {
    id: 2,
    name: "Jane Smith",
    dob: "1980-02-02",
    gender: "Female",
    address: "456 Elm St, Anytown, CA 98765",
    phone: "(555) 555-1234",
    medications: [
      { id: 3, name: "Medication C", dosage: "5mg", frequency: "As needed" },
    ],
    conditions: ["Asthma"],
    allergies: ["Peanuts", "Bees"],
  },
  // ... add more patient data with additional details
];
const validationSchema = z.object({
  name: z.string().min(1, { message: "Please enter the name" }),
  dob: z.date(),
  gender: z.string().min(1, { message: "Please choose a option" }),
  address: z.string().min(1, { message: "Please enter address" }),
  mobile: z.string().min(1, { message: "Please enter mobile" }),
  medication: z.string().min(1, { message: "Please choose a option" }),
  conditions: z.string().min(1, { message: "Please enter conditions" }),
  allergies: z.string().min(1, { message: "Please enter allergies" }),
});
const defaultFormValues = {
  name: "",
  dob: undefined,
  gender: "",
  address: "",
  mobile: "",
  medication: "",
  conditions: "",
  allergies: "",
};
type ValidationSchema = z.infer<typeof validationSchema>;

const mockMedications = [
  { id: uuidv4(), value: "medication_a", name: "Medication A" },
  { id: uuidv4(), value: "medication_b", name: "Medication B" },
];
interface Props {
  patient: {
    id: number;
    name: string;
    dob: string;
    gender: string;
    address: string;
    phone: string;
    medications: {
      id: number;
      name: string;
      dosage: string;
      frequency: string;
    }[];
    conditions: string[];
    allergies: string[];
  };
  handleEditPatientRecord: (id: string | number) => void;
  handleDeleteRecord: (id: string | number) => void;
}
const PatientRecord = ({
  patient,
  handleEditPatientRecord,
  handleDeleteRecord,
}: Props) => {
  return (
    <Box p={4} mb={4} borderWidth={1} borderRadius={4}>
      <HStack justifyContent={"space-between"} alignItems="center">
        <Heading as="h3" mb={2}>
          {patient.name}
        </Heading>
        <Stack direction="row" spacing={4}>
          <Button
            onClick={() => {
              handleEditPatientRecord && handleEditPatientRecord(patient.id);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDeleteRecord && handleDeleteRecord(patient.id);
            }}
            colorScheme={"red"}
          >
            Delete
          </Button>
        </Stack>
      </HStack>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Demographics
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={2}>
            <Text>Date of Birth: {patient.dob}</Text>
            <Text>Gender: {patient.gender}</Text>
            <Text>Address: {patient.address}</Text>
            <Text>Phone: {patient.phone}</Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Medical Information
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={2}>
            <Box mb={2}>
              {patient?.conditions?.length > 0 && (
                <>
                  <Heading as="h4" size="sm" mb={1}>
                    Conditions
                  </Heading>
                  <Text>{patient.conditions.join(", ")}</Text>
                </>
              )}
              {patient?.allergies?.length > 0 && (
                <>
                  <Heading as="h4" size="sm" mb={1}>
                    Allergies
                  </Heading>
                  <Text>{patient.allergies.join(", ")}</Text>
                </>
              )}
            </Box>

            <>
              {patient?.medications?.length > 0 && (
                <>
                  <Heading as="h4" size="sm" mb={1}>
                    Medications
                  </Heading>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Medication</Th>
                        <Th>Dosage</Th>
                        <Th>Frequency</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {patient.medications.map((med) => (
                        <Tr key={med.id}>
                          <Td>{med.name}</Td>
                          <Td>{med.dosage}</Td>
                          <Td>{med.frequency}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </>
              )}
            </>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

const PatientRecords = () => {
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const [patientRecords, setPatientRecords] = useState(mockPatients);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });

  const handleCloseModal = () => {
    reset();
    onClose();
  };
  const handleAddPatientRecord = () => {
    setSelectedRecord(null);
    onOpen();
  };
  const handleEditPatientRecord = (id) => {
    setSelectedRecord(patientRecords.find((el) => el.id === id));
    onOpen();
  };
  const handleDeleteRecord = (id) => {
    setPatientRecords(patientRecords.filter((el) => el.id !== id));
    toast({
      title: "Record deleted successfully",
      description: "We've deleted the record details for you.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const onSubmit = (values: ValidationSchema) => {
    console.log(values);
    handleCloseModal();
    if (selectedRecord) {
      toast({
        title: "Record updated successfully",
        description: "We've updated the record details for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Record added successfully",
        description: "We've added the record details for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <HStack justifyContent={"space-between"} alignItems="center">
          <Heading as="h1" mb={4}>
            Patient Health Records
          </Heading>
          <Button onClick={handleAddPatientRecord} colorScheme={"teal"}>
            Add a new Record
          </Button>
        </HStack>
        {patientRecords.map((patient) => (
          <PatientRecord
            key={patient.id}
            patient={patient}
            handleEditPatientRecord={handleEditPatientRecord}
            handleDeleteRecord={handleDeleteRecord}
          />
        ))}
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedRecord ? "Edit Patient" : "Add New Patient"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={4}>
              <FormControl>
                <Input
                  {...register("name")}
                  id="name"
                  name="name"
                  placeholder="Enter patient name"
                />
                <FormHelperText color={"red"}>
                  {errors?.name?.message}
                </FormHelperText>
              </FormControl>
              <Controller
                control={control}
                name="dob"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, error },
                }) => (
                  <FormControl py={4} isInvalid={invalid} id="symptoms">
                    <FormLabel>Date of birth</FormLabel>
                    <Box mb={4} borderWidth={1} borderRadius={5}>
                      <DatePicker
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        showIcon
                        selected={value}
                        placeholder={"djksj"}
                      />
                    </Box>
                    <FormHelperText color="red">
                      {error && error.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <FormControl mt={4}>
                <Select
                  {...register("gender")}
                  id="gender"
                  name="gender"
                  placeholder="Select gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
                <FormHelperText color={"red"}>
                  {errors?.gender?.message}
                </FormHelperText>
              </FormControl>
              <FormControl mt={4}>
                <Textarea
                  {...register("address")}
                  id="address"
                  name="address"
                  placeholder="Enter address"
                />
                <FormHelperText color={"red"}>
                  {errors?.address?.message}
                </FormHelperText>
              </FormControl>
              <FormControl mt={4}>
                <Input
                  type={"number"}
                  placeholder="9999999999"
                  {...register("mobile")}
                />
                <FormHelperText color={"red"}>
                  {errors?.mobile?.message}
                </FormHelperText>
              </FormControl>
              <Stack mt={4} spacing={4}>
                <FormControl>
                  <Select
                    {...register("medication")}
                    id="medication"
                    name="medication"
                    placeholder="Add medications"
                  >
                    {mockMedications.map((el) => (
                      <option key={el.id} value={el.value}>
                        {el.name}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText color={"red"}>
                    {errors?.medication?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Input
                    {...register("conditions")}
                    id="conditions"
                    name="conditions"
                    placeholder="Enter conditions (comma separated)"
                  />
                  <FormHelperText color={"red"}>
                    {errors?.conditions?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Input
                    {...register("allergies")}
                    id="allergies"
                    name="allergies"
                    placeholder="Enter allergies (comma separated)"
                  />
                  <FormHelperText color={"red"}>
                    {errors?.allergies?.message}
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Button
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
                onClick={handleSubmit(onSubmit)}
                colorScheme="teal"
                mt={4}
              >
                {selectedRecord ? "Edit Patient" : "Add Patient"}
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};

export default PatientRecords;

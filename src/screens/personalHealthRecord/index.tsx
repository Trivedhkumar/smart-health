import React, { useState } from "react";
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
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { NavBar } from "../../components";
import ScheduledAppointments from "../appointment/scheduledAppointments";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";
import MedicalHistory from "../medicalHistory";
import PrescriptionManagementScreen from "../prescriptionManagement";
import { PERSONAL_HEALTH_RECORDS } from "./constants";
import {
  FaArrowRight,
  FaEdit,
  FaEye,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DOCTORS } from "../home/constants";
import { useNavigate } from "react-router-dom";
const validationSchema = z.object({
  doctor: z.string().min(1, { message: "Please select a doctor" }),
  timestamp: z.date(),
  name: z.string().min(1, { message: "Please enter a name" }),
});
type ValidationSchema = z.infer<typeof validationSchema>;
const defaultFormValues = {
  doctor: "",
  timestamp: new Date(),
  name: "",
};
const PersonalHealthRecordScreen = () => {
  const [records, setRecords] = useState(PERSONAL_HEALTH_RECORDS);

  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
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
      title: "PHR Created",
      description: "We've created a personal health record for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const openAppointmentModal = () => {
    onOpen();
  };
  const handleDeletePHR = (id: number | string) => {
    setRecords(records.filter((record) => record.id !== id));
  };
  const handleViewPHR = (id: number | string) => {
    navigate(`/personalhealthrecords/${id}`);
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <HStack justifyContent={"space-between"} alignItems="center">
          <Heading as="h3" size="md">
            Personal Health Records
          </Heading>
          <Button
            colorScheme="teal"
            mt={4}
            onClick={openAppointmentModal}
            isLoading={isSubmitting}
            rightIcon={<FaArrowRight />}
          >
            Create a new PHR
          </Button>
        </HStack>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Doctor</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((record) => (
                <Tr>
                  <Td>{record.name}</Td>
                  <Td>{record.doctor}</Td>
                  <Td>{record.date}</Td>
                  <Td>
                    <HStack>
                      <Box mr={2}>
                        <FaEye
                          cursor={"pointer"}
                          onClick={() => handleViewPHR(record.id)}
                        />
                      </Box>
                      <Box mr={2}>
                        <FaTrash
                          cursor={"pointer"}
                          onClick={() => handleDeletePHR(record.id)}
                          color="red"
                        />
                      </Box>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* <Tabs>
          <TabList>
            <Tab>Medical History</Tab>
            <Tab>Prescriptions</Tab>
            <Tab>Health Data Tracking</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MedicalHistory />
            </TabPanel>
            <TabPanel>
              <PrescriptionManagementScreen navbar={false} />
            </TabPanel>
            <TabPanel>
              <ScheduledAppointments />
            </TabPanel>
          </TabPanels>
        </Tabs> */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a PHR</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form>
                <FormControl py={4} isInvalid={!!errors.name}>
                  <Input
                    {...register("name")}
                    placeholder="name of record"
                    name="name"
                  />
                  <FormErrorMessage colorScheme="red">
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl py={4} isInvalid={!!errors.doctor}>
                  <Select
                    {...register("doctor")}
                    name="doctor"
                    placeholder="Select Doctor"
                    mb={4}
                  >
                    {DOCTORS.map((doctor) => (
                      <option value={doctor.name}>{doctor.name}</option>
                    ))}
                  </Select>
                  <FormErrorMessage colorScheme="red">
                    {errors.doctor && errors.doctor.message}
                  </FormErrorMessage>
                </FormControl>

                <Controller
                  control={control}
                  name="timestamp"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, error },
                  }) => (
                    <FormControl py={4} isInvalid={invalid} id="symptoms">
                      <FormLabel>Issused on</FormLabel>
                      <Box borderWidth={1} borderRadius={5}>
                        <DatePicker
                          name={name}
                          ref={ref}
                          onChange={onChange}
                          onBlur={onBlur}
                          showIcon
                          selected={value}
                        />
                      </Box>
                      <FormErrorMessage colorScheme="red">
                        {error && error.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                />
              </form>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                colorScheme="teal"
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
              >
                Create PHR
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};

export default PersonalHealthRecordScreen;

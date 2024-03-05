import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormHelperText,
  HStack,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PHRData } from "./constants";
import { upperFirst } from "lodash";
import PrescriptionTable from "../../../../components/prescriptionTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ERROR_MESSAGES } from "../../../../constants";
const defaultFormValues = {
  phritems: "",
};
const validationSchema = z.object({
  phritems: z
    .string({ required_error: ERROR_MESSAGES.requiredField })
    .min(1, { message: ERROR_MESSAGES.requiredField }),
});
const PersonalHealthRecordsDetailsScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const phrItem = PHRData[0];
  const handleRefillPress = () => {
    toast({
      title: "Refill request sent",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const PHRMedicalHistoryKeys = Object.keys(phrItem.medicalHistory);
  const PHRHealthMetricKeys = Object.keys(phrItem.healthMetrics);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const handleDeleteMedicalHistory = () => {
    toast({
      title: "Deleted successfully",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleEditMedicalHistory = (item, itemName) => {
    console.log("Item", item, itemName);
    setSelectedItem({
      name: itemName,
      item: item,
    });
    onOpen();
  };
  const handleCloseModal = () => {
    reset();
    setSelectedItem(null);
    onClose();
  };
  const handleUpdate = () => {
    handleCloseModal();
    toast({
      title: "Updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Box>
      <Stack spacing={4}>
        <Tabs>
          <TabList>
            <Tab>Medical History</Tab>
            <Tab>Prescriptions</Tab>
            <Tab>Health Metrics</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {PHRMedicalHistoryKeys.length ? (
                <Accordion allowToggle>
                  {PHRMedicalHistoryKeys.map((item) => (
                    <AccordionItem key={item}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <strong>{upperFirst(item)}</strong>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <HStack justifyContent={"space-between"}>
                          <UnorderedList>
                            {phrItem.medicalHistory[item].map((desc) => {
                              return <ListItem key={desc}>{desc}</ListItem>;
                            })}
                          </UnorderedList>
                          <VStack>
                            <Button
                              onClick={() =>
                                handleEditMedicalHistory(
                                  phrItem.medicalHistory[item],
                                  item
                                )
                              }
                              colorScheme={"blue"}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={handleDeleteMedicalHistory}
                              colorScheme={"red"}
                            >
                              Delete
                            </Button>
                          </VStack>
                        </HStack>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <Text>No Records Found</Text>
              )}
            </TabPanel>
            <TabPanel>
              {PHRMedicalHistoryKeys.length ? (
                <PrescriptionTable handleRefillPress={handleRefillPress} />
              ) : (
                <Text>No Records Found</Text>
              )}
            </TabPanel>
            <TabPanel>
              {PHRHealthMetricKeys.length ? (
                <Accordion allowToggle>
                  {PHRHealthMetricKeys.map((item) => (
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <strong>{upperFirst(item)}</strong>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <HStack justifyContent={"space-between"}>
                          <UnorderedList>
                            {phrItem.healthMetrics[item].map((desc) => {
                              return <ListItem>{desc}</ListItem>;
                            })}
                          </UnorderedList>
                          <VStack>
                            <Button
                              onClick={() =>
                                handleEditMedicalHistory(
                                  phrItem.healthMetrics[item],
                                  item
                                )
                              }
                              colorScheme={"blue"}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={handleDeleteMedicalHistory}
                              colorScheme={"red"}
                            >
                              Delete
                            </Button>
                          </VStack>
                        </HStack>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <Text>No Records Found</Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
      {selectedItem && (
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={handleCloseModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{upperFirst(selectedItem?.name)}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <Input
                  type={"text"}
                  {...register("phritems")}
                  placeholder="enter comma based values"
                />
                <FormHelperText color={"red"}>
                  {errors.phritems && errors.phritems.message}
                </FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={handleSubmit(handleUpdate)}
                colorScheme="teal"
                mr={3}
              >
                Update
              </Button>
              <Button onClick={handleCloseModal} colorScheme={"red"}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
export default PersonalHealthRecordsDetailsScreen;

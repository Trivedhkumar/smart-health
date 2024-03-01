import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../../../components";
import { getMenuItemsByRole } from "../../../../utils/functions";
import { PHRData } from "./constants";
import { isString, upperFirst } from "lodash";
import PrescriptionTable from "../../../../components/prescriptionTable";

const PersonalHealthRecordsDetailsScreen = () => {
  let { id } = useParams();
  const toast = useToast();
  const phrItem = PHRData.find((phrItem) => phrItem.id.toString() === id);
  const handleRefillPress = () => {
    toast({
      title: "Refill request sent",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

  const PHRMedicalHistoryKeys = Object.keys(phrItem.medicalHistory);
  const PHRHealthMetricKeys = Object.keys(phrItem.healthMetrics);
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
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
                          <UnorderedList>
                            {phrItem.medicalHistory[item].map((desc) => {
                              if (!isString(desc)) {
                                return (
                                  <ListItem key={desc?.name}>
                                    {desc?.name}
                                  </ListItem>
                                );
                              }
                              return <ListItem key={desc}>{desc}</ListItem>;
                            })}
                          </UnorderedList>
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
                          <UnorderedList>
                            {phrItem.healthMetrics[item].map((desc) => {
                              if (!isString(desc)) {
                                return <ListItem>{desc?.name}</ListItem>;
                              }
                              return <ListItem>{desc}</ListItem>;
                            })}
                          </UnorderedList>
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
      </Stack>
    </Box>
  );
};
export default PersonalHealthRecordsDetailsScreen;

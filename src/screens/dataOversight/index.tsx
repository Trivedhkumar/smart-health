import {
  Box,
  Heading,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import {
  BarChart,
  Bar,
  XAxis,
  Legend,
  YAxis,
  Rectangle,
  Tooltip,
} from "recharts";
import {
  dataIntegrityIssues,
  securityIncidents,
  systemMalfunctions,
  userComplaints,
  userPrivacyViolations,
} from "./constans";
const DataOverSightScreen = () => {
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as={"h3"} size={"md"}>
          Data Oversight
        </Heading>
        <Tabs>
          <TabList>
            <Tab>Data Integrity Issuse</Tab>
            <Tab>Security Incidents</Tab>
            <Tab>User Privacy Violations</Tab>
            <Tab>System Mal Functions</Tab>
            <Tab>User Complaints</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <BarChart
                  width={500}
                  height={300}
                  data={dataIntegrityIssues}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </HStack>
            </TabPanel>
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <BarChart
                  width={500}
                  height={300}
                  data={securityIncidents}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </HStack>
            </TabPanel>
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <BarChart
                  width={500}
                  height={300}
                  data={userPrivacyViolations}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </HStack>
            </TabPanel>
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <BarChart
                  width={500}
                  height={300}
                  data={systemMalfunctions}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="duration" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </HStack>
            </TabPanel>
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <BarChart
                  width={500}
                  height={300}
                  data={userComplaints}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </HStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
};
export default DataOverSightScreen;

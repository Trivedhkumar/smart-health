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
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { Tooltip, PieChart, Pie } from "recharts";
import { data01, data02, data03, data04, data05 } from "./constants";
const AnalyticsDashboard = () => {
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
            <Tab>Patient Age Distribution</Tab>
            <Tab>Patient Gender Distribution</Tab>
            <Tab>Top 5 Reported Conditions</Tab>
            <Tab>Average Blood Pressure Trends (by Month)</Tab>
            <Tab>Average Blood Sugar Trends (by Week)</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />

                  <Tooltip />
                </PieChart>
              </HStack>
            </TabPanel>
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data02}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />

                  <Tooltip />
                </PieChart>
              </HStack>
            </TabPanel>{" "}
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data03}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />

                  <Tooltip />
                </PieChart>
              </HStack>
            </TabPanel>{" "}
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data04}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />

                  <Tooltip />
                </PieChart>
              </HStack>
            </TabPanel>{" "}
            <TabPanel>
              <HStack alignItems={"center"} mt={50} justifyContent="center">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data05}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />

                  <Tooltip />
                </PieChart>
              </HStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
};
export default AnalyticsDashboard;

import React from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  StatHelpText,
  Button,
} from "@chakra-ui/react";

const metrics = [
  {
    title: "Website Traffic",
    description: "Number of unique visitors to the website.",
    value: 12345,
    trend: "positive",
    trendValue: 5,
  },
  {
    title: "User Engagement",
    description: "Average time spent on the website per user.",
    value: "3 minutes 20 seconds",
    trend: "negative",
    trendValue: 2,
  },
  {
    title: "Conversion Rate",
    description:
      "Percentage of visitors who take a desired action (e.g., sign up, purchase).",
    value: 3.5,
    trend: "positive",
    trendValue: 1.2,
  },
  {
    title: "User Activity",
    description: "Number of interactions or events performed by users.",
    value: 15000,
    trend: "positive",
    trendValue: 10,
  },
  {
    title: "System Performance",
    description: "Response time or uptime percentage of the system.",
    value: "99.9%",
    trend: "positive",
    trendValue: 0.2,
  },
  {
    title: "Health Trends",
    description: "Key health indicators or trends.",
    value: "Stable",
    trend: "neutral",
    trendValue: 0,
  },
];

const trendIcons = {
  positive: <Icon name="arrow-up" color="green.500" />,
  negative: <Icon name="arrow-down" color="red.500" />,
  neutral: <Icon name="minus" color="gray.500" />,
};

const MetricsReport = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box bg={bgColor} color={textColor} p={4}>
      <Heading as="h1" mb={4}>
        Metrics Report
      </Heading>
      <Text mb={8}>Date: 2024-02-24</Text>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
        {metrics.map((metric) => (
          <GridItem key={metric.title}>
            <Box
              bg={
                metric.trend === "positive"
                  ? "green.300"
                  : metric.trend === "negative"
                  ? "red.300"
                  : "gray.300"
              }
              p={4}
              borderRadius="md"
            >
              <Stat>
                <StatLabel fontSize="md">{metric.title}</StatLabel>
                <StatNumber fontSize="lg">{metric.value}</StatNumber>
                <StatHelpText>{metric.description}</StatHelpText>
              </Stat>
              <Box display="flex" alignItems="center" mt={2}>
                {trendIcons[metric.trend]}
                <Text ml={2} fontSize="sm">
                  {metric.trendValue}% {metric.trend} since last week
                </Text>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Heading as="h2" mt={8} mb={4}>
        Additional Data
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Metric</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>User Demographics</Td>
            <Td>Age Range (Most Active)</Td>
            <Td>25-34</Td>
          </Tr>
          <Tr>
            <Td>Marketing</Td>
            <Td>Top Conversion Channel</Td>
            <Td>Email</Td>
          </Tr>
          {/* Add more rows */}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MetricsReport;

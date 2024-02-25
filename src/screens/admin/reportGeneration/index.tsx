import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { usePDF } from "react-to-pdf";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { html } from "./constants";
import MetricsReport from "./metricsReport";

const ReportGeneration = () => {
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const { toPDF, targetRef } = usePDF({ filename: "report.pdf" });
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as={"h3"} size={"md"}>
          Report Generation
        </Heading>
        <div ref={targetRef}>
          <MetricsReport />
        </div>
        <HStack justifyContent="flex-end" alignItems={"center"}>
          <Button onClick={() => toPDF()} colorScheme={"teal"}>
            Download Report
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};
export default ReportGeneration;

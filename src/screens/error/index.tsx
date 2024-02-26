import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  return (
    <Box textAlign="center" padding="10">
      <Text fontSize="2xl">Something went wrong!</Text>
      <Text>Please try again later.</Text>
      <Button my={2} colorScheme={"teal"} onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
}

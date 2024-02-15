import {
  Accordion,
  AccordionItem,
  Box,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { QUESTIONS } from "../communityinteraction/constants";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";
import Answers from "./answers";

const CommunityInteractionDetailsScreen = () => {
  let { questionId } = useParams();
  const question = QUESTIONS.find(
    (question) => question.id.toString() === questionId
  );
  const userMenu = getMenuItemsByRole(ROLES.PATIENT);

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={"70%"}
        margin={"auto"}
        spacing={4}
      >
        <Stack spacing={4}>
          <Heading as="h2" size="md">
            {"Question"}
          </Heading>
          <Heading color={"teal"} as="h2" size="md">
            {question.title}
          </Heading>
          <Text>{question.body}</Text>
          <Box>
            <Answers questionId={question.id} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
export default CommunityInteractionDetailsScreen;

import {
  Box,
  Stack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  Input,
  Select,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { QUESTIONS } from "./constants";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";
import { useNavigate } from "react-router-dom";
import AskQuestion from "./questions";
interface Props {
  questions: {
    id: number;
    title: string;
    body: string;
    author: string;
    timestamp: Date;
  }[];
}
const QuestionList = ({ questions }: Props) => {
  const navigate = useNavigate();
  const handleQuestionClick = (id: number) => {
    navigate(`/communityinteraction/${id}`);
  };
  return (
    <Stack spacing={4}>
      {questions.map((question) => (
        <Box borderWidth={1} p={2} borderRadius={5} key={question.body}>
          <Heading my={2} as="h3" size="sm">
            {question.title}
          </Heading>
          <Text my={2}>{question.author}</Text>
          <Button
            colorScheme={"teal"}
            onClick={() => handleQuestionClick(question.id)}
          >
            View Details
          </Button>
        </Box>
      ))}
    </Stack>
  );
};

const CommunityInteractionScreen = () => {
  const [questions, setQuestions] = useState(QUESTIONS);

  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

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
        <Heading as={"h3"} size={"md"}>
          Community Interaction
        </Heading>
        <AskQuestion />
        <Divider />
        <Heading as={"h3"} size={"md"}>
          Browse Questions
        </Heading>
        <QuestionList questions={questions} />
      </Stack>
    </Box>
  );
};
export default CommunityInteractionScreen;

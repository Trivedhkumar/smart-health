import {
  Box,
  Accordion,
  AccordionItem,
  Heading,
  Text,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { ANSWERS } from "./constants";

const Answers = ({ questionId }) => {
  const [answers, setAnswers] = useState(ANSWERS);
  const [newAnswer, setNewAnswer] = useState("");
  const fetchAnswers = (id) => answers;
  useEffect(() => {
    const loadAnswers = async () => {
      const fetchedAnswers = await fetchAnswers(questionId); // Replace with your fetching logic
      setAnswers(fetchedAnswers);
    };

    loadAnswers();
  }, [questionId, fetchAnswers]); // Update whenever questionId or fetchAnswers change

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    if (!newAnswer.trim()) {
      return; // Prevent submitting empty answers
    }

    // Submit the new answer to your backend (replace with your implementation)
    const submittedAnswer = await submitAnswer(questionId, newAnswer);

    setAnswers([...answers, submittedAnswer]); // Add submitted answer to state
    setNewAnswer(""); // Clear input field after submission
  };
  const submitAnswer = (id: number, answer: string) => {
    return {
      id: id,
      questionId: id,
      author: "Jane Doe",
      body: answer,
      timestamp: new Date("2024-02-16T00:00:00Z"),
    };
  };
  return (
    <Box mt={4}>
      <Heading my={4} as="h3" size="sm">
        Answers
      </Heading>
      {answers.map((answer) => (
        <Stack my={2} p={4} borderWidth={1} borderRadius={5} spacing={4}>
          <Heading as="h4" size="sm" fontWeight="semibold">
            {answer.author}
          </Heading>
          <Text>{answer.body}</Text>
          <Text fontSize="xs" color="gray.500">
            Answered on {new Date(answer.timestamp).toLocaleDateString()}
          </Text>
        </Stack>
      ))}

      <Box as="form" onSubmit={handleAnswerSubmit}>
        <Input
          type="text"
          placeholder="Write your answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          mb={4}
          isRequired
        />
        <Button type="submit" colorScheme="teal">
          Submit Answer
        </Button>
      </Box>
    </Box>
  );
};

export default Answers;

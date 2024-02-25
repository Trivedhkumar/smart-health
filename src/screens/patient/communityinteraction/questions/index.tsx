import {
  Box,
  Input,
  Select,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]); // Array of selected tags
  const toast = useToast();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);
  const handleTagChange = (selectedOptions) =>
    setTags(selectedOptions.map((option) => option.value));
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Implement logic to submit the question data to your backend or database
    // Here, you would send the data (title, body, tags) to your API or storage mechanism.

    // Reset form after submission (optional)
    setTitle("");
    setBody("");
    setTags([]);
    toast({
      title: "Question submitted",
      description: "We've created your question for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter your question title"
        value={title}
        onChange={handleTitleChange}
        mb={4}
        isRequired
      />
      <Textarea
        placeholder="Describe your question in detail"
        value={body}
        onChange={handleBodyChange}
        mb={4}
        isRequired
      />

      <Button type="submit" colorScheme="teal">
        Ask Your Question
      </Button>
    </Box>
  );
};

export default AskQuestion;

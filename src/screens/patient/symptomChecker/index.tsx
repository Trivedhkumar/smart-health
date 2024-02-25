import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatableSelect } from "chakra-react-select";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { NavBar } from "../../../components";
import { CustomModal } from "../../../components/modal";
import { getMenuItemsByRole } from "../../../utils/functions";
const symptomOptions = [
  {
    label: "Fever",
    value: 1,
  },
  {
    label: "Cold",
    value: 2,
  },
  {
    label: "Head ache",
    value: 3,
  },
  {
    label: "Sinus",
    value: 4,
  },
  {
    label: "Cough",
    value: 5,
  },
];
const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

const symptomSchema = z.object({
  label: z.string(),
  value: z.string().or(z.number()),
});
const validationSchema = z.object({
  symptoms: z.array(symptomSchema).superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select at least one ",
      });
    }
  }),
});
type ValidationSchema = z.infer<typeof validationSchema>;

const defaultFormValues = { symptoms: [] };

const SymptomChecker = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (values: ValidationSchema) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowModal(true);
  };
  const closeModal = () => {
    reset(defaultFormValues);
    setShowModal(false);
  };
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
          Check Your Symptoms: Get Informed, Not Worried
        </Heading>
        <Text>
          Feeling under the weather and unsure what's wrong? Our symptom checker
          can offer guidance and point you in the right direction. This tool is
          not a substitute for professional medical advice, but it can help you:
        </Text>
        <UnorderedList>
          <ListItem>
            Identify potential causes of your symptoms based on common medical
            conditions.
          </ListItem>
          <ListItem>
            Learn more about each condition with brief descriptions and
            treatment options.
          </ListItem>
          <ListItem>
            Get recommendations for next steps, such as self-care at home or
            seeing a doctor.
          </ListItem>
        </UnorderedList>
      </Stack>
      <Container as="form" mb={12} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="symptoms"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, error },
          }) => (
            <FormControl py={4} isInvalid={invalid} id="symptoms">
              <FormLabel>Select symptoms</FormLabel>

              <CreatableSelect
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={symptomOptions}
                placeholder="Select symptom"
                closeMenuOnSelect={false}
              />

              <FormErrorMessage colorScheme="red">
                {error && error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <HStack spacing={4}>
          <Button
            isLoading={isSubmitting}
            type="button"
            colorScheme="red"
            onClick={() => reset(defaultFormValues)}
          >
            Reset
          </Button>

          <Button isLoading={isSubmitting} type="submit" colorScheme="teal">
            Submit
          </Button>
        </HStack>
      </Container>
      {showModal && (
        <CustomModal closeModal={closeModal} showModal={showModal} />
      )}
    </Box>
  );
};
export default SymptomChecker;

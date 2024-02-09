import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { ImageSlider, NavBar } from "../../components";
import { ERROR_MESSAGES, SERVICE_NAMES, SLIDEDATA } from "../../constants";
import { FaCheckCircle, FaMailBulk, FaUserAlt } from "react-icons/fa";
import { upperCase } from "lodash";
import { getServices } from "../../utils/functions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const doctors = [
  {
    name: "Robert",
    image:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yJTIwc21pbGluZ3xlbnwwfDB8MHx8fDA%3D",
    description:
      " Board-certified physician specializing in Surgery, with six years of experience and a reputation for personalized care",
  },
  {
    name: "Thomas",
    image:
      "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdG9yJTIwc21pbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    description:
      " Licensed Therapist, passionate about helping patients achieve their health goals.",
  },
  {
    name: "Rita",
    image:
      "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvY3RvciUyMHNtaWxpbmd8ZW58MHwwfDB8fHww",
    description:
      "Registered nurse with [Years] of experience, known for her patient advocacy and communication skills.",
  },
];

const defaultFormValues = {
  email: "",
  message: "",
  name: "",
};
export default function Home() {
  const validationSchema = z.object({
    email: z
      .string({ required_error: ERROR_MESSAGES.requiredField })
      .email({ message: ERROR_MESSAGES.validEmail }),
    message: z
      .string({ required_error: ERROR_MESSAGES.requiredField })
      .trim()
      .min(1, { message: ERROR_MESSAGES.requiredField }),
    name: z
      .string({ required_error: ERROR_MESSAGES.requiredField })
      .min(3, { message: ERROR_MESSAGES.minLength })
      .max(30, { message: ERROR_MESSAGES.maxLength }),
  });
  const CaFaCheckCircle = chakra(FaCheckCircle);
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaMail = chakra(FaMailBulk);
  const [tabIndex, setTabIndex] = useState(0);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
  };
  return (
    <Box>
      <NavBar />
      <Box px={4}>
        <ImageSlider slides={SLIDEDATA} />
        <Divider />
        <Box>
          <HStack my={4} spacing={10}>
            <Image
              borderRadius="full"
              boxSize="150px"
              alt="doctor"
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRvY3RvcnxlbnwwfDB8MHx8fDA%3D"
            />
            <VStack my={4}>
              <Text px={6}>
                Feeling lost in the healthcare maze? At Health Spehere, we
                understand. We believe in simplifying your health journey with
                personalized care that empowers you. Our dedicated team of
                experienced doctors, nurses, and specialists are committed to
                providing compassionate and comprehensive care tailored to your
                unique needs and goals
              </Text>
              <Text px={6}>
                We offer a wide range of services under one roof, from
                preventive care and routine checkups to specialized treatments
                and ongoing management of chronic conditions. We leverage
                cutting-edge technology to ensure efficient and comfortable
                experiences, minimizing wait times and maximizing convenience.
              </Text>
            </VStack>
          </HStack>
          <HStack my={4} spacing={10}>
            <VStack my={"4"}>
              <Text px={6}>
                Your well-being is our priority. We go beyond traditional
                medicine to promote holistic health through personalized
                wellness programs, educational resources, and community support.
                We empower you to take an active role in your health journey,
                providing the tools and information you need to make informed
                decisions.
              </Text>
              <Text px={6}>
                At Health Sphere, we believe in building trusting relationships
                with our patients. We listen attentively to your concerns,
                answer your questions openly, and create a safe and supportive
                environment where you feel heard and respected. Whether you're
                seeking routine care or facing a complex health challenge, we're
                here to walk alongside you, every step of the way.
              </Text>
            </VStack>
            <Image
              borderRadius="full"
              boxSize="150px"
              alt="doctors"
              src="https://images.unsplash.com/photo-1512102438733-bfa4ed29aef7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </HStack>
        </Box>
        <Divider />
        {/* ******************************************************* */}
        {/* SERVICES */}
        {/* ******************************************************* */}
        <Box id="services" my={8}>
          <HStack my={4} justifyContent={"center"}>
            <Heading color={"teal.400"} as={"h2"}>
              SERVICES
            </Heading>
          </HStack>
          <Tabs isFitted onChange={(index) => setTabIndex(index)}>
            <TabList>
              {Object.keys(SERVICE_NAMES ?? []).map((name, index) => (
                <Tab key={name.toUpperCase().toString() + index}>
                  {upperCase(name)}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {Object.keys(SERVICE_NAMES ?? []).map((name, index) => (
                <TabPanel key={name.toString() + index}>
                  <List spacing={3}>
                    {(
                      getServices(Object.keys(SERVICE_NAMES)[tabIndex]) ?? []
                    ).map((item) => (
                      <ListItem key={item}>
                        <ListIcon as={CaFaCheckCircle} color="green.500" />
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
        <Divider />
        {/* ******************************************************* */}
        {/* ABOUT US */}
        {/* ******************************************************* */}
        <Box id="aboutus" my={8}>
          <HStack my={4} justifyContent={"center"}>
            <Heading color={"teal.400"} as={"h2"}>
              ABOUT US
            </Heading>
          </HStack>
          <Box>
            <VStack my={4}>
              <Heading as={"h4"} size={"md"}>
                Empowering Your Wellbeing Through Compassionate Care
              </Heading>
              <Text>
                At Health Sphere, we believe in personalized healthcare that
                prioritizes your individual needs and empowers you to make
                informed decisions about your health journey. Founded in 2000 by
                Robert, we've assembled a dedicated team of experienced doctors,
                nurses, and specialists who share our commitment to
                compassionate and comprehensive care.
              </Text>
            </VStack>
            <HStack
              my={8}
              justifyContent={"space-evenly"}
              alignItems={"flex-start"}
              spacing={2}
            >
              {doctors.map((doctor) => (
                <Card maxW="sm">
                  <CardBody>
                    <Image
                      src={doctor.image}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                      fit={"cover"}
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{doctor.name}</Heading>
                      <Text>{doctor.description}</Text>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </HStack>
          </Box>
        </Box>
        <Divider />
        {/* ******************************************************* */}
        {/* CONTACT US */}
        {/* ******************************************************* */}
        <Box id="contactus" my={8}>
          <Box>
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Heading color="teal.400">Contact Us</Heading>
              <Box minW={{ base: "90%", md: "468px" }}>
                <Heading my={4} as={"h4"} size={"md"}>
                  Write us a message
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                  >
                    <FormControl isInvalid={errors.name}>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          children={<CFaUserAlt color="gray.300" />}
                        />
                        <Input {...register("name")} placeholder="Name" />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.email}>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CFaMail color="gray.300" />}
                        />
                        <Input
                          {...register("email")}
                          type="email"
                          placeholder="email address"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.email && errors.email.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.message}>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                        />
                        <Textarea
                          {...register("message")}
                          placeholder="Message"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.message && errors.message.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      isDisabled={isSubmitting}
                      isLoading={isSubmitting}
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      colorScheme="teal"
                      width="full"
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

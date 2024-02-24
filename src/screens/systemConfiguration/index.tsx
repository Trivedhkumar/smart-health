import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IoMdSettings } from "react-icons/io";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { ADMIN_SETTINGS } from "./constants";

const SystemConfigurationScreen = () => {
  const toast = useToast();
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const handleSwitchClick = (e) => {
    toast({
      title: "Settings updated",
      description: "We've updated the settings for you.",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as={"h3"} size={"md"}>
          Settings
        </Heading>
        <List spacing={3}>
          <SimpleGrid columns={3} spacing={10}>
            {ADMIN_SETTINGS.map((setting) => (
              <ListItem>
                <FormControl display="flex" alignItems="center">
                  <HStack width={"100%"} justifyContent={"space-between"}>
                    <HStack>
                      <ListIcon as={IoMdSettings} />
                      <FormLabel htmlFor={setting.id} mb="0">
                        {setting.setting}
                      </FormLabel>
                    </HStack>

                    <Switch onChange={handleSwitchClick} id={setting.id} />
                  </HStack>
                </FormControl>
              </ListItem>
            ))}
          </SimpleGrid>
        </List>
      </Stack>
    </Box>
  );
};
export default SystemConfigurationScreen;

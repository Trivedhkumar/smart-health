import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { startCase, upperFirst } from "lodash";
import React, { useState } from "react";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { USERS } from "./constants";

const UserManagementScreen = () => {
  const [users, setUsers] = useState(USERS);
  const toast = useToast();
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  const handleActivate = (id: number | string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, activated: true, deactivated: false } : user
      )
    );

    toast({
      title: "User Activated",
      description: "The selected user has be activated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleDeactivate = (id: number | string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, deactivated: true, activated: false } : user
      )
    );
    toast({
      title: "User Deactivated",
      description: "The selected user has be deactivated",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleDelete = (id: number | string) => {
    setUsers(users.filter((user) => user.id !== id));
    toast({
      title: "User Deleted",
      description: "The selected user has be deleted",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as={"h3"} size={"md"}>
          Registered Users
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{startCase(user.name)}</Td>
                  <Td>{user.email}</Td>
                  <Td>{startCase(user.role)}</Td>
                  <Td>
                    <HStack>
                      <Button
                        isDisabled={user.activated}
                        onClick={() => handleActivate(user.id)}
                        colorScheme={"green"}
                      >
                        Activate
                      </Button>
                      <Button
                        isDisabled={user.deactivated}
                        onClick={() => handleDeactivate(user.id)}
                        colorScheme={"yellow"}
                      >
                        Deactivate
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        colorScheme={"red"}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};
export default UserManagementScreen;

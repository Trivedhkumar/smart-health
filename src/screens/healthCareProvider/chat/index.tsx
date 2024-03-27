import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Box,
  Text,
  Input,
  Button,
  List,
  ListItem,
  Divider,
  Flex,
} from "@chakra-ui/react";

interface User {
  userID: number;
  username: string;
  firstname: string;
  lastname: string;
  userRoleID: string;
}

interface Message {
  id?: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  sent_at: string;
}

const HPChatScreen: React.FC = () => {
  const currentUserId = parseInt(localStorage.getItem("userID"));
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/users/patients-and-pharmacists"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();

    const socket = io("http://localhost:3000");
    setWs(socket);

    //Event listener for 'connect' event
    socket.on("connect", () => {
      console.log(
        "Connected to WebSocket server: ",
        currentUserId,
        "Socket ID:",
        socket.id
      );
      socket.emit("login", parseInt(localStorage.getItem("userID")));
    });

    // Event listener for 'message' event
    socket.on("message", (data: any) => {
      const newMessage: Message = JSON.parse(data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Event listener for 'disconnect' event
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Cleanup function
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    fetchMessagesForUser(user);
  };

  const fetchMessagesForUser = async (user: User) => {
    //send the currently logged in user beare-token
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/messages/conversation?other_user_id=${user.userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = (message: string) => {
    if (ws && selectedUser) {
      const newMessage: Message = {
        sender_id: currentUserId,
        receiver_id: selectedUser.userID,
        message,
        sent_at: getCurrentTimestamp(),
      };
      console.log(newMessage);
      ws.send(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    }
  };

  const getCurrentTimestamp = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // January is 0
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <Flex bg="gray.100" h="100vh" justify="center" align="center">
      <Box w="30%" bg="white" p="4" maxHeight="80vh" overflowY="auto">
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Users
        </Text>
        <List spacing={2}>
          {users.map((user) => (
            <ListItem
              key={user.userID}
              cursor="pointer"
              onClick={() => handleUserClick(user)}
              _hover={{ background: "gray.200" }}
              p="2"
              borderRadius="md"
            >
              {user.username}
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider orientation="vertical" />
      <Box w="70%" bg="white" p="4">
        <Text fontSize="xl" fontWeight="bold" mb="4">
          {selectedUser
            ? `Chat with ${selectedUser.username}`
            : "Select a user to chat"}
        </Text>
        <Box bg="gray.50" p="4" borderRadius="md" h="70vh" overflowY="auto">
          {selectedUser &&
            messages.map((message) => {
              // Check if the message is intended for the selected user
              const isMessageForSelectedUser =
                message.sender_id === selectedUser.userID ||
                message.receiver_id === selectedUser.userID;

              if (isMessageForSelectedUser) {
                return (
                  <Box
                    key={`${message.sender_id}_${
                      message.receiver_id
                    }_${new Date(message.sent_at).getTime()}`}
                    mb="2"
                    textAlign={
                      message.receiver_id === selectedUser.userID
                        ? "left"
                        : "right"
                    }
                  >
                    <Text fontWeight="bold">
                      {message.receiver_id === selectedUser.userID
                        ? "You"
                        : selectedUser.username}
                    </Text>
                    <Box
                      bg={
                        message.receiver_id === selectedUser.userID
                          ? "blue.100"
                          : "green.100"
                      }
                      p="2"
                      borderRadius="md"
                      display="inline-block"
                    >
                      <Text>{message.message}</Text>
                    </Box>
                  </Box>
                );
              } else {
                // If the message is not intended for the selected user, don't render it
                return null;
              }
            })}
        </Box>
        {selectedUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const content = e.currentTarget.message.value;
              handleSendMessage(content);
              e.currentTarget.reset();
            }}
          >
            <Input
              type="text"
              name="message"
              placeholder="Type your message..."
              mt="4"
            />
            <Button mt="2" type="submit" colorScheme="blue">
              Send
            </Button>
          </form>
        )}
      </Box>
    </Flex>
  );
};

export default HPChatScreen;

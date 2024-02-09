import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  HStack,
} from "@chakra-ui/react";

const SidebarContent = ({ onClick }) => (
  <VStack>
    <Button colorScheme="teal" onClick={onClick} w="100%">
      Home
    </Button>
    <Button colorScheme="teal" onClick={onClick} w="100%">
      About
    </Button>
    <Button colorScheme="teal" onClick={onClick} w="100%">
      Contact
    </Button>
  </VStack>
);
const MainbarContent = ({ onClick }) => (
  <HStack>
    <Button colorScheme="teal" onClick={onClick} w="100%">
      Home
    </Button>
    <Button colorScheme="teal" onClick={onClick} w="100%">
      About
    </Button>
    <Button colorScheme="teal" onClick={onClick} w="100%">
      Contact
    </Button>
  </HStack>
);
const Sidebar = ({ isOpen, variant, onClose }) => {
  return variant === "sidebar" ? (
    <Box position="fixed" left={0} p={5} w={"100%"} bg="teal">
      <MainbarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;

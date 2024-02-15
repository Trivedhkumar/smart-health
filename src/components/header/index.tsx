import { Box, Center, IconButton, Text, Flex, chakra } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
interface Props {
  showSidebarButton: boolean;
  onShowSidebar: () => void;
}
const Header: FC<Props> = ({ showSidebarButton = true, onShowSidebar }) => {
  const CFaChevronRight = chakra(FaChevronRight);

  return (
    <Flex bg="teal" p={4} color="white" justifyContent="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<CFaChevronRight w={8} h={8} />}
            colorScheme="white"
            variant="outline"
            onClick={onShowSidebar}
            aria-label={""}
          />
        )}
      </Box>
      <Center flex="1" h="40px">
        <Text fontSize="xl">Page Title</Text>
      </Center>
      <Box flex="1" />
    </Flex>
  );
};

export default Header;

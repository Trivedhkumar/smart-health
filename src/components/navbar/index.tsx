import React from "react";
import { Link, Box, Flex, Text, Button, Stack, Image } from "@chakra-ui/react";
interface Props {
  menuarray: {
    name: string;
    link: string;
    id: string;
  }[];
  isLoginButtonRequired?: boolean;
}
const NavBar = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <NavBarContainer {...props}>
      <Image src="https://i.ibb.co/7NZpfBQ/logo.png" boxSize={"50px"} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks
        menuarray={props.menuarray}
        isOpen={isOpen}
        isLoginButtonRequired={props.isLoginButtonRequired}
      />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({
  isOpen,
  menuarray = [],
  isLoginButtonRequired = false,
}) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {menuarray.map((menuItem) => (
          <MenuItem key={menuItem.link + menuItem.name} to={menuItem.link}>
            {menuItem.name}
          </MenuItem>
        ))}
        {isLoginButtonRequired && (
          <MenuItem to="/login" isLast>
            <Button
              size="sm"
              rounded="md"
              color={"teal"}
              bg={"white"}
              _hover={{
                color: "teal.900",
                bg: "teal.50",
              }}
            >
              LOGIN
            </Button>
          </MenuItem>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
      }}
    >
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={4}
        p={4}
        bg={"teal"}
        color={"white"}
        {...props}
      >
        {children}
      </Flex>
    </div>
  );
};

export default NavBar;

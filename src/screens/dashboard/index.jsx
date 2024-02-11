import { Box } from "@chakra-ui/react";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";

const DashboardScreen = () => {
  const userMenu = getMenuItemsByRole(ROLES.PATIENT);
  return (
    <Box>
      <NavBar menuArray={userMenu} />
    </Box>
  );
};
export default DashboardScreen;

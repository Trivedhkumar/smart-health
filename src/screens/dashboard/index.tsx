import { Button } from "@chakra-ui/react";
import { ROLES } from "../../constants";
import { useCallback, useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (role) => {
      window.location.reload();
      switch (role) {
        case ROLES.PATIENT:
          return navigate("/symptomchecker");
        case ROLES.ADMINISTRATOR:
          return navigate("/usermanagement");
        case ROLES.HEALTHCARE_PROVIDERS:
          return navigate("/eprescriptions");
        case ROLES.PHARMACIST:
          return navigate("/medicationdispensation");
        case ROLES.HEALTH_ADMINISTRATOR:
          return navigate("/facilitymanagement");
        default:
          return navigate("/usermanagement");
      }
    },
    [navigate]
  );
  useEffect(() => {
    switch (location.state.email) {
      case "patient@gmail.com":
        localStorage.setItem("user", ROLES.PATIENT);
        break;
      case "admin@gmail.com":
        localStorage.setItem("user", ROLES.ADMINISTRATOR);
        break;
      case "pharmacist@gmail.com":
        localStorage.setItem("user", ROLES.PHARMACIST);
        break;
      case "healthadmin@gmail.com":
        localStorage.setItem("user", ROLES.HEALTH_ADMINISTRATOR);
        break;
      case "healthcareprovider@gmail.com":
        localStorage.setItem("user", ROLES.HEALTHCARE_PROVIDERS);
        break;
      default:
        localStorage.setItem("user", ROLES.PATIENT);
        break;
    }
    handleNavigate(localStorage.getItem("user"));
  }, [handleNavigate, location.state.email, navigate]);

  return (
    <>
      <Button onClick={() => handleNavigate(location.state.email)}>
        GO Home
      </Button>
    </>
  );
};
export default DashboardScreen;

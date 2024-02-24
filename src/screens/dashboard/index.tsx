import { Button } from "@chakra-ui/react";

import { ROLES } from "../../constants";

import { useEffect } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role =
      location.state.email === "trivedhj@gmail.com"
        ? ROLES.PATIENT
        : ROLES.ADMINISTRATOR;
    localStorage.setItem("user", role);
    location.state.email === "trivedhj@gmail.com"
      ? navigate("/symptomchecker")
      : navigate("/usermanagement");
  }, [location.state.email, navigate]);

  return (
    <>
      <Button
        onClick={
          location.state.email === "trivedhj@gmail.com"
            ? () => navigate("/symptomchecker")
            : () => navigate("/usermanagement")
        }
      >
        GO Home
      </Button>
    </>
  );
};
export default DashboardScreen;

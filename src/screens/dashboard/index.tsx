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
  const handleNavigate = (email) => {
    switch (email) {
      case "trivedhj@gmail.com":
        return navigate("/symptomchecker");
      default:
        return navigate("/usermanagement");
    }
  };
  return (
    <>
      <Button onClick={() => handleNavigate(location.state.email)}>
        GO Home
      </Button>
    </>
  );
};
export default DashboardScreen;

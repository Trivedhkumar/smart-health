import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
export default function App() {
  return (
    <ChakraProvider>
      <div>Hello Js</div>
    </ChakraProvider>
  );
}

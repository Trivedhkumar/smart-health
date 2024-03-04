import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../../../components";
import { ROLES } from "../../../constants";
import { camelCaseToTitle, getMenuItemsByRole } from "../../../utils/functions";
import { invoices } from "./constants";

const MedicationDispenseScreen = () => {
  const userMenu = getMenuItemsByRole(ROLES.PHARMACIST);

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as="h3" size="md">
          Invoices
        </Heading>
        <Accordion allowToggle>
          {invoices.map((invoice) => (
            <AccordionItem key={invoice.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <strong>{invoice.invoiceNumber}</strong>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <UnorderedList>
                  {Object.keys(invoice).map((key) => (
                    <ListItem key={invoice.id + key}>
                      <strong>{camelCaseToTitle(key)}</strong>: {invoice[key]}{" "}
                    </ListItem>
                  ))}
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Box>
  );
};
export default MedicationDispenseScreen;

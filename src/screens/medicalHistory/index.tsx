import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";

function MedicalHistory() {
  const [records, setRecords] = useState([]);

  const addRecord = () => {
    // Implement logic to add a new record
  };

  return (
    <Accordion allowMultiple>
      {records.map((record, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {record.date} - {record.condition}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Text>{record.description}</Text>
            <Input placeholder="Add notes" mb={2} />
          </AccordionPanel>
        </AccordionItem>
      ))}
      <AccordionItem>
        <h2>
          <Box flex="1" textAlign="left">
            Add New Record
          </Box>
          <AccordionIcon />
        </h2>
        <AccordionPanel>
          {/* Form for adding a new record */}
          <Button onClick={addRecord}>Add</Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default MedicalHistory;

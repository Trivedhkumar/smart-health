import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { MEDICATIONS } from "../../screens/prescriptionManagement/constants";
interface Props {
  handleRefillPress: () => void;
}
const PrescriptionTable = ({ handleRefillPress }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Dosage</Th>
            <Th>Frequency</Th>
            <Th>Next refill date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {MEDICATIONS.map((medication, index) => (
            <Tr key={medication.name + index.toString()}>
              <Td>{medication.name}</Td>
              <Td>{medication.dosage ?? "N/A"}</Td>
              <Td>{medication.frequency ?? "N/A"}</Td>
              <Td>{medication.nextRefillDate ?? "N/A"}</Td>
              <Td>
                <Button colorScheme={"teal"} onClick={handleRefillPress}>
                  Refill
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Dosage</Th>
            <Th>Frequency</Th>
            <Th>Next refill date</Th>
            <Th>Actions</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
export default PrescriptionTable;

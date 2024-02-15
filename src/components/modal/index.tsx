import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";

export function CustomModal({ showModal, closeModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("showModal", showModal);
  useEffect(() => {
    if (showModal) {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, showModal]);
  const closeCustomModal = () => {
    closeModal();
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeCustomModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Common Cold </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Viral Infection causing cold</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeCustomModal}>
              UnderStood
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

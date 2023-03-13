import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import AddArtwork from "../components/AddArtwork";
import Artwork from "../components/Artwork";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>+</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une oeuvre d'art</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddArtwork />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Artwork />
    </>
  );
};

export default Home;

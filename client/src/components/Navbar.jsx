import { Flex, Spacer, IconButton, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavLink, Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <Flex bg='gray.100' p={4} alignItems='center'>
      <NavLink to="/">
        <Button colorScheme='teal' mr={4}>
          Home
        </Button>
      </NavLink>
      
      <Spacer />
      <IconButton
        aria-label='Open menu'
        icon={<HamburgerIcon />}
        size='md'
        variant='ghost'
      />
      <Spacer />

      {/* Condition pour afficher le bouton de déconnexion */}
      {isLoggedIn ? (
        <Link to="/logout">
          <Button colorScheme='teal'>
            Déconnexion
          </Button>
        </Link>
      ) : (
        <>
          <NavLink to="/login">
            <Button colorScheme='teal' mr={4}>
              Connexion
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button colorScheme='teal'>Inscription</Button>
          </NavLink>
        </>
      )}
    </Flex>
  );
}

export default Navbar;

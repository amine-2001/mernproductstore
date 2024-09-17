import React from 'react';
import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Adjust the path as needed

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/'); // Redirect to login page or home after logout
    }
  };

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        {isAuthenticated ? (
          <Text
            fontSize={{ base: '22', sm: '28' }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            <Link to="/Home">Product Store 🛒</Link>
          </Text>
        ) : (
          <Text
            fontSize={{ base: '22', sm: '28' }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            <Link to="/">Product Store 🛒</Link>
          </Text>
        )}
        <HStack spacing={2} alignItems="center">
          {isAuthenticated ? (
            <>
              <Button onClick={handleLogout}>
                Logout
              </Button>
              <Link to="/create">
                <Button>
                  <PlusSquareIcon fontSize={20} />
                </Button>
              </Link>
              <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <IoMoon /> : <LuSun size="20" />}
              </Button>
            </>
          ) : (
            <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size="20" />}
          </Button>
          )}
          
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;

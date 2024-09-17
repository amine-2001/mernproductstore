import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";  // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Text, 
  VStack, 
  Heading 
} from "@chakra-ui/react";

const AuthComponent = () => {
  const { login, logout, isAuthenticated, user } = useAuthStore();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes for login form
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      setErrorMessage("");
      navigate("/home"); // Redirect to home page on successful login
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/"); // Redirect to login page or another page on successful logout
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      {isAuthenticated ? (
        <VStack spacing={4} align="center">
          <Heading as="h2" size="lg">Welcome, {user?.username}</Heading>
          <Button colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">Login</Heading>
          <Box as="form" onSubmit={handleLogin}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input 
                type="text" 
                name="username" 
                value={credentials.username} 
                onChange={handleChange} 
                placeholder="Enter your username" 
              />
            </FormControl>
            <FormControl id="password" mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                type="password" 
                name="password" 
                value={credentials.password} 
                onChange={handleChange} 
                placeholder="Enter your password" 
              />
            </FormControl>
            {errorMessage && (
              <Text color="red.500" mt={4}>{errorMessage}</Text>
            )}
            <Button 
              type="submit" 
              colorScheme="teal" 
              size="lg" 
              mt={4} 
              w="full"
            >
              Login
            </Button>
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default AuthComponent;

import React, { useEffect, useState } from "react";
import {
  Box, Grid, Input, Button, useDisclosure, Text, Dialog
} from "@chakra-ui/react";
import { motion } from "framer-motion";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch users using fetch API with async/await
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search)
  );

  return (
    <Box
      p={8}
      bgGradient="linear(to-br, #2a2a72, #009ffd)"
      minH="100vh"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box mb={6} display="flex" alignItems="center" justifyContent="center" w="100%" maxW="600px" position="relative">
        <Input
          placeholder="Search by name or username"
          onChange={handleSearch}
          bg="gray.800"
          border="none"
          borderRadius="lg"
          color="white"
          _placeholder={{ color: "gray.500" }}
          boxShadow="0 0 10px #ff7e00"
          w="100%"
        />
      </Box>
      <Grid templateColumns={"repeat(auto-fit, minmax(250px, 1fr))"} gap={6} w="100%" maxW="1200px">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setSelectedUser(user);
              onOpen();
            }}
          >
            <Box
              p={6}
              shadow="lg"
              borderWidth="1px"
              borderRadius="lg"
              bgGradient="linear(to-br, #1f1c2c, #928dab)"
              color="white"
              _hover={{ bg: "orange.700", boxShadow: "0 0 20px #ff7e00" }}
              textAlign="center"
              transition="all 0.3s ease-in-out"
            >
              <Text fontSize="xl" fontWeight="bold">
                {user.name}
              </Text>
              <Text mt={2} color="orange.300" textShadow="0 0 10px #ff7e00">
                {user.username}
              </Text>
            </Box>
          </motion.div>
        ))}
      </Grid>

      {/* Dialog Component */}
      {isOpen && (
        <Dialog isOpen={isOpen} onClose={onClose} isCentered>
          <Box p={6} bgGradient="linear(to-br, #2a2a72, #009ffd)" color="white" borderRadius="lg" boxShadow="0 0 20px #ff7e00">
            <Text fontSize="2xl" fontWeight="bold" textShadow="0 0 10px #ff7e00">
              {selectedUser?.name}
            </Text>
            <Text mt={4}>Phone: {selectedUser?.phone}</Text>
            <Text>Website: {selectedUser?.website}</Text>
            <Text>
              Address: {selectedUser?.address.street}, {selectedUser?.address.city}
            </Text>
            <Button mt={6} colorScheme="orange" onClick={onClose} boxShadow="0 0 10px #ff7e00">
              Close
            </Button>
          </Box>
        </Dialog>
      )}
    </Box>
  );
}

export default App;

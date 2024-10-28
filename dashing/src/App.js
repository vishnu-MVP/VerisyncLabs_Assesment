import React, { useEffect, useState } from "react";
import {
  Box, Grid, Input, Button, Text, HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { keyframes } from '@emotion/react';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("name"); 

  // Fetching with async fetch
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


  const handleSort = (option) => {
    setSortOption(option);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search)
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "username") {
        return a.username.localeCompare(b.username);
      }
      return 0;
    });

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

 
  const rotateAnimation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;


  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;

  return (
    <Box
      p={8}
      bgGradient="linear(to-br, #141414, #1c1c1c, #292929)"
      minH="100vh"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Title Card */}
      <Box
        p={6}
        mb={6}
        shadow="lg"
        borderWidth="1px"
        borderRadius="lg"
        color="white"
        textAlign="center"
        position="relative"
        overflow="hidden"
        bg="#1e1e1e"
        background="linear-gradient(90deg, #ff6e40, #ff3f96, #ff6e40)"
        backgroundSize="200% 200%"
        animation={`${gradientAnimation} 3s ease infinite`}
      >
        <Text
  fontSize="2xl"
  fontWeight="bold"
  zIndex={2}
  position="relative"
 
 
>
  Dashing by Vishnu_MVP
</Text>
      </Box>

      {/* Search Bar */}
      <Box mb={6} display="flex" alignItems="center" justifyContent="center" w="100%" maxW="600px" position="relative">
        <Input
          placeholder="Search by name or username"
          onChange={handleSearch}
          bg="#1e1e1e"
          border="none"
          borderRadius="lg"
          color="white"
          _placeholder={{ color: "#6b6b6b" }}
          boxShadow="0 0 20px #ff6e40"
          w="100%"
        />
      </Box>

      {/* Sorting Options */}
      <HStack spacing={4} mb={6}>
        <Button
          onClick={() => handleSort("name")}
          colorScheme="orange"
          variant={sortOption === "name" ? "solid" : "outline"}
        >
          Sort by Name
        </Button>
        <Button
          onClick={() => handleSort("username")}
          colorScheme="orange"
          variant={sortOption === "username" ? "solid" : "outline"}
        >
          Sort by Username
        </Button>
      </HStack>

      {/* User Cards */}
      <Grid templateColumns={"repeat(auto-fit, minmax(250px, 1fr))"} gap={6} w="100%" maxW="1200px">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.05 }}
            style={{ position: "relative", width: "290px", height: "190px" }}
          >
          
            <Box
              borderRadius="lg"
              bgGradient="linear-gradient(90deg, #ff6e40, #ff3f96, #ff6e40)"
              backgroundSize="200% 200%"
              animation={`${gradientAnimation} 1.5s linear infinite`} // Faster animation speed for user cards
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={-1}
              width="100%"
              height="100%"
            ></Box>
          
            <Box
              p={6}
              shadow="lg"
              borderRadius="lg"
              bg="#1e1e1e"
              color="white"
              textAlign="center"
              transition="all 0.2s ease-in-out"
              position="relative"
              overflow="hidden"
              zIndex={0}
              m="4px" 
              width="calc(100% - 8px)"
              height="calc(100% - 8px)"
              _hover={{ boxShadow: "0 0 20px #ff6e40, 0 0 30px #ff3f96" }}
            >
              <Text fontSize="xl" fontWeight="bold" zIndex={2} position="relative">
                {user.name}
              </Text>
              <Text
                mt={2}
                color="#ff6e40"
                textShadow="0 0 10px #ff3f96"
                zIndex={2}
                position="relative"
              >
                {user.username}
              </Text>
              <Button
                position="absolute"
                bottom={4}
                left="50%"
                transform="translateX(-50%)"
                size="sm"
                bg="#2a2a2a"
                color="white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(user);
                }}
                opacity={0}
                _hover={{
                  opacity: 1,
                  bgGradient: "linear(to-br, #ff6e40, #ff3f96, #ff6e40)",
                  color: "white",
                }}
                _groupHover={{ opacity: 1 }}
                transition="opacity 0.3s ease-in-out"
                zIndex={2}
                boxShadow="0 0 10px #ff6e40, 0 0 15px #ff3f96"
              >
                View Details
              </Button>
            </Box>
          </motion.div>
        ))}
      </Grid>

      {/*  Modal */}
      {isModalOpen && selectedUser && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000'
        }}>
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 20px #ff6e40, 0 0 30px #ff3f96',
            color: 'white',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              content: '',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '8px',
              border: '2px solid transparent',
              borderImage: 'linear-gradient(90deg, #ff6e40, #ff3f96, #ff6e40)',
              borderImageSlice: 1,
              zIndex: 1,
              pointerEvents: "none"
            }} />
            <Text fontSize="2xl" fontWeight="bold" textShadow="0 0 10px #ff3f96" zIndex={2} position="relative">
              {selectedUser?.name}
            </Text>
            <Text mt={4} zIndex={2} position="relative">Phone: {selectedUser?.phone}</Text>
            <Text zIndex={2} position="relative">Website: {selectedUser?.website}</Text>
            <Text zIndex={2} position="relative">
              Address: {selectedUser?.address.street}, {selectedUser?.address.city}
            </Text>
            <Button
              mt={6}
              bg="#2a2a2a"
              color="white"
              onClick={handleCloseModal}
              zIndex={2}
              boxShadow="0 0 10px #ff6e40, 0 0 15px #ff3f96"
              _hover={{
                bgGradient: "linear(to-br, #ff6e40, #ff3f96, #ff6e40)",
                color: "white",
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Box>
  );
}

export default App;

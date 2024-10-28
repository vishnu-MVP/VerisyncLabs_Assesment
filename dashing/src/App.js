import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  Box, Grid, Input, Button, Text, HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { keyframes } from '@emotion/react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import useSound from 'use-sound'; 

import bgSound from './sounds/bg-sound.mp3';
import hoverSound from './sounds/hover.wav';
import modalOpenSound from './sounds/modal-open.wav';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("name");
  const [hoveredCard, setHoveredCard] = useState(null);
  const particlesInitRef = useRef(false);
  // I use these sounds to provide elevated experience
  const [playBgSound] = useSound(bgSound, { volume: 0.5, loop: true }); //in loop for continuous BGM
  const [playHoverSound] = useSound(hoverSound, { volume: 0.1 });
  const [playModalOpenSound] = useSound(modalOpenSound, { volume: 1.0 });

  useEffect(() => {
    playBgSound(); 
  }, [playBgSound]);

  const particlesInit = useCallback(async (engine) => {
    if (!particlesInitRef.current) {
      await loadSlim(engine);
      particlesInitRef.current = true;
    }
  }, []);

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
  const handleSort = (option) => setSortOption(option);

  const resetToHomeView = () => {
    setSearch("");  setSortOption("name"); 
    setSelectedUser(null); 
    setIsModalOpen(false); 
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
    playModalOpenSound(); // sound during modal open
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background
    position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;

  const particlesOptions = useMemo(() => ({
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      size: {
        value: { min: 1, max: 3 },
        random: true,
        anim: {
          speed: 4,
          size_min: 0.3,
        },
      },
      links: {
        enable: false,
      },
      move: {
        random: true,
        speed: 2,
        direction: "none",
        outModes: {
          default: "out",
        },
        enable: true,
        straight: false,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        onClick: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        bubble: {
          distance: 250,
          duration: 2,
          size: 0,
          opacity: 0,
        },
        repulse: {
          distance: 300,
          duration: 2,
        },
      },
    },
    detectRetina: true,
    background: {
      color: {
        value: "#141414",
      },
    },
  }), []);

  return (
    <Box
      p={8}
      bgGradient="linear(to-br, #141414, #1c1c1c, #292929)"
      minH="100vh"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
  
      <Box
        p={6}
        mb={6}
        shadow="lg"
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
        position="relative"
        overflow="hidden"
        onClick={resetToHomeView}
        bg="#1e1e1e"
        background="linear-gradient(90deg, #ff6e40, #ff3f96, #ff6e40)"
        backgroundSize="200% 200%"
        animation={`${gradientAnimation} 2s ease infinite`}
      >
        <Text fontSize="2xl" fontWeight="bold" zIndex={2} position="relative">
          Dashing by Vishnu_MVP
        </Text>
      </Box>

      <Box mb={6} display="flex" alignItems="center" justifyContent="center" w="100%" maxW="600px">
        <Input
          placeholder="Search by name or username"
          onChange={handleSearch}
          bg="#1e1e1e"
          borderRadius="lg"
          color="white"
          _placeholder={{ color: "#6b6b6b" }}
          boxShadow="0 0 20px #ff6e40"
          w="100%"
        />
      </Box>

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

      <Grid templateColumns={"repeat(auto-fit, minmax(250px, 1fr))"} gap={6} w="100%" maxW="1200px">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => {
              setHoveredCard(user.id);
              playHoverSound(); // I call the handler here to play Sound for card hover
            }}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ position: "relative", width: "290px", height: "190px" }}
          >
            <Box
              borderRadius="lg"
              bgGradient="linear-gradient(90deg, #ff6e40, #ff3f96, #ff6e40)"
              backgroundSize="200% 200%"
              animation={`${gradientAnimation} 1s linear infinite`}
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={-1}
            ></Box>

            <Box
              p={6}
              shadow="lg"
              borderRadius="lg"
              bg="#1e1e1e"
              textAlign="center"
              transition="all 0.2s ease-in-out"
              m="4px"
              width="calc(100% - 8px)"
              height="calc(100% - 8px)"
              _hover={{ boxShadow: "0 0 20px #ff6e40, 0 0 30px #ff3f96" }}
            >
              <Text fontSize="xl" fontWeight="bold">
                {user.name}
              </Text>
              <Text mt={2} color="#ff6e40" textShadow="0 0 10px #ff3f96">
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
                opacity={hoveredCard === user.id ? 1 : 0}
                pointerEvents={hoveredCard === user.id ? "auto" : "none"}
                transition="opacity 0.3s ease-in-out"
                boxShadow="0 0 10px #ff6e40, 0 0 15px #ff3f96"
              >
                View Details
              </Button>
            </Box>
          </motion.div>
        ))}
      </Grid>

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
              pointerEvents: 'none',
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
                bgGradient: 'linear(to-br, #ff6e40, #ff3f96, #ff6e40)',
                color: 'white',
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

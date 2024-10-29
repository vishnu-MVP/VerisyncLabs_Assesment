// src/App.js
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Box, VStack, Input, Button, Text, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import useSound from "use-sound";
import init, { get_pass_hash, generate_proof, verify_proof } from "./pkg/zk_wasm.js";

import bgSound from "./sounds/bg-sound.mp3";
import hoverSound from "./sounds/hover.wav";
import modalOpenSound from "./sounds/modal-open.wav";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function App() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const particlesInitRef = useRef(false);

  const [playBgSound] = useSound(bgSound, { volume: 0.5, loop: true });
  const [playHoverSound] = useSound(hoverSound, { volume: 0.1 });
  const [playModalOpenSound] = useSound(modalOpenSound, { volume: 1.0 });

  useEffect(() => {
    playBgSound();
    init(); // Initialize the WASM module
  }, [playBgSound]);

  const particlesInit = useCallback(async (engine) => {
    if (!particlesInitRef.current) {
      await loadSlim(engine);
      particlesInitRef.current = true;
    }
  }, []);

  const particlesOptions = useMemo(() => ({
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      size: { value: { min: 1, max: 3 }, anim: { speed: 4, size_min: 0.3 } },
      move: { random: true, speed: 2, outModes: { default: "out" } },
    },
    background: { color: { value: "#141414" } },
  }), []);

  const showToast = (message, type) => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegister = async () => {
    const hashedPassword = get_pass_hash(password); // Use WASM function
    localStorage.setItem(username, JSON.stringify(hashedPassword));
    showToast("Registration successful!", "success");
    setIsLoginView(false);
  };

  const handleLogin = async () => {
    const storedHash = JSON.parse(localStorage.getItem(username));
    if (!storedHash) {
      showToast("User not found!", "error");
      return;
    }

    const proof = await generate_proof(username, password); // Generate proof
    const isValid = verify_proof(proof, storedHash, username); // Verify proof

    if (isValid) {
      showToast("Login successful!", "success");
    } else {
      showToast("Invalid credentials!", "error");
    }
  };

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
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      />

      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: "fixed",
            top: "20px",
            padding: "10px 20px",
            backgroundColor: toastMessage.type === "success" ? "#4caf50" : "#f44336",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          {toastMessage.message}
        </motion.div>
      )}

      {isLoginView ? (
        <VStack
          spacing={6}
          p={8}
          shadow="lg"
          borderWidth="1px"
          borderRadius="lg"
          bg="#1e1e1e"
          animation={`${gradientAnimation} 4s ease infinite`}
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Login
          </Text>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="#2a2a2a"
            color="white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="#2a2a2a"
            color="white"
          />
          <Button colorScheme="orange" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="link" color="orange.300" onClick={() => setIsLoginView(false)}>
            Back to Home
          </Button>
        </VStack>
      ) : (
        <VStack
          spacing={6}
          p={8}
          shadow="lg"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
          bg="#1e1e1e"
          animation={`${gradientAnimation} 4s ease infinite`}
        >
          <Text fontSize="2xl" fontWeight="bold">Register</Text>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="#2a2a2a"
            color="white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="#2a2a2a"
            color="white"
          />
          <Button colorScheme="orange" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="link" color="orange.300" onClick={() => setIsLoginView(true)}>
            Already have an account? Login
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;

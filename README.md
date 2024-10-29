# VerisyncLabs_Assessment

# Q1 : 🚀 Dashing by Vishnu-MVP 🎨

Welcome to **Dashing by Vishnu_MVP**, a beautifully crafted **interactive React Dashboard app** ✨ with stunning visuals, sound effects 🎵, and smooth animations 🎥. This app demonstrates a combination of **dynamic UI elements**, **particle effects**, **searchable user lists**, and an intuitive **modal system**. It's built with ❤️ using React, Chakra UI, Framer Motion, and TSParticles.

Check the live website [here](https://dashing-vishnu-mvp.onrender.com/)

---

## 🌟 Features

- 🎇 **Animated Particle Background**: Smooth and Interactive particle effects using TSParticles.
- 🕵️‍♂️ **Search Functionality**: Quickly find users by name or username.
- 🗂️ **Sorting Options**: Sort users by **Name** or **Username**.
- 🔊 **Sound Effects**:  
  - **Background music**: Adds ambient vibes 🎶.  
  - **Hover sounds**: Feel the interaction with subtle sounds on hover.  
  - **Modal open sounds**: Engage users with delightful audio feedback.
- 🏠 **Dynamic Home View Reset**: Title card doubles as a **reset button** with hover effects.
- 🖼️ **Modals with User Details**: View more information about users in beautiful modals.
- 🎨 **Gradient Animations**: Smooth, animated gradients on the title and cards for a stunning effect.

---

## 📸 Preview

Here's a sneak peek of the **Dashing by Vishnu_MVP** interface:

![alt text](https://github.com/vishnu-MVP/VerisyncLabs_Assessment/blob/main/dashing/src/UI/UI.PNG?raw=true)

---

## 🛠️ Tech Stack

This project leverages modern tools and libraries:

- **React** ⚛️: Component-based user interface.
- **Chakra UI** 🌈: Elegant and customizable components.
- **Framer Motion** 🎥: Smooth animations and interactions.
- **TSParticles** 🎇: Interactive particle effects.
- **use-sound** 🔊: Hook-based sound management for immersive audio.

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1️⃣ Prerequisites

Make sure you have the following installed:

- **Node.js** 🟢 (LTS version recommended)  
- **npm** (comes with Node.js) or **yarn** 📦

### 2️⃣ Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/dashing-by-vishnu-mvp.git
cd dashing-by-vishnu-mvp
npm install
```

# Q2 : 🛡️ ZK-Based Authentication System Using zkAuth Kit 🔒

This project demonstrates the implementation of a **Zero-Knowledge (ZK) Proof-based Authentication System** using the **zkAuth kit**. The focus is on creating a secure registration and login flow with **WASM integration** for ZK-proof generation and verification. This approach ensures the user's password and proof are managed securely on the frontend.

## 🌟 Features

- **Registration Flow**:
  - Users register by entering their **desired username** and **password**.
  - The password is hashed using the **get_pass_hash()** function from the zkAuth WASM package.
  - The hashed password is stored locally (simulated backend).

- **Login Flow**:
  - Users log in by providing their **username** and **password**.
  - A **ZK-proof** is generated using the **generate_proof()** function from the WASM package.
  - The proof is sent to the simulated backend along with the username.
  - The **verify_proof()** function is used to check the proof against the stored hash.
  - **Success or failure messages** are displayed based on proof verification.

## 🛠️ Tech Stack

- **React** ⚛️: For building the UI and managing state.
- **Chakra UI** 🌈: To maintain a clean and visually appealing design.
- **Framer Motion** 🎥: For smooth animations.
- **tsparticles** 🎇: For engaging particle effects in the background.
- **WASM** 🛡️: To generate and verify Zero-Knowledge proofs.


## 📸 Preview

Here's a sneak peek of the **Authentication using the ZK- WASM** interface:

![alt text](https://github.com/vishnu-MVP/VerisyncLabs_Assessment/blob/main/dashing/src/UI/UI2.PNG?raw=true)

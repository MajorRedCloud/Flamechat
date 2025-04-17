# AI Agent for Appointment Assistance (React Native Expo App)

## Overview

This project is a React Native mobile application built with Expo and TypeScript, designed to interact with an AI-powered backend assistant. Users can chat with the assistant to ask questions about company policies or services and book appointments through natural language conversation. The app features a clean user interface, session management, and a booking confirmation modal.

## Features

*   **Bottom Tab Navigation:** Easy switching between Home and Chat screens.
*   **Home Screen:** Displays information about the application's purpose, workflow, and the technology stack used.
*   **Chat Screen:**
    *   Interactive chat interface powered by `react-native-gifted-chat`.
    *   Real-time messaging with the backend AI assistant.
    *   Handles appointment booking requests via chat.
    *   Displays loading indicators during backend communication.
    *   Manages chat sessions for conversation context.
    *   "Clear Chat" functionality to reset the conversation.
*   **Booking Confirmation Modal:** Displays details of a successfully booked appointment.
*   **Styling:** Clean and modern UI using NativeWind (Tailwind CSS for React Native).

## Technology Stack

*   **Frontend:**
    *   React Native
    *   Expo (Managed Workflow)
    *   TypeScript
    *   React Navigation (Bottom Tabs)
    *   NativeWind
    *   React Native Gifted Chat
*   **Backend (Pre-existing):**
    *   Python / Flask
    *   Vercel Serverless Functions
    *   **API Endpoint:** `https://flask-backend-vercel.vercel.app/chat`
*   **AI / NLP:**
    *   Google Gemini (with Function Calling)
*   **Database:**
    *   NeonDB (Serverless PostgreSQL for bookings)
    *   Pinecone (Vector DB for RAG Q&A)

## Screenshots

*(Add screenshots here once the UI is developed)*

*   *Home Screen*
*   *Chat Screen*
*   *Booking Modal*

## Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [Expo Go](https://expo.dev/go) app on your iOS or Android device (for testing on physical devices)
*   Alternatively: [Android Studio](https://developer.android.com/studio) / [Xcode](https://developer.apple.com/xcode/) for simulators/emulators
*   [Git](https://git-scm.com/) (for cloning the repository)

## Setup and Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Application

1.  **Start the Expo development server:**
    ```bash
    npx expo start
    ```
2.  **Run on a device or simulator:**
    *   **iOS Simulator:** Press `i` in the terminal where Expo CLI is running.
    *   **Android Emulator:** Press `a` in the terminal. (Ensure an emulator is running via Android Studio).
    *   **Physical Device:** Scan the QR code displayed in the terminal using the Expo Go app on your phone (ensure your phone and computer are on the same Wi-Fi network).

## Backend Note

This frontend application connects to a pre-existing backend API deployed on Vercel:
`https://flask-backend-vercel.vercel.app/chat`

No backend setup is required for this frontend project, as long as the Vercel deployment is active.

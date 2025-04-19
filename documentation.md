
 Project Documentation: AI Chat Assistant
=========================================

1. Project Overview & Purpose
-----------------------------
This project is a mobile application built using React Native and the Expo framework (with TypeScript and NativeWind for styling). It serves as a frontend interface for users to interact with a pre-existing AI-powered backend assistant.

The primary goals of the app are:
- To allow users to ask questions related to company policies or services.
- To enable users to book appointments through natural language conversation with the AI.
- To provide a clean, intuitive chat interface for these interactions.
- To demonstrate the integration of a mobile frontend with a sophisticated backend API handling AI logic, database interactions, and session management.

2. Core Features
----------------
*   **Tab Navigation:** Simple two-tab bottom navigation (Home, Chat) implemented using Expo Router's file-based routing (`app/(tabs)` layout).
*   **Home Screen:** Displays static information about the application, including its purpose, how the chat interaction works, and a detailed breakdown of the technologies used in both the frontend and the backend.
*   **Chat Screen:**
    *   **Chat Interface:** Utilizes the `react-native-gifted-chat` library for the main chat UI, customized for a dark theme.
    *   **Real-time Interaction:** Sends user messages to the backend API and displays the AI assistant's responses.
    *   **Session Management:** Maintains conversation context by receiving a `session_id` from the backend and sending it back with subsequent requests.
    *   **Loading Indicator:** Shows a full-screen semi-transparent overlay with a spinner (`ActivityIndicator`) while waiting for a response from the backend (`isLoading` state).
    *   **Typing Indicator:** Displays Gifted Chat's built-in typing indicator (`isTyping` state) to simulate the bot "thinking".
    *   **Clear Chat:** Provides a button in the header to reset the chat history to the initial welcome message and clear the current `session_id`.
    *   **Haptic Feedback:** Uses `expo-haptics` to provide tactile feedback when sending a message, receiving a successful reply, receiving an error, and clearing the chat.
    *   **Custom Header:** Includes a custom header with a back navigation button and the "Clear Chat" button.
*   **Booking Confirmation:**
    *   **Detection:** Attempts to detect successful booking confirmations by parsing the assistant's reply text for specific keywords (e.g., "Success!", "ID:"). (Note: This text-based parsing is inherently brittle).
    *   **Details Extraction:** Uses a helper function (`parseBookingDetails`) to attempt extraction of Booking ID, Name, and DateTime from the confirmation message text.
    *   **Confirmation Modal:** Displays a pop-up modal (`BookingDetailsModal`) showing the extracted booking details upon successful detection.

3. How it Works (Technical Flow - Chat Screen)
---------------------------------------------
1.  **User Input:** The user types a message in the Gifted Chat input and presses the send button.
2.  **`onSend` Triggered:** The `onSend` callback function in `chat.tsx` is executed.
3.  **UI Update (User):** The user's message is immediately appended to the `messages` state array, causing the UI to update instantly.
4.  **State Update (Loading):** `isLoading` and `isTyping` states are set to `true`.
5.  **Payload Construction:** A JSON payload object is created containing the user's message (`query`) and the current `session_id` (retrieved from state, or `null` initially).
6.  **API Call:** The `getReplyFromServer` function (in `lib/serverActions.ts`) is called. This function makes an asynchronous `PUT` request using `fetch` to the backend API endpoint (`https://flask-backend-vercel.vercel.app/chat`) with the JSON payload.
7.  **Backend Processing (External):** The Flask backend receives the request. It uses the `session_id` (if provided) to retrieve context. Google Gemini processes the `query`, potentially interacting with Pinecone (for RAG Q&A) or NeonDB (for booking actions via Function Calling). The backend formulates a reply.
8.  **Response Handling:**
    *   **Success:** If the `fetch` call is successful and the response status is OK, the JSON response (containing `reply` and `session_id`) is parsed.
    *   **Error:** If the `fetch` fails (network error) or the response status is not OK, an error is thrown/caught.
9.  **State Update (Session):** If successful, the `sessionId` state is updated with the `session_id` received from the backend.
10. **Booking Check:** The `reply.reply` text is checked for booking confirmation keywords.
11. **Modal Logic (If Booking):**
    *   `parseBookingDetails` is called to extract details from the text.
    *   The `bookingDetails` state is updated with the extracted information.
    *   The `isModalVisible` state is set to `true`.
12. **UI Update (Assistant/Error):**
    *   A new message object is created containing either the `reply.reply` text or a user-friendly error message.
    *   This message object is appended to the `messages` state array, displaying it in the chat.
13. **Haptics:** Appropriate haptic feedback is triggered (success, error).
14. **State Update (Loading):** The `finally` block ensures `isLoading` and `isTyping` are set back to `false`.

4. Role as Frontend
-------------------
This React Native application acts purely as the **frontend** or **client interface**. It is responsible for:
- Rendering the user interface (screens, buttons, chat bubbles, modal).
- Capturing user input (text messages, button taps).
- Making network requests (API calls) to the backend server.
- Receiving data (responses, session IDs) from the backend.
- Displaying the received data to the user.
- Managing local UI state (messages, loading status, modal visibility, session ID).

**Crucially, this application does NOT contain:**
- The AI/LLM logic (Google Gemini).
- The business logic for handling bookings or policy questions.
- The database connections or data storage (NeonDB, Pinecone).
- The core session management logic (handled by the backend).

It relies entirely on the pre-existing backend API deployed at `https://flask-backend-vercel.vercel.app/chat` to perform the actual "thinking" and data operations. This separation of concerns is a standard practice in application development.

5. Technology Stack (Recap)
---------------------------
*   **Frontend:**
    *   React Native (Core framework)
    *   Expo (Toolset, managed workflow initially, dev client required for latest Gifted Chat)
    *   Expo Router (File-based navigation)
    *   TypeScript (Static typing)
    *   NativeWind (Tailwind CSS for styling)
    *   React Native Gifted Chat (Chat UI component library)
    *   `react-native-safe-area-context` (Handling notches/safe areas)
    *   `expo-haptics` (Tactile feedback)
    *   `@expo/vector-icons` (Icons)
*   **Backend (External API):**
    *   Python / Flask
    *   Vercel Serverless Functions
*   **AI / NLP (External):**
    *   Google Gemini (via backend)
*   **Database (External):**
    *   NeonDB (PostgreSQL via backend)
    *   Pinecone (Vector DB via backend)

6. Key Components/Files
-----------------------
*   `app/_layout.tsx`: Root layout, sets up the Stack navigator.
*   `app/(tabs)/_layout.tsx`: Defines the Bottom Tab Navigator structure, icons, and styling.
*   `app/(tabs)/home.tsx`: Implements the static informational Home screen.
*   `app/(tabs)/chat.tsx`: Contains the core chat logic, state management (`useState`, `useCallback`), Gifted Chat setup and customization, API call triggering (`onSend`), modal state management, and header setup.
*   `components/BookingDetailsModal.tsx`: Defines the UI and logic for the booking confirmation pop-up modal.
*   `lib/serverActions.ts`: Contains the `getReplyFromServer` async function responsible for making the `fetch` call to the backend API.
*   `constants/index.ts`: Includes the `parseBookingDetails` helper function and potentially shared interfaces like `BookingDetails`.
*   `assets/icons/`: Stores SVG icons used in the tab bar.
*   `app.json`: Expo configuration file.
*   `package.json`: Project dependencies and scripts.
*   `tailwind.config.js`: NativeWind configuration.

7. Future Enhancements Discussed
--------------------------------
*   **Profile Page & Google OAuth:**
    *   **Concept:** Add an optional third "Profile" tab allowing users to sign in with their Google account using OAuth (`expo-auth-session`). Display their name and profile picture on this screen.
    *   **Status:** Feasible but adds moderate complexity. Currently serves no functional purpose beyond personalization as the user info isn't used elsewhere in the app. Considered for a future version.
*   **Speech-to-Text Input:**
    *   **Concept:** Add a microphone icon to the chat input. Allow users to speak their message, have it transcribed to text using an external Speech-to-Text (STT) service (like Google Cloud STT), and then send the resulting text to the chat backend.
    *   **Status:** Significantly complex. Requires integrating an external STT service API, handling audio recording and permissions, and likely necessitates using an Expo Development Build (cannot use Expo Go). Considered a major feature for a potential future version.
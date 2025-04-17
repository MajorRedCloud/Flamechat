import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView className="flex-1 px-4 py-6">
        {/* Main Title */}
        <Text className="text-3xl font-bold text-violet-400 text-center mb-10">
          AI Agent for Appointment Assistance
        </Text>

        {/* What This App Does Section */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold text-indigo-400 mb-4">
            What This App Does
          </Text>
          <View className="pl-4 border-l-2 border-indigo-400">
            <Text className="text-base text-gray-300 leading-relaxed">
              This application serves as a mobile interface to interact with an AI agent. You can use the chat screen to:
            </Text>
            <View className="mt-2 pl-4">
              <Text className="text-base text-gray-300 mb-1">- Ask questions about company policies or services.</Text>
              <Text className="text-base text-gray-300 mb-1">- Book appointments through chatbot.</Text>
            </View>
            <Text className="text-base text-gray-300 mt-2 leading-relaxed">
              It utilizes the integration of a React Native frontend with vercel's backend serverless functions leveraging AI capabilities.
            </Text>
          </View>
        </View>

        {/* How It Works Section */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold text-pink-400 mb-4">
            How It Works
          </Text>
          <View className="pl-4 border-l-2 border-pink-400">
             <Text className="text-base text-gray-300 leading-relaxed mb-2">
               The core interaction happens in the Chat screen:
             </Text>
             <View className="pl-4">
                <Text className="text-base text-gray-300 mb-2 leading-relaxed">
                    1.  <Text className="font-medium text-white">You send a message:</Text> The app captures your text and sends it to the backend API along with a session ID to maintain context.
                </Text>
                <Text className="text-base text-gray-300 mb-2 leading-relaxed">
                    2.  <Text className="font-medium text-white">Backend Processing:</Text> The Flask API receives the request. Google Gemini processes the query, potentially using Function Calling for specific actions like checking availability or booking.
                </Text>
                 <Text className="text-base text-gray-300 mb-2 leading-relaxed">
                    3.  <Text className="font-medium text-white">Information Retrieval:</Text> For general questions, the backend might query the Pinecone vector database (RAG). For bookings, it interacts with the NeonDB PostgreSQL database.
                </Text>
                 <Text className="text-base text-gray-300 mb-2 leading-relaxed">
                    4.  <Text className="font-medium text-white">Response Generation:</Text> The backend formulates a reply based on Gemini's output and retrieved data.
                </Text>
                 <Text className="text-base text-gray-300 leading-relaxed">
                    5.  <Text className="font-medium text-white">Display Reply:</Text> The app receives the response and displays the assistant's message. If a booking is confirmed, a confirmation modal pops up.
                </Text>
             </View>
          </View>
        </View>

        {/* --- Technology Stack Sections Follow --- */}

        {/* Main Technology Stack Title */}
        <Text className="text-3xl font-bold text-violet-400 text-center mb-10 mt-4">
            Technology Stack
        </Text>

        {/* Frontend Section */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold text-sky-400 mb-4">
            Frontend
          </Text>
          {/* --- Frontend items as before --- */}
          <View className="pl-4 border-l-2 border-sky-400">
            <View className="mb-4">
              <Text className="text-base font-medium text-white">React Native</Text>
              <Text className="text-sm text-gray-300 mt-1">Framework for building native mobile apps using React and TypeScript.</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-medium text-white">Expo</Text>
              <Text className="text-sm text-gray-300 mt-1">Platform and toolset built around React Native to simplify development and deployment.</Text>
            </View>
             <View className="mb-4">
              <Text className="text-base font-medium text-white">TypeScript</Text>
              <Text className="text-sm text-gray-300 mt-1">Superset of JavaScript adding static type checking for more robust code.</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-medium text-white">React Navigation</Text>
              <Text className="text-sm text-gray-300 mt-1">Standard library for routing and navigation in React Native applications.</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-medium text-white">NativeWind</Text>
              <Text className="text-sm text-gray-300 mt-1">Allows using Tailwind CSS for styling.</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-medium text-white">React Native Gifted Chat</Text>
              <Text className="text-sm text-gray-300 mt-1">Customizable chat UI component library for React Native.</Text>
            </View>
          </View>
        </View>

        {/* Backend Section */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold text-emerald-400 mb-4">
            Backend
          </Text>
          {/* --- Backend items as before --- */}
           <View className="pl-4 border-l-2 border-emerald-400">
            <View className="mb-4">
              <Text className="text-base font-medium text-white">Python</Text>
              <Text className="text-sm text-gray-300 mt-1">Versatile, high-level language used for the backend API logic.</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-medium text-white">Flask</Text>
              <Text className="text-sm text-gray-300 mt-1">A lightweight WSGI web application framework in Python.</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-medium text-white">Vercel Serverless Functions</Text>
              <Text className="text-sm text-gray-300 mt-1">Platform for deploying and running backend code without server management.</Text>
            </View>
          </View>
        </View>

        {/* AI/NLP Section */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold text-amber-400 mb-4">
            AI
          </Text>
          {/* --- AI/NLP items as before --- */}
          <View className="pl-4 border-l-2 border-amber-400">
            <View className="mb-4">
              <Text className="text-base font-medium text-white">Google Gemini (Function Calling)</Text>
              <Text className="text-sm text-gray-300 mt-1">AI model used for natural language understanding and executing specific tasks (like booking).</Text>
            </View>
          </View>
        </View>

        {/* Database Section */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold text-rose-400 mb-4">
            Database
          </Text>
          {/* --- Database items as before --- */}
          <View className="pl-4 border-l-2 border-rose-400">
            <View className="mb-4">
              <Text className="text-base font-medium text-white">NeonDB</Text>
              <Text className="text-sm text-gray-300 mt-1">Serverless PostgreSQL provider used for storing booking data.</Text>
            </View>
            <View className="mb-4">
              <Text className="text-base font-medium text-white">Pinecone (Vector DB)</Text>
              <Text className="text-sm text-gray-300 mt-1">Vector database used for efficient semantic search in Retrieval-Augmented Generation (RAG).</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
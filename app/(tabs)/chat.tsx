import { Link } from 'expo-router';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  return (
    <SafeAreaView className='flex-1 px-4 py-6 bg-gray-950'>
      <StatusBar barStyle='light-content' backgroundColor='black' />
      <Text className='text-red-500 font-bold text-lg'>Chat Screen</Text>
    </SafeAreaView>
  );
}


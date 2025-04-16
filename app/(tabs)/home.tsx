import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-gray-100'>
      <Text className='text-blue-500 font-bold text-2xl mb-4'>Home</Text>
    </View>
  );
}


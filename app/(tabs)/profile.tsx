import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  return (
    <SafeAreaView className='flex-1 px-4 py-6 bg-gray-950'>
        <StatusBar barStyle='light-content' backgroundColor='black' />
        <Text className='text-red-500 font-bold text-lg'>Profile</Text>
    </SafeAreaView>
  )
}

export default profile
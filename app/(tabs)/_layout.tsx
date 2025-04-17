// app/_layout.tsx
import { Tabs } from 'expo-router';
import { Text } from 'react-native';


// Adjust the path based on your project structure!
import HomeIcon from '@/assets/icons/home.svg';
import ChatIcon from '@/assets/icons/chat.svg';
import ProfileIcon from '@/assets/icons/profile.svg';

export default function TabLayout() {

  const inactiveTabColor = '#9ca3af'; // Tailwind gray-400
  const activeTabColor = '#a78bfa';   // Tailwind violet-400 
  const tabBarBgColor = 'black';    // Tailwind gray-800
  const iconSize = 24; // Define a size for your SVGs

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTabColor,    // Active label color (matches active stroke)
        tabBarInactiveTintColor: inactiveTabColor,  // Inactive label color (matches inactive stroke)
        tabBarStyle: {
          backgroundColor: tabBarBgColor,
          borderTopWidth: 0.5,
          paddingBottom: 0,
          height: 54,
          borderColor: '#111827', // Tailwind gray-700
        },
        tabBarItemStyle: {
           paddingVertical: 8,
        },
        headerShown: false,
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
        
            const strokeColor = focused ? activeTabColor : inactiveTabColor;
            return HomeIcon ? (
              <HomeIcon
                width={iconSize}
                height={iconSize}
                stroke={strokeColor}
                fill={focused ? activeTabColor : 'none'} // Fill color for the icon
              />
            ) : (
              <Text style={{ color: strokeColor }}>?</Text> // Fallback
            );
          }
        }}
      />
     <Tabs.Screen
        name="chat" // Corresponds to app/chat.tsx
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => {
            const strokeColor = focused ? activeTabColor : inactiveTabColor;
            return ChatIcon ? (
              <ChatIcon
                width={iconSize}
                height={iconSize}
                stroke={strokeColor} 
                fill={focused ? activeTabColor : 'none'}
              />
            ) : (
              <Text style={{ color: strokeColor }}>?</Text> // Fallback
            );
          }
        }}
      />
      <Tabs.Screen
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => {
        
            const strokeColor = focused ? activeTabColor : inactiveTabColor;
            return ProfileIcon ? (
              <ProfileIcon
                width={iconSize}
                height={iconSize}
                stroke={strokeColor}
                fill={focused ? activeTabColor : 'none'}
              />
            ) : (
              <Text style={{ color: strokeColor }}>?</Text> // Fallback
            );
          }
        }}
      />
    </Tabs>
  );
}
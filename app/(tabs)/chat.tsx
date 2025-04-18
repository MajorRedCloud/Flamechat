import React, { useState, useCallback, useEffect } from 'react';
import {StatusBar, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform  } from 'react-native';
import { GiftedChat, IMessage, User, Bubble, InputToolbar, Composer, Send } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { getReplyFromServer } from '@/lib/serverActions';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the structure for our user objects
interface ChatUser extends User {
    _id: string | number;
    name?: string;
    avatar?: string;
}

// --- User Definitions (assistantUser, currentUser) remain the same ---
const assistantUser: ChatUser = {
    _id: 2,
    name: 'Assistant',
    avatar: 'https://gravatar.com/avatar/b470aa3380645d168de8491c3a959eb5?s=400&d=retro&r=x',
};

const currentUser: ChatUser = {
    _id: 1,
    name: 'Demo'
};

// Define hex colors for easier use in style props
const COLORS = {
    background: '#000000', // gray-950
    userBubble: '#111827', // gray-700
    assistantBubble: '#000000', // gray-950 (same as background)
    textWhite: '#FFFFFF',
    textGray: '#D1D5DB', // gray-300
    inputBackground: '#111827', // gray-900
    sendButton: '#3B82F6', // blue-500
    placeholderGray: '#6B7280', // gray-500
};

const ChatScreen = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [sessionId, setSessionId] = useState(null)

    useEffect(() => {
        setMessages([
            {
                _id: Math.random().toString(36).substring(7),
                text: 'Hello! How can I help you with booking or company policy today?',
                createdAt: new Date(),
                user: assistantUser,
            },
        ]);
    }, []);

    const onSend = useCallback(async (newMessages: IMessage[] = []) => {

        // 1. Append the user's message immediately
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );

         // 2. Set the typing indicator to true
         setIsTyping(true);
         setIsLoading(true);

        //  3. Create JSON payload
        const userM = newMessages[0].text
        const payload = sessionId === null ? 
        {
            "query": userM
        } : {
            "query": userM,
            "sessionId": sessionId
        }

        try {
            // 4. Call the server action to get a response
            const reply = await getReplyFromServer(payload)

            // 5. Set sessionId 
            setSessionId(reply.session_id)
            
            // 6. Create the assistant's message object
            const assistantMessage: IMessage = {
                _id: Math.random().toString(36).substring(7), // Generate unique ID
                text: reply.reply,
                createdAt: new Date(),
                user: assistantUser, // Use the predefined assistant user
            };

            // 7. Append the assistant's message
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [assistantMessage])
            );

        } catch (error) {
            console.error("Error sending message:", error);
            // Handle error gracefully
            const assistantMessage: IMessage = {
                _id: Math.random().toString(36).substring(7), // Generate unique ID
                text: "Sorry, there was trouble connecting to the server. Please check your internet and try again.",
                createdAt: new Date(),
                user: assistantUser, // Use the predefined assistant user
            };
            // Append the assistant's message
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [assistantMessage])
            );
        } finally {
            // 8. Set the typing indicator and loading back to false
            setIsTyping(false);
            setIsLoading(false);
        }
        
    }, []);

    // Custom Bubble Rendering
    const renderBubble = (props: Readonly<Bubble['props']>) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        // Assistant bubble matches background
                        backgroundColor: COLORS.assistantBubble,
                        
                    },
                    right: {
                        // User bubble is darker gray
                        backgroundColor: COLORS.userBubble,
                        paddingVertical: 4,
                        paddingHorizontal: 8
                    },
                }}
                textStyle={{
                    left: {
                        // Assistant text is white
                        fontSize: 15,
                        color: COLORS.textWhite,
                    },
                    right: {
                        // User text is white
                        fontSize: 15,
                        color: COLORS.textWhite,
                        lineHeight: 22
                    },
                }}
                // Optional: modify time text style
                timeTextStyle={{
                  left: { color: COLORS.textGray, height: 0 },
                  right: { color: COLORS.textGray, height: 0 },
              }}
                 // Optional: modify username style
                 usernameStyle={{
                    color: COLORS.textGray, // Adjust as needed
                    fontWeight: '500'
                 }}
            />
        );
    };

    // Custom Input Toolbar Rendering
    const renderInputToolbar = (props: Readonly<InputToolbar['props']>) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: 'black', // Match screen background
                    borderTopWidth: 0,
                    paddingHorizontal: 12, // Add some horizontal padding
                    paddingVertical: 8,   // Add some vertical padding
                }}
                primaryStyle={{ alignItems: 'center' }} // Align items vertically
            />
        );
    };

    // Custom Composer (Text Input) Rendering
    const renderComposer = (props: Readonly<Composer['props']>) => {
        return (
            <View className="flex-1 flex-row bg-gray-900 rounded-full items-center px-3 mr-2">
                 <Composer
                    {...props}
                    textInputStyle={{
                        color: COLORS.textWhite,
                        lineHeight: 20, // Adjust line height if needed
                        paddingTop: 8, // Fine-tune vertical alignment
                        paddingBottom: 8,
                        marginLeft: 5, // Space between potential icon and text
                    }}
                    placeholderTextColor={COLORS.placeholderGray} // Style the placeholder
                 />
                {/* You could add an icon inside the composer View here if desired */}
                <Ionicons name="add-circle-outline" size={24} color={COLORS.placeholderGray} style={{ marginLeft: 5 }} />
            </View>

        );
    };

    // Custom Send Button Rendering
    const renderSend = (props: Readonly<Send['props']>) => {
        // Only render if there is text
             return (
                <TouchableOpacity
                    className="bg-white rounded-full w-9 h-9 justify-center items-center mx-1" // Use NativeWind for styling
                    onPress={() => props.onSend?.({ text: props.text.trim() }, true)} // Call original onSend
                    accessibilityLabel="Send message"
                    disabled={!props.text?.trim()}
                >
                    <Ionicons name="arrow-up" size={20}  color={props.text?.trim() ? '#000000' : COLORS.placeholderGray} />
                </TouchableOpacity>
            );
    };



    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={currentUser}
                    placeholder='Ask the bot...' // Shortened placeholder
                    renderAvatarOnTop={true}
                    alwaysShowSend={true} // Keep send button space visible
                    isTyping={isTyping}

                    // --- Custom Render Props ---
                    renderBubble={renderBubble}
                    renderInputToolbar={renderInputToolbar}
                    renderComposer={renderComposer}
                    renderSend={renderSend}
                    // --- ---
                />
        </SafeAreaView>
    );
};

export default ChatScreen;

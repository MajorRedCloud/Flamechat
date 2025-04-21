import React, { useState, useCallback, useEffect } from 'react';
import {StatusBar, View, Text, TouchableOpacity} from 'react-native';
import { GiftedChat, IMessage, User, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { getReplyFromServer } from '@/lib/serverActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import BookingDetailsModal from '@/components/BookingDetailsModal';
import { parseBookingDetails } from '@/constants';
import { BookingDetails } from '@/types';

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
    // avatar: 'https://gravatar.com/avatar/b470aa3380645d168de8491c3a959eb5?s=400&d=retro&r=x',
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
    red: '#ef4444', // red-500
};

const ChatScreen = () => {
    console.log("ChatScreen: Rendering... v2"); // <-- Add log entry
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [sessionId, setSessionId] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

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


    const onSend = async (newMessages: IMessage[] = []) => {

        console.log("onSend: Started"); // <-- Add
        // 1. Append the user's message immediately
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
        console.log("onSend: User message appended");

         // 2. Set the typing indicator to true
         setIsTyping(true);
         setIsLoading(true);
         console.log("onSend: Loading states set"); // <-- Add


        //  3. Create JSON payload
        const userM = newMessages[0].text
        const payload = sessionId === null ? 
        {
            "query": userM
        } : {
            "query": userM,
            "session_id": sessionId
        }
        console.log("onSend: Payload created:", JSON.stringify(payload)); // <-- Add/Verify

        try {
            console.log("onSend: Calling getReplyFromServer..."); // <-- Add
            // 4. Call the server action to get a response
            const reply = await getReplyFromServer(payload)
            console.log("onSend: Received raw reply:", JSON.stringify(reply)); // <-- VERY IMPORTANT

            // Check if reply is valid before proceeding
            if (reply && reply.reply && reply.session_id) {
                console.log("onSend: Reply structure valid."); // <-- Add

                // 5. Update session ID (using snake_case from backend)
                setSessionId(reply.session_id);
                console.log("onSend: Session ID set to:", reply.session_id); // <-- Add

                // booking detection
                const replyText = reply.reply;
                const isBookingConfirmed =
                    replyText.includes("Success!") &&
                    replyText.includes("ID")
                console.log("onSend: Booking check done. Confirmed:", isBookingConfirmed); // <-- Add


                if (isBookingConfirmed) {
                    // --- Call the parsing function ---
                    console.log("onSend: Processing booking confirmation..."); // <-- Add
                    const details: BookingDetails = parseBookingDetails(replyText);
                    setBookingDetails(details);
                    setIsModalVisible(true); 
                    console.log("onSend: Booking details and modal visibility set."); // <-- Add
                }

                // 6. Create assistant message
                const assistantMessage: IMessage = {
                    _id: Math.random().toString(36).substring(7),
                    text: reply.reply,
                    createdAt: new Date(),
                    user: assistantUser,
                };
                console.log("onSend: Assistant message object created."); // <-- Add

                // 7. Append assistant's message
                setMessages((previousMessages) =>
                    GiftedChat.append(previousMessages, [assistantMessage])
                );
                console.log("onSend: Assistant message appended."); // <-- Add

                // ---> 8. Trigger Haptic Feedback AFTER assistant message is added <---
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                // Or: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                console.log("onSend: Success haptic triggered."); // <-- Add

            } else {
                // Handle cases where reply is missing expected data
                
                console.error("Invalid reply structure received:", reply);
                // Optionally add an error message to the chat UI here
                setMessages((previousMessages) =>
                    GiftedChat.append(previousMessages, [{
                         _id: Math.random().toString(36).substring(7),
                         text: "Sorry, I received an unexpected response.",
                         createdAt: new Date(),
                         user: assistantUser,
                    }])
                );
            }

        } catch (error) {
            console.error("onSend: Error caught:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
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
            console.log("onSend: Finally block executing."); // <-- Add
            // 8. Set the typing indicator and loading back to false
            setIsTyping(false);
            setIsLoading(false);
            console.log("onSend: Loading states reset."); // <-- Add
        }

        console.log("onSend: Finished."); // <-- Add
    }

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

        const handlePress = () => {
            // Trigger haptic feedback first
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            // Then call the original onSend function
            props.onSend?.({ text: props.text.trim() }, true);
        }
             return (
                <TouchableOpacity
                    className="bg-white rounded-full w-9 h-9 justify-center items-center mx-1" // Use NativeWind for styling
                    onPress={handlePress} // Call original onSend
                    accessibilityLabel="Send message"
                    disabled={!props.text?.trim()}
                >
                    <Ionicons name="arrow-up" size={20}  color={props.text?.trim() ? '#000000' : COLORS.placeholderGray} />
                </TouchableOpacity>
            );
    };

    // Custom Avatar Rendering Function
    const renderCustomAvatar = (props: Readonly<Avatar['props']>) => {
            // Check if the message is from the assistant user
            if (props.currentMessage?.user._id === assistantUser._id) {
              // Return null to hide the avatar for the assistant
              return null;
            }
            // For other users (like the current user), Gifted Chat usually
            // handles avatar visibility based on position (left/right).
            // Returning the default Avatar component allows default behavior for others.
            // If you want to hide ALL avatars, just return null here always.
            // return <Avatar {...props} />; // Use this line *if* you wanted default avatars for others
            return null; // This effectively hides avatars for everyone except assistant, if you used the line above.
                         // But since GiftedChat hides current user avatar often, this mostly hides assistant avatar.
    };

    // Clears the chat and resets the session ID
    const handleClearChat = () => {

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

        // Reset messages to the initial welcome message
        setMessages([
            {
                _id: Math.random().toString(36).substring(7),
                text: 'Hello! How can I help you with booking or company policy today?',
                createdAt: new Date(),
                user: assistantUser,
            },
        ]);
        // Reset session ID
        setSessionId(null);
        // Reset loading/typing states
        setIsLoading(false);
        setIsTyping(false);
        console.log("Chat cleared."); // Optional confirmation log
    };



    return (
        <SafeAreaView className="flex-1 bg-black px-2">
            <StatusBar barStyle="light-content" />
            
            {/* Header */}
            <View className="flex flex-row items-center justify-between px-3 py-2">
                {/* back button */}
                <TouchableOpacity onPress={() => {router.back();}}>
                    <Ionicons name="chevron-back" size={20} color={COLORS.textWhite} />
                </TouchableOpacity>

                {/* title */}
                <Text className="text-white text-lg font-bold">FlameChat</Text>

                {/* Delete Button */}
                <TouchableOpacity
                    onPress={handleClearChat}
                    className="my-2 rounded-md shadow"
                    activeOpacity={0.7}
                >
                   <Ionicons name="trash-outline" size={18} color={COLORS.red} />
                </TouchableOpacity>
            </View> 

                {/* Main chat view */}
                <View className='flex-1 '>
                  <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={currentUser}
                    placeholder='Ask the bot...' 
                    renderAvatarOnTop={true}
                    alwaysShowSend={true} 
                    isTyping={isTyping}

                    // --- Custom Render Props ---
                    renderBubble={renderBubble}
                    renderInputToolbar={renderInputToolbar}
                    renderComposer={renderComposer}
                    renderSend={renderSend}
                    renderAvatar={renderCustomAvatar}
                    // --- ---
                  />

                  {/* Loading Indicator Overlay */}
                    {/* {isLoading && (
                        <View
                            // Absolute positioning to overlay
                            style={StyleSheet.absoluteFill} // Shortcut for top:0, bottom:0, left:0, right:0
                            className="bg-black/50 justify-center items-center" // Semi-transparent background, centered
                        >
                            <ActivityIndicator size="large" color={COLORS.textWhite} />
                        </View>
                    )} */}
                </View>

                {/* Render Confirmation Modal */}
                <BookingDetailsModal
                    isModalVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    bookingDetails={bookingDetails}
                /> 

        </SafeAreaView>
    );
};

export default ChatScreen;

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ModalProps {
    isModalVisible: boolean,
    onClose: () => void,
    bookingDetails: BookingDetails | null
}

const BookingModal = ({isModalVisible, onClose, bookingDetails} : ModalProps) => {

    if (!bookingDetails) {
        return null;
    }

    return (
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
            >
                {/* Background Overlay */}
                <View className="flex-1 justify-center items-center bg-black/80 px-4">
           
                    {/* Content Box */}
                    <View className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md">

                        {/* Title */}
                        <Text className="text-white text-xl font-bold mb-5 text-center">
                            Booking Confirmation
                        </Text>
            
                         {/* Details Section - Conditionally render each piece */}
                        {bookingDetails.id && (
                            <View className="flex-row mb-2">
                                <Text className="text-gray-400 w-28">Booking ID:</Text>
                                <Text className="text-white flex-1 font-medium">{bookingDetails.id}</Text>
                            </View>
                        )}
                        {bookingDetails.name && (
                            <View className="flex-row mb-2">
                                <Text className="text-gray-400 w-28">Name:</Text>
                                <Text className="text-white flex-1 font-medium">{bookingDetails.name}</Text>
                            </View>
                        )}
                        {bookingDetails.dateTimeString && (
                            <View className="flex-row mb-2">
                                <Text className="text-gray-400 w-28">Appointment:</Text>
                                <Text className="text-white flex-1 font-medium">{bookingDetails.dateTimeString}</Text>
                            </View>
                        )}
                        {bookingDetails.createdAt && (
                            <View className="flex-row mb-4">
                                <Text className="text-gray-400 w-28">Confirmed At:</Text>
                                <Text className="text-white flex-1 font-medium">{bookingDetails.createdAt}</Text>
                            </View>
                        )}

                    {/* Separator Line (Optional) */}
                     <View className="border-b border-gray-600 mb-4" />

                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-purple-400 py-3 px-6 rounded-md mt-2 self-center shadow"
                        activeOpacity={0.7}
                    >
                        <Text className="text-white font-semibold text-center text-base">Okay!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal> 
    );
  };

export default BookingModal;
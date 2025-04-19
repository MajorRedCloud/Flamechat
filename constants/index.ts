// --- Helper Function for Parsing Booking Details ---
export const parseBookingDetails = (botReplyText: string): BookingDetails => {
    // Initialize details with null values
    let extractedId: string | null = null;
    let extractedName: string | null = null;
    let extractedDateTime: string | null = null;
    // Use current time for 'createdAt' as backend doesn't provide it
    let extractedCreatedAt: string | null = new Date().toLocaleString();

    try {
        // Extract ID (Simple Parsing)
        const idPrefix = "ID: ";
        let idStartIndex = botReplyText.indexOf(idPrefix);
        if (idStartIndex !== -1) {
            idStartIndex += idPrefix.length;
            let idEndIndex = botReplyText.indexOf("\n", idStartIndex);
            if (idEndIndex === -1) idEndIndex = botReplyText.length; // Handle if it's the last line
            extractedId = botReplyText.substring(idStartIndex, idEndIndex).trim();
        }

        // Extract Name (Simple Parsing - assumes "for [Name] starting around")
        const namePrefix = "for ";
        const nameSuffix = " starting around";
        let nameStartIndex = botReplyText.indexOf(namePrefix);
        let nameEndIndex = botReplyText.indexOf(nameSuffix);
        if (nameStartIndex !== -1 && nameEndIndex > nameStartIndex) {
            nameStartIndex += namePrefix.length;
            extractedName = botReplyText.substring(nameStartIndex, nameEndIndex).trim();
        }

        // Extract DateTime (Simple Parsing - assumes "starting around [DateTime]")
        const dateTimePrefix = "starting around ";
        let dateTimeStartIndex = botReplyText.indexOf(dateTimePrefix);
        if (dateTimeStartIndex !== -1) {
            dateTimeStartIndex += dateTimePrefix.length;
            // Assuming date/time goes to the end or next newline
            let dateTimeEndIndex = botReplyText.indexOf("\n", dateTimeStartIndex);
            if (dateTimeEndIndex === -1) dateTimeEndIndex = botReplyText.length;
            extractedDateTime = botReplyText.substring(dateTimeStartIndex, dateTimeEndIndex).trim();
        }

    } catch (parseError) {
        console.error("Error parsing booking details:", parseError);
        // Return details object with potentially null values if parsing failed
    }

    // Return the structured details object
    return {
        id: extractedId,
        name: extractedName,
        dateTimeString: extractedDateTime,
        createdAt: extractedCreatedAt
    };
};
// --- End Helper Function ---

// --- BookingDetails Interface (ensure it's defined before ChatScreen) ---
interface BookingDetails {
  id: string | null;
  name: string | null;
  dateTimeString: string | null;
  createdAt: string | null;
}

// const ChatScreen = () => { ... } // Your component starts below
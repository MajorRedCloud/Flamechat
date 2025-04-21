interface PayloadProps {
    query: string,
    sessionId?: string
}

export const getReplyFromServer = async (payload : PayloadProps) => {
    console.log("serverActions: getReplyFromServer called with payload:", JSON.stringify(payload)); // <-- Log entry and payload

    try {
        const apiUrl = "https://flask-backend-vercel.vercel.app/chat";
        console.log("serverActions: Attempting fetch to:", apiUrl); // <-- Log URL

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        console.log("serverActions: Fetch response received. Status:", response.status, "Ok:", response.ok); // <-- Log status

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error response:", errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'No error message'}`);
        }

        console.log("serverActions: Attempting to parse JSON response..."); // <-- Log before JSON parsing
        
        const data = await response.json()

        console.log("serverActions: JSON parsed successfully:", JSON.stringify(data)); // <-- Log parsed data

        return data

    } catch (error) {
        console.error("serverActions: Error caught in getReplyFromServer:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        throw error;
    }


}
interface PayloadProps {
    query: string,
    sessionId?: string
}

export const getReplyFromServer = async (payload : PayloadProps) => {
    try {
        const response = await fetch("https://flask-backend-vercel.vercel.app/chat", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error response:", errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'No error message'}`);
        }
        
        const data = await response.json()
        return data

    } catch (error) {
        console.error("Error fetching reply from server:", error);
        throw error;
    }


}
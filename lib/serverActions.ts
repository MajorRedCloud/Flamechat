interface PayloadProps {
    query: string,
    sessionId?: string
}

export const getReplyFromServer = async (payload : PayloadProps) => {

    try {
        const apiUrl = "https://flask-backend-vercel.vercel.app/chat";

        const response = await fetch(apiUrl, {
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
        console.error("serverActions: Error caught in getReplyFromServer:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        throw error;
    }


}
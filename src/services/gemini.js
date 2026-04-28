const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `You are an AI customer service representative named Nova. 
Your tone should be helpful, professional, polite, and concise. 
You are here to assist the customer with their queries, provide clear answers, and ensure a positive experience.
If you don't know the answer to a specific account-related question, politely inform the user that they should contact human support at support@example.com.`;

async function fetchWithModel(modelName, contents, retries = 3) {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error?.message || 'Failed to fetch response from Gemini';
        
        // If it's a server overload error and we have retries left, throw to trigger the catch block retry
        if (response.status === 503 || errorMsg.includes("high demand") || errorMsg.includes("overloaded")) {
          throw new Error(`OVERLOAD:${errorMsg}`);
        }
        
        // If it's a hard error (like bad API key), throw normally to break the loop
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (err) {
      // Only retry if it's our specific overload error and we aren't on the last attempt
      if (err.message.startsWith("OVERLOAD:") && i < retries - 1) {
        console.log(`Google API overloaded. Retrying in ${1.5 * (i + 1)} seconds... (Attempt ${i + 1} of ${retries - 1})`);
        await new Promise(resolve => setTimeout(resolve, 1500 * (i + 1))); // Wait 1.5s, then 3s, etc.
        continue;
      }
      
      // If we've exhausted retries or it's a different error, throw it completely
      throw new Error(err.message.replace("OVERLOAD:", ""));
    }
  }
}

export async function generateChatResponse(history, currentMessage) {
  if (!API_KEY) {
    throw new Error("Gemini API key is missing. Please add it to your .env file as VITE_GEMINI_API_KEY.");
  }

  // To prevent any strict sequence/history errors from Gemini (which expects conversations 
  // to start with 'user' and alternate perfectly), we will send the message one by one as requested.
  const contents = [
    {
      role: 'user',
      parts: [{ text: currentMessage }]
    }
  ];

  try {
    // We use gemini-2.0-flash as it is highly stable and less likely to hit the 503 demand errors
    const data = await fetchWithModel('gemini-2.5-flash', contents);

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No response generated.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Check if the error is due to high demand on Google's free tier
    if (error.message.includes("experiencing high demand") || error.message.includes("overloaded")) {
      throw new Error("Google's free Gemini API is currently experiencing high demand. Please wait a moment and try sending your message again.");
    }

    throw error;
  }
}

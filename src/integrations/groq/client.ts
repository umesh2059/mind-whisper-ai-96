import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.warn(
    "Warning: VITE_GROQ_API_KEY is not set in .env. Groq integration will not work."
  );
}

const client = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const getGroqResponse = async (userMessage: string): Promise<string> => {
  try {
    
    const message = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      messages: [
        {
          role: "system",          // ✅ Move system prompt here
          content: `You are MindfulAI, a compassionate mental health support chatbot. 
            Your role is to listen empathetically, provide emotional validation, and offer helpful coping strategies.
            - Respond warmly and supportively
            - Use appropriate emojis to convey empathy
            - Suggest practical coping techniques like breathing exercises, grounding techniques, or mindfulness
            - Always remind that you're an AI and not a substitute for professional therapy
            - If someone mentions crisis situations (suicide, self-harm), prioritize safety and suggest crisis hotlines
            Keep responses concise and engaging (2-3 paragraphs max).`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    if (message.choices && message.choices.length > 0) {
      const content = message.choices[0].message.content;
      if (content) {
        return content;
      }
    }

    return "I'm having trouble processing your message. Could you try again?";
  } catch (error) {
    console.error("Groq API error:", error);
    throw new Error("Failed to get response from Groq");
  }
};
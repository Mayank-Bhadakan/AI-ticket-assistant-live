// import { createAgent, gemini } from "@inngest/agent-kit";

// const analyzeTicket = async (ticket) => {
//   const supportAgent = createAgent({
//     model: gemini({
//       model: "gemini-2.5-flash",
//       apiKey: process.env.GEMINI_API_KEY,
//     }),
//     name: "AI Ticket Triage Assistant",
//     system: `You are an expert AI assistant that processes technical support tickets. 

// Your job is to:
// 1. Summarize the issue.
// 2. Estimate its priority.
// 3. Provide helpful notes and resource links for human moderators.
// 4. List relevant technical skills required.

// IMPORTANT:
// - Respond with *only* valid raw JSON.
// - Do NOT include markdown, code fences, comments, or any extra formatting
// - The format must be a raw JSON object.

// Repeat: Do not wrap your output in markdown or code fences.`,
//   });

//   const response =
//     await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
// Analyze the following support ticket and provide a JSON object with:

// - summary: A short 1-2 sentence summary of the issue.
// - priority: One of "low", "medium", or "high".
// - helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
// - relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

// Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

// {
// "summary": "Short summary of the ticket",
// "priority": "high",
// "helpfulNotes": "Here are useful tips...",
// "relatedSkills": ["React", "Node.js"]
// }

// ---

// Ticket information:

// - Title: ${ticket.title}
// - Description: ${ticket.description}`); 

// console.log("🔍 Raw Gemini Response:", response);

// if (!process.env.GEMINI_API_KEY) {
//   console.log("❌ GEMINI_API_KEY missing");
//   return null;
// }

  
//   if (!response?.output?.[0]?.content) {
//     console.log("❌ Gemini returned invalid response:", response);
//     return null;
//   }

//   const raw = response.output[0].content;

//   console.log("AI RAW RESPONSE:", JSON.stringify(response, null, 2));

//   try {
//     const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
//     const jsonString = match ? match[1] : raw.trim();
//     return JSON.parse(jsonString);
//   } catch (e) {
//     console.log("Failed to parse JSON from AI response" + e.message);
//     return null; // watch out for this
//   }
// };

// export default analyzeTicket;

//////////////////////////////////// ADDING GEMINI SDK HERE ////////////////////////////////////////////

import { GoogleGenAI } from "@google/genai";

const analyzeTicket = async (ticket) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("❌ GEMINI_API_KEY missing");
      return null;
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
Analyze this support ticket and respond ONLY with valid JSON.

Return:
{
  "summary": "Short summary",
  "priority": "low | medium | high",
  "helpfulNotes": "Detailed technical explanation",
  "relatedSkills": ["Skill1", "Skill2"]
}

Ticket:
Title: ${ticket.title}
Description: ${ticket.description}
`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    const text = response.text;

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.log("❌ No JSON found in Gemini response");
      return null;
    }

    return JSON.parse(match[0]);

  } catch (err) {
    console.log("❌ Gemini Error:", err.message);
    return null;
  }
};

export default analyzeTicket;

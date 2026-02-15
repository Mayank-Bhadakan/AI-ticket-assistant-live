import { Inngest } from "inngest";

export const inngest = new Inngest({ 
    id: "ai-ticket-app",
    eventKey: process.env.INNGEST_EVENT_KEY,
});

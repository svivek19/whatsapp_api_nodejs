require("dotenv").config();
const axios = require("axios");

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONENUMBER_ID = process.env.PHONENUMBER_ID;

const RECIPIENTS = [
  { number: "919361758471", name: "Vivek" },
  { number: "917603857110", name: "Nirmal" },
  { number: "918637468236", name: "Praveen" },
  { number: "919790112364", name: "Sakthi" },
  { number: "916369725985", name: "Sri Ramu" },
  { number: "917418831620", name: "Mukesh" },
  { number: "918508023007", name: "Syed" },
  { number: "919342836860", name: "Saravanan" },
];

function buildBody(name = "there") {
  return `Good morning, ${name},\n\nThis is a test message from Meta confirming that billing notifications, bug and error alerts, template‑validation windows, and the 24‑hour session‑expiry period are all being delivered correctly.`;
}

async function sendTextMessage(to, body) {
  try {
    const { data } = await axios.post(
      `https://graph.facebook.com/v22.0/${PHONENUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Sent to ${to}: ${data.messages?.[0]?.id}`);
  } catch (err) {
    console.error(`Failed for ${to}:`, err.response?.data || err.message);
  }
}

async function sendToAll() {
  for (const [i, { number, name }] of RECIPIENTS.entries()) {
    await sendTextMessage(number, buildBody(name));
    if (i < RECIPIENTS.length - 1) {
      await new Promise((r) => setTimeout(r, 6000));
    }
  }
}

sendToAll();

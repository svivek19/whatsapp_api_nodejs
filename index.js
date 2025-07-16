require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron");

const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONENUMBER_ID = process.env.PHONENUMBER_ID;
const WHATSAPP_API_URL = `https://graph.facebook.com/v22.0/${PHONENUMBER_ID}/messages`;

const employees = [{ name: "Vivek", number: "" }];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendWhatsAppTemplate = async (name, number) => {
  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: "whatsapp",
        to: number,
        type: "template",
        template: {
          name: "greetqsis",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: name,
                },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[${new Date().toLocaleString()}]  Message sent to ${name}`);
  } catch (error) {
    console.error(
      `[${new Date().toLocaleString()}]  Error sending to ${name}:`,
      error.response?.data || error.message
    );
  }
};

const sendMessagesSequentially = async () => {
  for (let employee of employees) {
    await sendWhatsAppTemplate(employee.name, employee.number);
    await sleep(5000);
  }
};

cron.schedule("30 4 * * *", () => {
  console.log(`[${new Date().toLocaleString()}] Triggered 10:00 AM IST task`);
  sendMessagesSequentially();
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

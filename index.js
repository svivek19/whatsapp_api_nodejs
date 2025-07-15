require("dotenv").config();
const axios = require("axios");

const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONENUMBER_ID = process.env.PHONENUMBER_ID;

const WHATSAPP_API_URL = `https://graph.facebook.com/v22.0/${PHONENUMBER_ID}/messages`;

const sendWhatsAppTemplate = async () => {
  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: "whatsapp",
        to: "919361758471",
        type: "template",
        template: {
          name: "testingqsis",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: "Vivek",
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

    console.log("Message sent:", response.data);
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
  }
};

sendWhatsAppTemplate();

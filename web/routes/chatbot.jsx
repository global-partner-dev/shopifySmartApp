import React, { useState } from "react";
import { Page, Layout, Card, TextField, Button, BlockStack, Box, Text } from "@shopify/polaris";

export default function ChatbotPage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Placeholder for send message functionality
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const [chatHistory, setChatHistory] = useState("Chat window placeholder - messages will appear here")
  return (
    <Page title="Chatbot">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Chat Interface
              </Text>
              
              <Box
                background="bg-surface-secondary"
                padding="400"
                borderRadius="200"
                minHeight="300px"
              >
                <Text as="p" variant="bodyMd" tone="subdued">
                  {chatHistory}
                </Text>
              </Box>
              
              <BlockStack gap="200">
                <TextField
                  label=""
                  placeholder="Type a message..."
                  value={message}
                  onChange={setMessage}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                />
                <Button
                  variant="primary"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  Send
                </Button>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
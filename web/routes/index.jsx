import React from "react";
import {
  Page,
  Layout,
  LegacyCard,
  Text,
  BlockStack,
  Box,
  Banner,
  Icon,
  InlineStack,
  Button
} from "@shopify/polaris";
import { CheckIcon, WandIcon, ChartVerticalFilledIcon ,OutdentIcon } from "@shopify/polaris-icons";

export default function HomePage() {
  return (
    <Page title="Welcome Page">
      <BlockStack gap="8">
        {/* Section 1: Connection Success */}
        <Layout>
          <Layout.Section>
            <Banner
              title="Connection Successful"
              status="success"
              icon={CheckIcon}
            >
                <Button icon={OutdentIcon} url="/dashboard">Go To Dashboard</Button>
            </Banner>
          </Layout.Section>
        </Layout>

        {/* Section 2: Welcome Message */}
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <BlockStack gap="4">
                <InlineStack gap="4" align="center">
                  <Text variant="headingLg" as="h2">
                    Welcome to Smart App
                  </Text>
                </InlineStack>
                <Text variant="bodyLg" as="p">
                  We warmly welcome you to this app.
                </Text>
              </BlockStack>
            </LegacyCard>
          </Layout.Section>
        </Layout>

        {/* Section 3: App Description */}
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <BlockStack gap="4">
                <InlineStack gap="4" align="center">
                  <Text variant="headingLg" as="h2">
                    About Our Smart App
                  </Text>
                </InlineStack>
                <BlockStack gap="4">
                  <Text variant="bodyLg" as="p">
                    We have developed a smart app that integrates with Shopify. This app uses artificial intelligence to analyze product and sales data, categorize products by rotation, understand customer behavior, and accurately suggest quantities to produce or restock.
                  </Text>
                  <Text variant="bodyLg" as="p">
                    Key Features:
                  </Text>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li>
                      <Text variant="bodyMd" as="span">Comprehensive dashboard for data visualization</Text>
                    </li>
                    <li>
                      <Text variant="bodyMd" as="span">AI-powered conversational assistant</Text>
                    </li>
                    <li>
                      <Text variant="bodyMd" as="span">Smart push notifications</Text>
                    </li>
                    <li>
                      <Text variant="bodyMd" as="span">Multi-store support</Text>
                    </li>
                    <li>
                      <Text variant="bodyMd" as="span">Seamless integration with any Shopify store</Text>
                    </li>
                  </ul>
                  <Text variant="bodyLg" as="p" tone="success">
                    Enjoy this app and transform your Shopify store management experience!
                  </Text>
                </BlockStack>
              </BlockStack>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}


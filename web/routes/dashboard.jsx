import React, { useState } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  Text,
  BlockStack,
  Box,
  Banner,
  LegacyStack,
  ButtonGroup,
  Button,
  Divider,
  Select,
  Tag,
  InlineStack,
  DataTable,
  TextField,
  ChoiceList,
  useIndexResourceState,
  IndexTable,
} from "@shopify/polaris";
import { Frame, Modal, TextContainer } from '@shopify/polaris';
import { useCallback } from 'react';
import { ChartLineIcon } from '@shopify/polaris-icons';
import { DeliveryIcon, EditIcon } from '@shopify/polaris-icons';
import { ChartHistogramFirstIcon } from '@shopify/polaris-icons';
import "../styles/dashboard.css"

import DailySalesChart from "../components/DailySalesChart";
import HourlySalesChart from "../components/HourlySalesChart";
import WeeklySalesTinyBarChart from "../components/WeeklySalesTinyBarChart";
import CustomActiveShapePieChart from "../components/CustomActiveShapePieChart";

export default function DashboardPage() {


  const [active, setActive] = useState(false);  // this is active value of Modal window

  const [analysisOption, setAnalysisOption] = useState(); //this is check list of analysis & export as CSV file
  const handleChange = useCallback(() => setActive(!active), [active]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [dailySales, setDailySales] = useState(0);
  const [weeklySales, setWeeklySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0)


  return (
    <Page
      fullWidth
      title="Dashboard"
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Total Products" sectioned>
            <Text variant="heading2xl" as="h3">
              {totalProducts}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Daily Sales" sectioned>
            <Text variant="heading2xl" as="h3">
              ${dailySales}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Weekly Sales" sectioned>
            <Text variant="heading2xl" as="h3">
              ${weeklySales}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Monthly Sales" sectioned>
            <Text variant="heading2xl" as="h3">
              ${monthlySales}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <div className="mainButtonGroup">
            <div className="dashboardButtonGroup">
              <Button size="large" variant="primary" tone="success" icon={EditIcon} url="/dashboard/totalanalysis" fullWidth> Manual Panel</Button>
              <Button size="large" variant="primary" tone="critical" icon={ChartLineIcon} onClick={handleChange} fullWidth> Analysis & Export</Button>
            </div>
            <Button size="large" variant="secondary" url="/dashboard/top10products" icon={ChartHistogramFirstIcon} fullWidth> Top 10 Products by Sales</Button>
            <Button size="large" variant="primary" url="/dashboard/backorderandfulfillment" icon={DeliveryIcon} fullWidth> BackOrder & Fulfillment</Button>
          </div>
        </Layout.Section>
      </Layout>
      <Divider />

      <Layout>
        <Layout.Section variant="oneThird">
          <HourlySalesChart />
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <DailySalesChart />
        </Layout.Section>
      </Layout>
      <Layout>
        <Layout.Section variant="oneThird">
          <WeeklySalesTinyBarChart />
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <CustomActiveShapePieChart />
        </Layout.Section>
      </Layout>
      {active && (
        <Modal
          open={active}
          onClose={handleChange}
          title="Select the item you wish to submit"
          primaryAction={{
            content: 'Export as CSV File',
            onAction: handleChange,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <ChoiceList
                title="Export Prediction by:"
                choices={[
                  { label: 'Supplier', value: 'supplier' },
                  { label: 'Size', value: 'size' },
                  { label: 'Category', value: 'category' },
                  { label: 'Product', value: 'product' },
                ]}
                selected={analysisOption ? [analysisOption] : []}
                onChange={(e) => setAnalysisOption(e[0])}
              />
            </TextContainer>
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
}



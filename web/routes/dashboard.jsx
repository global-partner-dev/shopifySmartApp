import React, { useState, useEffect } from "react";
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
import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";

import DailySalesChart from "../components/DailySalesChart";
import HourlySalesChart from "../components/HourlySalesChart";
import WeeklySalesTinyBarChart from "../components/WeeklySalesTinyBarChart";
import CustomActiveShapePieChart from "../components/CustomActiveShapePieChart";

export default function DashboardPage() {

  const [active, setActive] = useState(false);  // this is active value of Modal window

  const [analysisOption, setAnalysisOption] = useState(); //this is check list of analysis & export as CSV file
  const handleChange = useCallback(() => setActive(!active), [active]);

  // Fetch all products with variants and order line items
  const [{ data: products, fetching, error }] = useFindMany(api.shopifyProduct, {
    first: 250,
    filter: { status: { equals: "active" } },
    select: {
      id: true,
      variants: {
        edges: {
          node: {
            orderLineItems: {
              edges: {
                node: {
                  quantity: true,
                  price: true,
                  createdAt: true,
                }
              }
            }
          }
        }
      }
    }
  });

  const [totalProducts, setTotalProducts] = useState(0);
  const [dailySales, setDailySales] = useState(0);
  const [weeklySales, setWeeklySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);

  useEffect(() => {
    if (!products) return;

    setTotalProducts(products.length);

    let daily = 0, weekly = 0, monthly = 0;
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    products.forEach(product => {
      if (product.variants?.edges) {
        product.variants.edges.forEach(variantEdge => {
          const variant = variantEdge.node;
          if (variant.orderLineItems?.edges) {
            variant.orderLineItems.edges.forEach(lineItemEdge => {
              const lineItem = lineItemEdge.node;
              const createdAt = new Date(lineItem.createdAt);
              const revenue = (lineItem.quantity || 0) * parseFloat(lineItem.price || 0);

              if (createdAt >= startOfDay) daily += revenue;
              if (createdAt >= startOfWeek) weekly += revenue;
              if (createdAt >= startOfMonth) monthly += revenue;
            });
          }
        });
      }
    });

    setDailySales(daily);
    setWeeklySales(weekly);
    setMonthlySales(monthly);
  }, [products]);

  return (
    <Page
      fullWidth
      title="Dashboard"
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <LegacyCard title="All Product Types On Sale" sectioned>
            <Text variant="heading2xl" as="h3">
              {totalProducts}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Daily Sales" sectioned>
            <Text variant="heading2xl" as="h3">
              ${dailySales.toFixed(2)}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Weekly Sales" sectioned>
            <Text variant="heading2xl" as="h3">
              ${weeklySales.toFixed(2)}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Monthly Sales" sectioned>
            <Text variant="heading2xl" as="h3">
              ${monthlySales.toFixed(2)}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <div className="mainButtonGroup">
            <div className="dashboardButtonGroup">
              <Button size="large" variant="primary" tone="success" icon={EditIcon} url="/dashboard/totalanalysis" fullWidth> Manual Panel</Button>
              <Button size="large" variant="primary" tone="critical" icon={ChartLineIcon} onClick={handleChange} fullWidth> Analysis & Export</Button>
            </div>
            <div className="dashboardButtonGroup">
              <Button size="large" variant="secondary" tone="success" url="/dashboard/top10products" icon={ChartHistogramFirstIcon} fullWidth> Top 10 Products</Button>
              <Button size="large" variant="secondary" tone="critical" url="/dashboard/low10products" icon={ChartHistogramFirstIcon} fullWidth> Low 10 Products</Button>
            </div>
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



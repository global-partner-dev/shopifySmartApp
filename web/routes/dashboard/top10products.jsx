import React, { useState, useEffect } from "react";
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
  DataTable,
  Button,
  ButtonGroup
} from "@shopify/polaris";
import { CheckSmallIcon, OutdentIcon, ChartVerticalFilledIcon} from "@shopify/polaris-icons";
import { useFindMany } from "@gadgetinc/react";
import { api } from "../../api";


export default function Top10Products(){
  const [listData, setListData] = useState([]);

  // Fetch products with variants and order line items
  const [{ data: products, fetching, error }, refetch] = useFindMany(api.shopifyProduct, {
    first: 250,
    filter: {
      status: {
        equals: "active",
      },
    },
    select: {
      id: true,
      title: true,
      variants: {
        edges: {
          node: {
            id: true,
            sku: true,
            option1: true,
            option2: true,
            option3: true,
            inventoryQuantity: true,
            price: true,
            orderLineItems: {
              edges: {
                node: {
                  id: true,
                  quantity: true,
                  price: true
                }
              }
            }
          }
        }
      }
    },
    // first: 250 // Maximum allowed
  });

  useEffect(() => {
    if (products && products.length > 0) {
      // Process the data to create top 10 products by sales volume
      const processedData = [];
      
      products.forEach(product => {
        if (product.variants && product.variants.edges) {
          product.variants.edges.forEach(variantEdge => {
            const variant = variantEdge.node;
            
            // Calculate units sold from order line items
            let unitsSold = 0;
            let revenue = 0;
            
            if (variant.orderLineItems && variant.orderLineItems.edges) {
              variant.orderLineItems.edges.forEach(lineItemEdge => {
                const lineItem = lineItemEdge.node;
                unitsSold += lineItem.quantity || 0;
                revenue += (lineItem.quantity || 0) * parseFloat(lineItem.price || 0);
              });
            }
            
            // Create size/option display
            const options = [variant.option1, variant.option2, variant.option3]
              .filter(option => option && option.trim() !== '')
              .join(' / ') || 'Default';
            
            processedData.push({
              productName: product.title || 'Unknown Product',
              sku: variant.sku || 'N/A',
              sizeOption: options,
              inventoryQuantity: variant.inventoryQuantity || 0,
              unitsSold: unitsSold,
              revenue: revenue,
              variantId: variant.id
            });
          });
        }
      });
      
      // Sort by units sold in descending order and take top 10
      const top10 = processedData
        .sort((a, b) => b.unitsSold - a.unitsSold)
        .slice(0, 10);
      
      // Format data for DataTable
      const tableRows = top10.map((item, index) => [
        index + 1, // Rank
        item.productName,
        item.sku,
        item.sizeOption,
        item.inventoryQuantity,
        item.unitsSold,
        `$${item.revenue.toFixed(2)}`
      ]);
      
      setListData(tableRows);
    }
  }, [products]);

  return (
    <Page title="Top 10 Products by Units Sold (This Month)">
        {/* Section 1: Connection Success */}
        <Layout>
          <Layout.Section>
            <Banner
              title="Connection Successful"
              tone="success"
              icon={CheckSmallIcon}
            >
              <ButtonGroup>
                <Button icon={OutdentIcon} url="/dashboard">Dashboard</Button>
                <Button icon={ChartVerticalFilledIcon} >ExportCSV</Button>
              </ButtonGroup>
            </Banner>
          </Layout.Section>
        </Layout>

        {/* Section 2: table of top 10 products by selling month */}
        <Layout>
          <Layout.Section>
            <LegacyCard>
              {fetching && (
                <Box padding="400">
                  <Text as="p" variant="bodyMd">Loading product data...</Text>
                </Box>
              )}
              {error && (
                <Box padding="400">
                  <Banner tone="critical">
                    <Text as="p" variant="bodyMd">Error loading data: {error.message}</Text>
                  </Banner>
                </Box>
              )}
              {!fetching && !error && (
                <DataTable
                  columnContentTypes={[
                    'numeric',
                    'text',
                    'text',
                    'text',
                    'numeric',
                    'numeric',
                    'text',
                  ]}
                  headings={[
                    'Rank',
                    'Product Name',
                    'SKU',
                    'Size/Option',
                    'Inventory Qty',
                    'Units Sold',
                    'Revenue',
                  ]}
                  rows={listData}
                />
              )}
            </LegacyCard>
          </Layout.Section>
        </Layout>
    </Page>
  );
}


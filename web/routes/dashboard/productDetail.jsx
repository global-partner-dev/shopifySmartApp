import React from "react";
import { useParams } from "react-router";
import { useFindOne } from "@gadgetinc/react";
import { api } from "../../api";
import { 
  Page, 
  Card, 
  Text,
  Spinner, 
  Divider, 
  DataTable, 
  BlockStack, 
  InlineStack,
  Tag ,
  Layout,
  Banner,
  Button,
  ButtonGroup,
  Badge
} from "@shopify/polaris";

import { CheckSmallIcon, OutdentIcon, ChartVerticalFilledIcon} from "@shopify/polaris-icons";


import CustomAttributesEditor from "../../components/customAttributesEditor";
import ProductDetailMedia from "../../components/productDetailMedia";

export default function ProductDetail() {
  const { id } = useParams();
  const [{ data, fetching, error }] = useFindOne(api.shopifyProduct, id);

  console.log(data);

  if (fetching) return <Page><Spinner accessibilityLabel="Loading product" size="large" /></Page>;
  if (error) return <Page><Text tone="critical">Error: {error.message}</Text></Page>;
  if (!data) return <Page><Text>No product found.</Text></Page>;


  // Helper to safely render values
  const safeValue = (val) =>
    typeof val === "object" && val !== null
      ? JSON.stringify(val)
      : val ?? "-";

  // Prepare variant rows for DataTable
  const variantRows = (data.variants || []).map(v => [
    safeValue(v.title || v.option1 || v.id),
    safeValue(v.sku),
    safeValue(v.inventoryQuantity)
  ]);

  return (
    <Page title={`Product: ${safeValue(data.title) || safeValue(data.name) || safeValue(data.id)}`}>
      <Layout>
        <Layout.Section>
          <Banner
            title="Connection Successful"
            tone="success"
            icon={CheckSmallIcon}
          >
            <ButtonGroup>
              <Button icon={OutdentIcon} url="/dashboard/totalanalysis">Go Back</Button>
            </ButtonGroup>
          </Banner>
        </Layout.Section>
      </Layout>
      <BlockStack gap="6">
        <Layout>
          <Layout.Section variant="oneThird">  
            <Card>
              <ProductDetailMedia productId={data.id}/>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card sectioned>
              <Text variant="headingLg" as="h5" tone="critical">Product Information</Text>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 'bold', padding: 4 }}>Name</td>
                    <td style={{ padding: 4 }}>{safeValue(data.title) || safeValue(data.name)}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', padding: 4 }}>ID</td>
                    <td style={{ padding: 4 }}>{safeValue(data.id)}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', padding: 4 }}>Status</td>
                    <td style={{ padding: 4 }}>{safeValue(data.status)}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', padding: 4 }}>Vendor</td>
                    <td style={{ padding: 4 }}>{safeValue(data.vendor)}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', padding: 4 }}>Type</td>
                    <td style={{ padding: 4 }}>{safeValue(data.productType) || safeValue(data.category.name)}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Layout.Section>
        </Layout>
        <Card sectioned>
          <Text variant="headingLg" as="h5" tone="ciritical">Tags</Text>               
          <BlockStack gap="2">
            <InlineStack gap="2">
              {Array.isArray(data.tags) && data.tags.length > 0 && (
                <InlineStack gap="1">
                  {data.tags.map(tag => <Badge size="large" key={safeValue(tag)} tone="info">{safeValue(tag)}</Badge>)}
                </InlineStack>
              )}
            </InlineStack>
          </BlockStack>
        </Card>
        <Card sectioned>
          <Text variant="headingLg" as="h5" tone="critical">Description</Text>
          <Text >{<div style={{fontSize: "14px"}} dangerouslySetInnerHTML={{ __html: safeValue(data.body) }} /> || <span style={{ color: '#888' }}>(No description)</span>}</Text>
        </Card>
        <Card sectioned>
          <Text variant="headingLg" as="h5" tone="critical">Variants</Text>
          {variantRows.length > 0 ? (
            <DataTable
              columnContentTypes={['text', 'text', 'numeric']}
              headings={['Title', 'SKU', 'Inventory']}
              rows={variantRows}
            />
          ) : (
            <Text>No variants</Text>
          )}
        </Card>
        <Card sectioned>
          <Text variant="headingMd" as="h2">Metafields (Custom Attributes)</Text>
          <CustomAttributesEditor productId={data.id} />
        </Card>
      </BlockStack>
    </Page>
  );
}
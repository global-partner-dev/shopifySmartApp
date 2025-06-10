import React, {useState} from "react";
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

export default function BackorderAndFulfillment(){

  const rows = [
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],
    [ 'XYZ Supplies', '#1001', 'Red T-shirt', 'M' ,50, 50, 0, 'Fully Fulfilled', '2025-06-01', '2025-06-15' ],

  ];

  const [listData, setListData] = useState(rows);

  return (
    <Page title="Backorder & Fulfillment by Supplier" fullWidth>
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
              <DataTable
                columnContentTypes={[
                  'numeric',
                  'numeric',
                  'numeric',
                  'numeric',
                  'numeric',
                  'numeric',
                  'numeric',
                  'numeric',
                  'numeric',
                  'numeric',
                ]}
                headings={[
                  'SupplierName',
                  'OrderID',
                  'ProductName',
                  'Size',
                  'QuantityOrdered',
                  'QuantityReceived',
                  'QuantityBackOrdered',
                  'FulfillmentStatus',
                  'OrderDate',
                  'ExpectedDelivery'
                ]}
                rows={listData}
                // totals={['', '', 255, '$155,830.00']}
              />
            </LegacyCard>
          </Layout.Section>
        </Layout>
    </Page>
  );
}


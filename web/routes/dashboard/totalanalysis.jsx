import React, { useState, useMemo } from "react";
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
  Card
} from "@shopify/polaris";
import { Frame, Modal, TextContainer } from '@shopify/polaris';
import { useCallback } from 'react';
import { ChartLineIcon } from '@shopify/polaris-icons';
import { DeliveryIcon } from '@shopify/polaris-icons';
import { PlusCircleIcon, CheckSmallIcon, OutdentIcon, ChartVerticalFilledIcon } from '@shopify/polaris-icons';
import "../../styles/dashboard.css"
import CustomAttributesEditor from "../../components/customAttributesEditor";
import { useFindMany } from "@gadgetinc/react";
import { api } from "../../api";
import { useNavigate } from "react-router";


export default function TotalAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchText, setSearchText] = useState("");

  const handleCategoryChange = (value) => setSelectedCategory(value);
  const handleStockChange = (value) => setSelectedStock(value);
  const handleTypeChange = (value) => setSelectedType(value);
  const handleSortChange = (value) => setSortBy(value);

  // Fetch all products with detailed variant and sales information
  const [{ data, fetching, error }] = useFindMany(api.shopifyProduct, {
    first: 250,
    filter: {
      status: {
        equals: "active",
      },
    },
    select: {
      id: true,
      title: true,
      handle: true,
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
            title: true,
            orderLineItems: {
              edges: {
                node: {
                  id: true,
                  quantity: true,
                  price: true,
                }
              }
            }
          }
        }
      }
    }
  });

  // Transform the data to variant-level records with sales calculations
  const productData = React.useMemo(() => {
    if (!data) return [];

    const variantData = [];

    data.forEach(product => {
      if (product.variants?.edges) {
        product.variants.edges.forEach(variantEdge => {
          const variant = variantEdge.node;

          // Calculate sales metrics
          let unitsSold = 0;
          let revenue = 0;

          if (variant.orderLineItems?.edges) {
            variant.orderLineItems.edges.forEach(lineItemEdge => {
              const lineItem = lineItemEdge.node;
              unitsSold += lineItem.quantity || 0;
              revenue += (lineItem.quantity || 0) * parseFloat(lineItem.price || 0);
            });
          }

          // Format size/options
          const options = [variant.option1, variant.option2, variant.option3]
            .filter(Boolean)
            .join(' / ');

          variantData.push({
            id: variant.id,
            productName: product.title || "",
            sku: variant.sku || "",
            sizeOptions: options || "N/A",
            inventory: variant.inventoryQuantity || 0,
            unitsSold,
            revenue: revenue.toFixed(2),
            price: parseFloat(variant.price || 0).toFixed(2),
            variantTitle: variant.title || "",
            productId: product.id,
          });
        });
      }
    });

    return variantData;
  }, [data]);

  // Client-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  // // Slice products for current page
  // const pagedProducts = productData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );
  // Sorting logic
  let sortedProductData = [...productData];
  if (sortBy) {
    const [field, direction] = sortBy.split("_");
    sortedProductData.sort((a, b) => {
      if (field === "productName" || field === "sku" || field === "sizeOptions") {
        // String comparison
        const aVal = String(a[field] || "");
        const bVal = String(b[field] || "");
        if (direction === "asc") {
          return aVal.localeCompare(bVal);
        } else {
          return bVal.localeCompare(aVal);
        }
      } else {
        // Numeric comparison (inventory, unitsSold, revenue)
        const aVal = parseFloat(a[field]) || 0;
        const bVal = parseFloat(b[field]) || 0;
        if (direction === "asc") {
          return aVal - bVal;
        } else {
          return bVal - aVal;
        }
      }
    });
  } else {
    sortedProductData = productData;
  }

  // Filtered and sorted data for display
  const filteredProductData = useMemo(() => {
    let filtered = sortedProductData;
    // Apply search filter
    if (searchText) {
      const lower = searchText.toLowerCase();
      filtered = filtered.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(lower)
        )
      );
    }
    // Apply Product Category filter
    if (selectedCategory) {
      filtered = filtered.filter(row => {
        const inventory = parseFloat(row.inventory) || 0;
        const unitsSold = parseFloat(row.unitsSold) || 0;
        // Avoid division by zero
        if (inventory === 0) return false;
        const ratio = unitsSold / (inventory + unitsSold);
        if (selectedCategory === 'bestseller') return ratio >= 0.8;
        if (selectedCategory === 'medium') return ratio >= 0.5 && ratio < 0.8;
        if (selectedCategory === 'low') return ratio < 0.5;
        return true;
      });
    }
    return filtered;
  }, [sortedProductData, searchText, selectedCategory]);

  // Slice products for current page
  const pagedProducts = filteredProductData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resourceName = { singular: "variant", plural: "variants" };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(pagedProducts);

  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const navigate = useNavigate();

  return (
    <Page
      fullWidth
      title="Manual Panel"
    >
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
      <Divider />
      {/* Filter section */}
      <Layout>
        <Layout.Section>
          <LegacyCard title="Filters" sectioned>
            <BlockStack gap="4">
              <InlineStack gap="4" align="start">
                <div style={{ minWidth: '200px', marginRight: "20px" }}>
                  <TextField
                    label="Search"
                    value={searchText}
                    onChange={setSearchText}
                    autoComplete="off"
                    placeholder="Search all fields..."
                  />
                </div>
                <div style={{ minWidth: '200px', marginRight: "20px" }}>
                  <Select
                    label="Product Category"
                    options={[
                      { label: 'Select category', value: '' },
                      { label: 'Bestseller', value: 'bestseller' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'Low', value: 'low' },
                    ]}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  />
                </div>
                <div style={{ minWidth: '200px', marginRight: "20px" }}>
                  <Select
                    label="Stock Status"
                    options={[
                      { label: 'Select stock status', value: '' },
                      { label: 'High Stock', value: 'high' },
                      { label: 'Medium Stock', value: 'medium' },
                      { label: 'Low Stock', value: 'low' },
                    ]}
                    value={selectedStock}
                    onChange={handleStockChange}
                  />
                </div>
                {/* <div style={{ minWidth: '200px', marginRight: "20px" }}>
                  <Select
                    label="Product Type"
                    options={[
                      { label: 'Select product type', value: '' },
                      { label: 'Drop', value: 'drop' },
                      { label: 'Continuity', value: 'continuity' },
                    ]}
                    value={selectedType}
                    onChange={handleTypeChange}
                  />
                </div> */}
                <div style={{ minWidth: '200px', marginRight: "20px" }}>
                  <Select
                    label="Sort by"
                    options={[
                      { label: 'Select sorting', value: '' },
                      { label: 'Product Name (A-Z)', value: 'productName_asc' },
                      { label: 'Product Name (Z-A)', value: 'productName_desc' },
                      { label: 'SKU (A-Z)', value: 'sku_asc' },
                      { label: 'SKU (Z-A)', value: 'sku_desc' },
                      { label: 'Size/Options (A-Z)', value: 'sizeOptions_asc' },
                      { label: 'Size/Options (Z-A)', value: 'sizeOptions_desc' },
                      { label: 'Inventory (Low to High)', value: 'inventory_asc' },
                      { label: 'Inventory (High to Low)', value: 'inventory_desc' },
                      { label: 'Units Sold (Low to High)', value: 'unitsSold_asc' },
                      { label: 'Units Sold (High to Low)', value: 'unitsSold_desc' },
                      { label: 'Revenue (Low to High)', value: 'revenue_asc' },
                      { label: 'Revenue (High to Low)', value: 'revenue_desc' },
                    ]}
                    value={sortBy}
                    onChange={handleSortChange}
                  />
                </div>
              </InlineStack>

              {/* Active filters display */}
              <div style={{ marginTop: '16px' }}>
                <Text variant="headingMd" as="h6">Active Filters:</Text>
                <InlineStack gap="2" wrap>
                  {[selectedCategory, selectedStock, selectedType, sortBy]
                    .filter(filter => filter !== '')
                    .map((filter) => {
                      let displayText = filter;
                      // Format the sort filter display text
                      if (filter.includes('_')) {
                        const [field, direction] = filter.split('_');
                        displayText = `Sort by ${field} (${direction === 'asc' ? 'ascending' : 'descending'})`;
                      }
                      return (
                        <Tag key={filter} onRemove={() => {
                          if (filter === selectedCategory) {
                            setSelectedCategory('');
                          } else if (filter === selectedStock) {
                            setSelectedStock('');
                          } else if (filter === selectedType) {
                            setSelectedType('');
                          } else {
                            setSortBy('');
                          }
                        }}>
                          {displayText.charAt(0).toUpperCase() + displayText.slice(1)}
                        </Tag>
                      );
                    })}
                </InlineStack>
              </div>
            </BlockStack>
          </LegacyCard>
        </Layout.Section>
      </Layout>
      <Layout>
        <Layout.Section>
          <Divider></Divider>
          <Text variant="headingMd" as="h6">
            Product Variants
          </Text>
          <Divider></Divider>

          {fetching && <Text>Loading product variants...</Text>}
          {error && <Text tone="critical">Error loading product variants: {error.message}</Text>}

          {!fetching && !error && (
            <>
              <LegacyCard>
                <IndexTable
                  resourceName={resourceName}
                  itemCount={pagedProducts.length}
                  selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                  headings={[
                    { title: "Product Name" },
                    { title: "SKU" },
                    { title: "Size/Options" },
                    { title: "Inventory Quantity" },
                    { title: "Units Sold" },
                    { title: "Revenue ($)" },
                    { title: "Action" }
                  ]}
                >
                  {pagedProducts.map((row, index) => (
                    <IndexTable.Row
                      id={row.id}
                      key={row.id}
                      selected={selectedResources.includes(row.id)}
                      position={index}
                    >
                      <IndexTable.Cell>
                        <Text variant="bodyMd" fontWeight="medium" as="span">{row.productName}</Text>
                        {row.variantTitle && (
                          <Text variant="bodySm" tone="subdued" as="p">{row.variantTitle}</Text>
                        )}
                      </IndexTable.Cell>
                      <IndexTable.Cell>{row.sku || "N/A"}</IndexTable.Cell>
                      <IndexTable.Cell>{row.sizeOptions}</IndexTable.Cell>
                      <IndexTable.Cell>{row.inventory}</IndexTable.Cell>
                      <IndexTable.Cell>{row.unitsSold}</IndexTable.Cell>
                      <IndexTable.Cell>${row.revenue}</IndexTable.Cell>
                      <IndexTable.Cell>
                        <Button icon={PlusCircleIcon} onClick={() => navigate(`/dashboard/product/${row.productId}`)}>Edit Product</Button>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  ))}
                </IndexTable>
              </LegacyCard>
              <div style={{ margin: "50px" }}>
              </div>
              {totalPages > 1 && (
                <div style={{
                  position: 'fixed',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  background: 'white',
                  boxShadow: '0 -2px 8px rgba(0,0,0,0.07)',
                  zIndex: 1000,
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 12,
                }}>
                  <Button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span style={{ alignSelf: 'center', margin: '0 12px' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </Layout.Section>
      </Layout>
      {active && (
        <Modal
          open={active}
          onClose={handleChange}
          title="Add New MetaField"
          primaryAction={{
            content: 'Add',
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
            <CustomAttributesEditor />
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
}

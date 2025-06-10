import React, { useEffect, useState } from "react";
import {
  Card,
  Page,
  TextField,
  Button,
  FormLayout,
  Text,
  InlineStack,
  Divider,
  Banner,
  ButtonGroup
} from "@shopify/polaris";
import { api } from "../api"; // Adjust path if needed


export default function CustomAttributesEditor({ productId }) {
  const [customAttributes, setCustomAttributes] = useState({});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(null);


  // Load metafields on mount or when productId changes
  useEffect(() => {
    async function loadMetafield() {
      setLoading(true);
      setBanner(null);
      try {
        const product = await api.shopifyProduct.findOne(productId);
        setCustomAttributes(product?.customAttributes || {});
      } catch (err) {
        setBanner({ status: "critical", message: "Failed to load metafields." });
      }
      setLoading(false);
    }
    if (productId) loadMetafield();
  }, [productId]);



  // Update a field
  const handleFieldChange = (key) => (value) => {
    setCustomAttributes((prev) => ({ ...prev, [key]: value }));
  };

  // Add a new key-value pair
  const handleAddNew = () => {
    if (!newKey) {
      setBanner({ status: "warning", message: "Key cannot be empty." });
      return;
    }
    if (customAttributes.hasOwnProperty(newKey)) {
      setBanner({ status: "warning", message: "Key already exists." });
      return;
    }
    setCustomAttributes((prev) => ({ ...prev, [newKey]: newValue }));
    setNewKey("");
    setNewValue("");
    setBanner(null);
  };
  const handleAddCancel = () =>{
    // setCustomAttributes({});
    setNewKey("");
    setNewValue("");
  }

  // Save metafields
  const handleSave = async () => {
    if (
      !customAttributes || 
      typeof customAttributes !== "object" || 
      Object.keys(customAttributes).length === 0
    ) {
      setBanner({ status: "warning", message: "No attributes to save." });
      return;
    } else {
      setLoading(true);
      setBanner(null);
      try {
        await api.shopifyProduct.update(productId, {
          customAttributes,
        });
        setBanner({ status: "success", message: "Metafields saved successfully!" });
      } catch (err) {
        setBanner({ status: "critical", message: "Failed to save metafields." });
      }
      setLoading(false);
    }
    
  };

  return (
    <Page title="Edit Custom Attributes">
      <Card sectioned style={{ padding: "20px" }}>
        {banner && (
          <Banner status={banner.status} title={banner.message} />
        )}
        <FormLayout>
          <Text as="h2" variant="headingMd">
            Existing Attributes
          </Text>
          {Object.entries(customAttributes).map(([key, value]) => (
            <TextField
              key={key}
              label={key}
              value={value}
              onChange={handleFieldChange(key)}
              autoComplete="off"
            />
          ))}
          <Divider />
          <Text as="h2" variant="headingMd">
            Add New Field
          </Text>
          <InlineStack gap="400">
            <TextField
              label="New Key"
              value={newKey}
              onChange={setNewKey}
              autoComplete="off"
            />
            <TextField
              label="New Value"
              value={newValue}
              onChange={setNewValue}
              autoComplete="off"
            />
            <ButtonGroup>
              <Button onClick={handleAddNew} variant="primary" tone="critical">
                Add
              </Button>
              <Button onClick={handleAddCancel} variant="primary" tone="success">
                Cancel
              </Button>
            </ButtonGroup>
          </InlineStack>
          <Divider />
          <Button onClick={handleSave} loading={loading} variant="primary">
            Save Metafield
          </Button>
        </FormLayout>
      </Card>
    </Page>
  );
}

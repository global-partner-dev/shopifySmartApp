import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyInventoryItem" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-InventoryItem",
  fields: {},
  shopify: {
    fields: [
      "cost",
      "countryCodeOfOrigin",
      "countryHarmonizedSystemCodes",
      "duplicateSkuCount",
      "harmonizedSystemCode",
      "inventoryHistoryUrl",
      "inventoryQuantities",
      "legacyResourceId",
      "locations",
      "locationsCount",
      "measurement",
      "productVariant",
      "provinceCodeOfOrigin",
      "requiresShipping",
      "shop",
      "shopifyCreatedAt",
      "shopifyUpdatedAt",
      "sku",
      "tracked",
      "trackedEditable",
      "unitCost",
      "weightUnit",
      "weightValue",
    ],
  },
};

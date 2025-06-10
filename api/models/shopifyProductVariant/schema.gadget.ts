import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyProductVariant" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-ProductVariant",
  fields: {},
  shopify: {
    fields: [
      "barcode",
      "compareAtPrice",
      "inventoryItem",
      "inventoryPolicy",
      "inventoryQuantity",
      "media",
      "option1",
      "option2",
      "option3",
      "orderLineItems",
      "position",
      "presentmentPrices",
      "price",
      "priceListPrice",
      "product",
      "quantityPriceBreaks",
      "selectedOptions",
      "sellingPlanGroups",
      "shop",
      "shopifyCreatedAt",
      "shopifyUpdatedAt",
      "sku",
      "taxCode",
      "taxable",
      "title",
    ],
  },
};

import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyRefund" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Refund",
  fields: {},
  shopify: {
    fields: [
      "duties",
      "note",
      "order",
      "orderAdjustments",
      "processedAt",
      "refundLineItems",
      "restock",
      "return",
      "shop",
      "shopifyCreatedAt",
      "shopifyUpdatedAt",
      "totalRefundedSet",
      "transactions",
    ],
  },
};

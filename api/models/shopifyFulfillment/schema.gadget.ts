import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyFulfillment" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Fulfillment",
  fields: {},
  shopify: {
    fields: [
      "deliveredAt",
      "displayStatus",
      "estimatedDeliveryAt",
      "fulfillmentEvents",
      "fulfillmentLineItems",
      "inTransitAt",
      "location",
      "name",
      "order",
      "originAddress",
      "receipt",
      "requiresShipping",
      "service",
      "shipmentStatus",
      "shop",
      "shopifyCreatedAt",
      "shopifyUpdatedAt",
      "status",
      "totalQuantity",
      "trackingCompany",
      "trackingInfo",
      "trackingNumbers",
      "trackingUrls",
    ],
  },
};

import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyExchangeLineItem" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-ExchangeLineItem",
  fields: {},
  shopify: { fields: ["orderLineItem", "return", "shop"] },
};

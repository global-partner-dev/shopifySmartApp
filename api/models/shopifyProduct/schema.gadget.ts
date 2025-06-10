import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyProduct" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Product",
  fields: {
    customAttributes: {
      type: "json",
      shopifyMetafield: {
        privateMetafield: false,
        namespace: "customAttributes",
        key: "customAttributes",
        metafieldType: "json",
        allowMultipleEntries: false,
      },
      storageKey: "aDCxrutnlloc",
    },
  },
  shopify: {
    fields: [
      "body",
      "category",
      "compareAtPriceRange",
      "customCollections",
      "featuredMedia",
      "handle",
      "hasVariantsThatRequiresComponents",
      "media",
      "options",
      "orderLineItems",
      "productCategory",
      "productType",
      "publishedAt",
      "sellingPlanGroups",
      "shop",
      "shopifyCreatedAt",
      "shopifyUpdatedAt",
      "status",
      "tags",
      "templateSuffix",
      "title",
      "variants",
      "vendor",
    ],
  },
};

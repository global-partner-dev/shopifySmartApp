import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyOrderLineItem" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-OrderLineItem",
  fields: {},
  shopify: {
    fields: [
      "attributedStaffs",
      "currentQuantity",
      "discountAllocations",
      "discountedTotalSet",
      "discountedUnitPriceAfterAllDiscountsSet",
      "discountedUnitPriceSet",
      "duties",
      "exchangeLineItems",
      "fulfillableQuantity",
      "fulfillmentLineItems",
      "fulfillmentService",
      "fulfillmentStatus",
      "giftCard",
      "grams",
      "merchantEditable",
      "name",
      "nonFulfillableQuantity",
      "order",
      "originalTotalSet",
      "price",
      "priceSet",
      "product",
      "productExists",
      "properties",
      "quantity",
      "refundableQuantity",
      "refunds",
      "requiresShipping",
      "restockable",
      "shop",
      "sku",
      "taxLines",
      "taxable",
      "title",
      "totalDiscount",
      "totalDiscountSet",
      "unfulfilledDiscountedTotalSet",
      "unfulfilledOriginalTotalSet",
      "unfulfilledQuantity",
      "variant",
      "variantInventoryManagement",
      "variantTitle",
      "vendor",
    ],
  },
};

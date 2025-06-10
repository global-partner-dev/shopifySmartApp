import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyOrderTransaction" model, go to https://my-smart-app-v1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-OrderTransaction",
  fields: {},
  shopify: {
    fields: [
      "accountNumber",
      "amount",
      "amountRoundingSet",
      "amountSet",
      "authorization",
      "authorizationExpiresAt",
      "children",
      "currency",
      "errorCode",
      "formattedGateway",
      "gateway",
      "kind",
      "location",
      "manualPaymentGateway",
      "manuallyCapturable",
      "maximumRefundableV2",
      "message",
      "multicapturable",
      "order",
      "parent",
      "paymentDetails",
      "paymentId",
      "processedAt",
      "receipt",
      "refund",
      "settlementCurrency",
      "settlementCurrencyRate",
      "shop",
      "shopifyCreatedAt",
      "shopifyPaymentsSet",
      "sourceName",
      "status",
      "test",
      "totalUnsettledSet",
    ],
  },
};

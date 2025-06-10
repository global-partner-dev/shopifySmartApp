import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://my-smart-app-v1.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    "shopify-app-users": {
      storageKey: "Role-Shopify-App",
      models: {
        shopifyCarrierService: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyCarrierService.gelly",
          },
        },
        shopifyCatalog: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyCatalog.gelly",
          },
        },
        shopifyCollect: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyCollect.gelly",
          },
        },
        shopifyCollection: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyCollection.gelly",
          },
        },
        shopifyDuty: {
          read: {
            filter: "accessControl/filters/shopify/shopifyDuty.gelly",
          },
        },
        shopifyExchangeLineItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyExchangeLineItem.gelly",
          },
        },
        shopifyFile: {
          read: {
            filter: "accessControl/filters/shopify/shopifyFile.gelly",
          },
        },
        shopifyFulfillment: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyFulfillment.gelly",
          },
        },
        shopifyFulfillmentEvent: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyFulfillmentEvent.gelly",
          },
        },
        shopifyFulfillmentLineItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyFulfillmentLineItem.gelly",
          },
        },
        shopifyFulfillmentService: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyFulfillmentService.gelly",
          },
        },
        shopifyGdprRequest: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyGdprRequest.gelly",
          },
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyInventoryItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyInventoryItem.gelly",
          },
        },
        shopifyInventoryLevel: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyInventoryLevel.gelly",
          },
        },
        shopifyInventoryQuantity: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyInventoryQuantity.gelly",
          },
        },
        shopifyLocation: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyLocation.gelly",
          },
        },
        shopifyOrder: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyOrder.gelly",
          },
        },
        shopifyOrderAdjustment: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyOrderAdjustment.gelly",
          },
        },
        shopifyOrderLineItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyOrderLineItem.gelly",
          },
        },
        shopifyOrderTransaction: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyOrderTransaction.gelly",
          },
        },
        shopifyPriceList: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyPriceList.gelly",
          },
        },
        shopifyPriceListPrice: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyPriceListPrice.gelly",
          },
        },
        shopifyProduct: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProduct.gelly",
          },
          actions: {
            update: true,
          },
        },
        shopifyProductMedia: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductMedia.gelly",
          },
        },
        shopifyProductOption: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductOption.gelly",
          },
        },
        shopifyProductVariant: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductVariant.gelly",
          },
        },
        shopifyProductVariantMedia: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductVariantMedia.gelly",
          },
        },
        shopifyQuantityPriceBreak: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyQuantityPriceBreak.gelly",
          },
        },
        shopifyRefund: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyRefund.gelly",
          },
        },
        shopifyRefundDuty: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyRefundDuty.gelly",
          },
        },
        shopifyRefundLineItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyRefundLineItem.gelly",
          },
        },
        shopifyReturn: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReturn.gelly",
          },
        },
        shopifyReturnLineItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReturnLineItem.gelly",
          },
        },
        shopifyReturnShippingFee: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReturnShippingFee.gelly",
          },
        },
        shopifyReverseDelivery: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReverseDelivery.gelly",
          },
        },
        shopifyReverseDeliveryLineItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReverseDeliveryLineItem.gelly",
          },
        },
        shopifyReverseFulfillmentOrder: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReverseFulfillmentOrder.gelly",
          },
        },
        shopifyReverseFulfillmentOrderDisposition: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReverseFulfillmentOrderDisposition.gelly",
          },
        },
        shopifyReverseFulfillmentOrderLineItem: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyReverseFulfillmentOrderLineItem.gelly",
          },
        },
        shopifySellingPlan: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifySellingPlan.gelly",
          },
        },
        shopifySellingPlanGroup: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifySellingPlanGroup.gelly",
          },
        },
        shopifySellingPlanGroupProduct: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifySellingPlanGroupProduct.gelly",
          },
        },
        shopifySellingPlanGroupProductVariant: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifySellingPlanGroupProductVariant.gelly",
          },
        },
        shopifyShippingLine: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyShippingLine.gelly",
          },
        },
        shopifyShop: {
          read: {
            filter: "accessControl/filters/shopify/shopifyShop.gelly",
          },
          actions: {
            install: true,
            reinstall: true,
            uninstall: true,
            update: true,
          },
        },
        shopifySync: {
          read: {
            filter: "accessControl/filters/shopify/shopifySync.gelly",
          },
          actions: {
            abort: true,
            complete: true,
            error: true,
            run: true,
          },
        },
      },
      actions: {
        scheduledShopifySync: true,
      },
    },
    unauthenticated: {
      storageKey: "unauthenticated",
      models: {
        shopifyProduct: {
          actions: {
            update: true,
          },
        },
      },
    },
    "": {
      storageKey: "dONt1VUXMr-6",
    },
  },
};

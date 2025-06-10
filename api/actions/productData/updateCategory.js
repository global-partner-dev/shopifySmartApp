export default async ({ record, params, api }) => {
    const { newCategory } = params;
    await api.shopifyProduct.update({
      id: record.shopifyProduct.id,
      metafields: [{
        namespace: "custom",
        key: "newCategory",
        type: "single_line_text_field",
        value: newCategory,
      }]
    });
};
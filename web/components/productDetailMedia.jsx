import React, { useState } from "react";
import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";
import { 
  Card, 
  Text, 
  BlockStack, 
  InlineStack, 
  Thumbnail, 
  Modal, 
  Box,
  SkeletonDisplayText,
  SkeletonBodyText,
  Badge,
  Divider
} from "@shopify/polaris";

export default function ProductDetailMedia({ productId }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ data, fetching, error }] = useFindMany(api.shopifyProductMedia, {
    filter: { product: { id: { equals: productId } } },
    sort: { position: "Ascending" },
    first: 20,
    select: {
      id: true,
      position: true,
      file: {
        image: true,
        filename: true,
        mimetype: true,
        alt: true
      }
    }
  });

  const renderLoadingSkeleton = () => (
    <Card>
      <Box padding="400">
        <BlockStack gap="400">
          <SkeletonDisplayText size="medium" />
          <Box 
            style={{ 
              height: "300px", 
              backgroundColor: "#f6f6f7", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <SkeletonBodyText />
          </Box>
          <InlineStack gap="200">
            {[...Array(4)].map((_, index) => (
              <Box 
                key={index}
                style={{ 
                  width: "60px", 
                  height: "60px", 
                  backgroundColor: "#f6f6f7", 
                  borderRadius: "4px" 
                }}
              />
            ))}
          </InlineStack>
        </BlockStack>
      </Box>
    </Card>
  );

  const renderPlaceholder = () => (
    <Card>
      <Box padding="400">
        <BlockStack gap="400" align="center">
          <Box 
            style={{ 
              height: "300px", 
              width: "100%", 
              backgroundColor: "#f6f6f7", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed #d1d5db"
            }}
          >
            <Text tone="subdued" alignment="center">
              📷<br />No images available
            </Text>
          </Box>
        </BlockStack>
      </Box>
    </Card>
  );

  const getImageUrl = (mediaItem) => {
    if (mediaItem?.file?.image && typeof mediaItem.file.image === "object" && mediaItem.file.image.originalSrc) {
      return mediaItem.file.image.originalSrc;
    }
    return null;
  };

  const getAltText = (mediaItem, index) => {
    if (mediaItem?.file?.alt) return mediaItem.file.alt;
    if (mediaItem?.file?.filename) return `Product image: ${mediaItem.file.filename}`;
    return `Product image ${index + 1}`;
  };

  const isImageType = (mediaItem) => {
    const mimeType = mediaItem?.file?.mimetype;
    return !mimeType || mimeType.startsWith('image/');
  };

  if (fetching) return renderLoadingSkeleton();
  
  if (error) {
    return (
      <Card>
        <Box padding="400">
          <Text tone="critical">
            Error loading product images: {error.message}
          </Text>
        </Box>
      </Card>
    );
  }

  if (!data || data.length === 0) return renderPlaceholder();

  // Filter only image media types
  const imageMedia = data.filter(isImageType);
  
  if (imageMedia.length === 0) return renderPlaceholder();

  console.log("All image media:", imageMedia);

  const selectedMedia = imageMedia[selectedImageIndex] || imageMedia[0];
  console.log("Selected media:", selectedMedia);
  const selectedImageUrl = getImageUrl(selectedMedia);

  
  return (
    <>
      <Card>
        <Box padding="400">
          <BlockStack gap="400">
            <InlineStack align="space-between">
              <Text variant="headingMd" as="h3">
                Product Images
              </Text>
              <Badge>
                {selectedImageIndex + 1} of {imageMedia.length}
              </Badge>
            </InlineStack>

            {/* Main Image */}
            <Box 
              style={{ 
                position: "relative",
                cursor: selectedImageUrl ? "zoom-in" : "default"
              }}
              onClick={() => selectedImageUrl && setIsModalOpen(true)}
            >
              {selectedImageUrl ? (
                <img
                  src={selectedImageUrl}
                  alt={getAltText(selectedMedia, selectedImageIndex)}
                  style={{ 
                    width: "100%", 
                    maxHeight: "400px",
                    borderRadius: "8px", 
                    objectFit: "contain",
                    backgroundColor: "#f6f6f7"
                  }}
                />
              ) : (
                <Box 
                  style={{ 
                    height: "300px", 
                    backgroundColor: "#f6f6f7", 
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text tone="subdued">Image unavailable</Text>
                </Box>
              )}
            </Box>

            {/* Image Metadata */}
            {selectedMedia && (
              <Box>
                <BlockStack gap="200">
                  <Divider />
                  <InlineStack gap="400" wrap={false}>
                    <Text variant="bodySm" tone="subdued">
                      Position: {selectedMedia.position || 'N/A'}
                    </Text>
                    {selectedMedia.file?.filename && (
                      <Text variant="bodySm" tone="subdued">
                        File: {selectedMedia.file.filename}
                      </Text>
                    )}
                    {selectedMedia.file?.mimetype && (
                      <Text variant="bodySm" tone="subdued">
                        Type: {selectedMedia.file.mimetype}
                      </Text>
                    )}
                  </InlineStack>
                </BlockStack>
              </Box>
            )}

            {/* Thumbnails */}
            {imageMedia.length > 1 && (
              <Box>
                <Text variant="bodyMd" as="p" tone="subdued">
                  All Images:
                </Text>
                <Box paddingBlockStart="200">
                  <InlineStack gap="200" wrap={true}>
                    {imageMedia.map((mediaItem, index) => {
                      const imageUrl = getImageUrl(mediaItem);
                      return imageUrl ? (
                        <Thumbnail
                          key={mediaItem.id || index}
                          source={imageUrl}
                          alt={getAltText(mediaItem, index)}
                          size="small"
                          onClick={() => setSelectedImageIndex(index)}
                          style={{
                            cursor: "pointer",
                            border: index === selectedImageIndex ? "2px solid #008060" : "2px solid transparent",
                            borderRadius: "4px"
                          }}
                        />
                      ) : (
                        <Box
                          key={mediaItem.id || index}
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#f6f6f7",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: index === selectedImageIndex ? "2px solid #008060" : "2px solid #d1d5db"
                          }}
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <Text variant="bodySm" tone="subdued">?</Text>
                        </Box>
                      );
                    })}
                  </InlineStack>
                </Box>
              </Box>
            )}
          </BlockStack>
        </Box>
      </Card>

      {/* Full Size Image Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getAltText(selectedMedia, selectedImageIndex)}
        large
      >
        <Modal.Section>
          {selectedImageUrl && (
            <Box style={{ textAlign: "center" }}>
              <img
                src={selectedImageUrl}
                alt={getAltText(selectedMedia, selectedImageIndex)}
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: "80vh",
                  objectFit: "contain"
                }}
              />
            </Box>
          )}
        </Modal.Section>
      </Modal>
    </>
  );
}

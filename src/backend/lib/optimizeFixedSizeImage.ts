import sharp from "sharp";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB

export const optimizeFixedSizeImage = async ({
    image,
    width,
    allowSmallerWidth = true,
    maxImageInputSize = MAX_IMAGE_SIZE,
    maxImageOutputSize = MAX_IMAGE_SIZE,
}: {
    image: Buffer;
    width: number;
    allowSmallerWidth?: boolean;
    maxImageInputSize?: number;
    maxImageOutputSize?: number;
}) => {
    const metadata = await sharp(image, { animated: true }).metadata();
    const isAnimated = metadata.pages && metadata.pages > 1;

    if (
        !metadata.size ||
        !metadata.width ||
        !metadata.height ||
        !metadata.format
    ) {
        return {
            success: false,
            error: "Failed to get image metadata",
            httpCode: 500,
        };
    }

    if (isAnimated) {
        return {
            success: false,
            error: "Animated images are not supported",
            httpCode: 400,
        };
    }

    if (!allowSmallerWidth && metadata.width < width) {
        return {
            success: false,
            error: "Image is too small to optimize",
            httpCode: 400,
        };
    }

    if (metadata.size > maxImageInputSize) {
        return {
            success: false,
            error: "Image is too large to optimize",
            httpCode: 400,
        };
    }

    const optimizedImage = await optimizeWebp({
        image,
        width,
        quality: 80,
    });

    if (optimizedImage.length > maxImageOutputSize) {
        return {
            success: false,
            error: "Image is too large to optimize",
            httpCode: 400,
        };
    }

    return {
        success: true,
        data: {
            imageBuffer: optimizedImage,
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
            size: optimizedImage.length,
        },
        httpCode: 200,
    };
};

export const optimizeWebp = async ({
    image,
    width,
    quality,
}: {
    image: Buffer;
    width: number;
    quality: number;
}) => {
    const outputBuffer = await sharp(image)
        .resize(width, width, {
            fit: "inside",
            withoutEnlargement: true,
        })
        .webp({ quality })
        .toBuffer();

    return outputBuffer;
};
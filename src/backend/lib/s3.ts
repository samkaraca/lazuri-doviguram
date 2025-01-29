import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

export const s3Client = new S3Client({
    region: process.env.CF_R2_REGION!,
    credentials: {
        accessKeyId: process.env.CF_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.CF_R2_BUCKET_ENDPOINT!,
});

export const uploadImage = async ({
    imageBuffer,
    format,
}: {
    imageBuffer: Buffer;
    format: string;
}) => {
    const fileName = `${Date.now()}-${nanoid()}.${format}`;

    const uploadParams = {
        Bucket: process.env.CF_R2_BUCKET_NAME,
        Key: `images/${fileName}`, // Always use jpg for consistency
        Body: imageBuffer,
        ContentType: `image/${format}`,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${fileName}`;
};

export const uploadSoundFile = async ({
    soundBuffer,
    format,
}: {
    soundBuffer: Buffer;
    format: string;
}) => {
    const fileName = `${Date.now()}-${nanoid()}.${format}`;

    const uploadParams = {
        Bucket: process.env.CF_R2_BUCKET_NAME,
        Key: `audios/${fileName}`,
        Body: soundBuffer,
        ContentType: `audio/${format}`,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return `${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${fileName}`;
};

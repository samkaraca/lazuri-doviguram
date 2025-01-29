import { model, Schema, InferSchemaType, models, Types } from "mongoose";

export const themeSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    image: { type: String, required: false },
    youtubeVideoUrl: { type: String, required: false },
    createdAt: { type: Number, required: true },
});

export const lessonSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    themeId: { type: Schema.Types.ObjectId, ref: "Theme", required: true },
});

export const activitySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    textContent: { type: String, required: false },
    image: { type: String, required: false },
    youtubeVideoUrl: { type: String, required: false },
    audio: { type: String, required: false },
    savedAt: { type: Number, required: true },
    type: { type: String, required: true },
    exercise: {
        type: String,
        required: true
    },
});

themeSchema.index({ slug: 1 }, { unique: true });
lessonSchema.index({ themeId: 1 }, { unique: true });
activitySchema.index({ lessonId: 1 }, { unique: true });

export const Activity = models.Activity || model("Activity", activitySchema);
export const Lesson = models.Lesson || model("Lesson", lessonSchema);
export const Theme = models.Theme || model("Theme", themeSchema);
export type IMongoActivity = InferSchemaType<typeof activitySchema>;
export type IMongoLesson = InferSchemaType<typeof lessonSchema>;
export type IMongoTheme = InferSchemaType<typeof themeSchema>;


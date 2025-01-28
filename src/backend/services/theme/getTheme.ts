import ITheme from "@/lib/theme/theme";
import { ApiResponse } from "@/api/api_response";
import dbConnect from "@/backend/lib/db";
import { Theme } from "@/backend/models/Theme";
import { Types } from "mongoose";

export const getTheme = async (themeId: string): Promise<ApiResponse<ITheme>> => {
    try {
        await dbConnect();
        const theme = await Theme.aggregate([
            {
                $match: { _id: new Types.ObjectId(themeId) },
            },
            {
                $lookup: {
                    from: "lessons",
                    localField: "_id",
                    foreignField: "themeId",
                    as: "lessons",
                },
            },
            {
                $lookup: {
                    from: "activities",
                    let: { lessonIds: "$lessons._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$lessonId", "$$lessonIds"]
                                }
                            }
                        }
                    ],
                    as: "allActivities"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    title: 1,
                    explanation: 1,
                    image: 1,
                    youtubeVideoUrl: 1,
                    createdAt: 1,
                    lessons: {
                        $map: {
                            input: "$lessons",
                            as: "lesson",
                            in: {
                                id: "$$lesson._id",
                                title: "$$lesson.title",
                                explanation: "$$lesson.explanation",
                                themeId: "$$lesson.themeId",
                                activities: {
                                    $filter: {
                                        input: "$allActivities",
                                        as: "activity",
                                        cond: { $eq: ["$$activity.lessonId", "$$lesson._id"] }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);

        const themeData = theme[0] ? {
            ...theme[0],
            id: theme[0].id.toString(),
            lessons: theme[0].lessons.map((lesson: any) => ({
                id: lesson.id.toString(),
                title: lesson.title,
                explanation: lesson.explanation,
                activities: lesson.activities.map((activity: any) => ({
                    id: activity._id.toString(),
                    title: activity.title,
                    explanation: activity.explanation,
                    textContent: activity.textContent,
                    image: activity.image,
                    youtubeVideoUrl: activity.youtubeVideoUrl,
                    audio: activity.audio,
                    savedAt: activity.savedAt,
                    type: activity.type,
                    exercise: JSON.parse(activity.exercise)
                }))
            })) || []
        } : null;

        return {
            status: "success",
            message: "",
            data: themeData,
        };

    } catch (error) {
        console.error("ThemeApiService -> getTheme: ", error);
        return { status: "error", message: "" };
    }
};
import ILessonRepository from "@/backend/repositories/lesson/lesson_repository";
import ILesson from "../../lib/lesson/lesson";
import { convertLessonUserToDB } from "../utils/db_converters";

export class BackendLessonService {
  constructor(private readonly lessonRepo: ILessonRepository) {}

  createLesson = async (themeId: string, lesson: ILesson) => {
    try {
      await this.lessonRepo.createLesson(
        themeId,
        lesson.id,
        convertLessonUserToDB(lesson)
      );
      return {
        status: "success",
        message: "Yeni ders başarıyla oluşturuldu.",
      };
    } catch (error) {
      console.error("LessonApiService -> createLesson: ", error);
      return { status: "error", message: "Yeni ders oluşturma başarısız." };
    }
  };

  saveLesson = async (themeId: string, lesson: Omit<ILesson, "activities">) => {
    try {
      const lessonToSave = { ...lesson } as any;
      delete lessonToSave.id;
      await this.lessonRepo.saveLesson(themeId, lesson.id, lessonToSave);
      return { status: "success", message: "Ders başarıyla güncellendi." };
    } catch (error) {
      console.error("LessonApiService -> saveLesson: ", error);
      return { status: "error", message: "Ders güncelleme başarısız." };
    }
  };

  deleteLesson = async (themeId: string, lessonId: string) => {
    try {
      await this.lessonRepo.deleteLesson(themeId, lessonId);
      return { status: "success", message: "Ders başarıyla silindi." };
    } catch (error) {
      console.error("LessonApiService -> deleteLesson: ", error);
      return { status: "error", message: "Ders silme başarısız." };
    }
  };
}

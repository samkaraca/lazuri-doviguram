import { Clear } from "@mui/icons-material";
import { IconButton, Input, List, ListItem } from "@mui/material";
import useViewModelContext from "@/features/activity_editor/view_model";
import { AddFab } from "@/core/components/add_fab";
import { ActivityListItemPaper } from "@/core/components/list_item_paper";
import { nanoid } from "nanoid";
import {
  FillInBlanksExercise,
  FillInBlanksQuestion,
} from "@/lib/exercises/fill_in_blanks_exercise";

export default function TypeOrDragExerciseForm() {
  const { fillInBlanksExercise, setFillInBlanksExercise } =
    useViewModelContext()!;

  return (
    <>
      <List>
        {fillInBlanksExercise.questions.map((question) => {
          return (
            <ActivityListItemPaper key={question.id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      setFillInBlanksExercise((prev) => {
                        const newQuestions = prev.questions.filter(
                          (q) => q.id !== question.id
                        );
                        return new FillInBlanksExercise(
                          prev.activityId,
                          newQuestions
                        );
                      });
                    }}
                  >
                    <Clear color="error" />
                  </IconButton>
                }
              >
                <Input
                  fullWidth
                  sx={{ marginRight: "1.5rem" }}
                  value={question}
                  onChange={(e) => {
                    setFillInBlanksExercise((prev) => {
                      const newQuestions = prev.questions.map((q) => {
                        if (q.id !== question.id)
                          return FillInBlanksQuestion.from(q);
                        return FillInBlanksQuestion.fromText(e.target.value);
                      });
                      return new FillInBlanksExercise(
                        prev.activityId,
                        newQuestions
                      );
                    });
                  }}
                />
              </ListItem>
            </ActivityListItemPaper>
          );
        })}
      </List>
      <AddFab
        onClick={() => {
          setFillInBlanksExercise((prev) => {
            const newQuestions = [
              ...prev.questions,
              new FillInBlanksQuestion(nanoid(), new Map(), new Map()),
            ];
            return new FillInBlanksExercise(prev.activityId, newQuestions);
          });
        }}
      />
    </>
  );
}

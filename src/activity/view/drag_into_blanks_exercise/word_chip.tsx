import { Chip } from "@mui/material";

interface Props {
  word: string;
  onDelete?: () => void;
}

export function WordChip({ word, onDelete }: Props) {
  return (
    <Chip
      size="small"
      sx={{
        borderRadius: "0.3rem",
      }}
      variant="filled"
      color="info"
      onDelete={onDelete}
      label={word}
    />
  );
}

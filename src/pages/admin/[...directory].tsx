import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Image from "next/image";
import FileList from "@/components/admin/file_list";

const BannerDiv = styled.div((props) => ({
  backgroundColor: "#5A738C",
  height: "30vh",
}));

const MainDiv = styled.div((props: any) => ({
  height: "100vh",
}));

const ImageContainer = styled.div((props: any) => {
  const [top, right, bottom, left] = props.position.split(" ");

  return {
    position: "absolute",
    aspectRatio: props.ratio,
    height: props.height,
    top,
    right,
    bottom,
    left,
  };
});

const WidthDiv = styled.div((props: any) => ({
  padding: props.padding && "0",
  position: props.absolute ? "absolute" : props.relative ? "relative" : "unset",
  top: props.top ?? "unset",
  right: props.right ?? "unset",
  bottom: props.bottom ?? "unset",
  left: props.left ?? props.centerH ? "50%" : "unset",
  width: props.width ?? "unset",
  maxWidth: props.maxWidth ?? "unset",
  minWidth: props.minWidth ?? "unset",
  minHeight: props.minHeight ?? "unset",
  transform: props.centerH && "translate(-50%, 0)",
  display: "table",
  "& > * ": {
    display: "table-cell",
  },
}));

export default function Finder() {
  return (
    <MainDiv>
      <BannerDiv>
        <ImageContainer
          ratio="1"
          height="15rem"
          position="3rem -1rem unset unset"
        >
          <Image alt="haze hand" src="/admin/haze-hand.png" fill={true} />
        </ImageContainer>
      </BannerDiv>
      <WidthDiv
        width="30%"
        absolute
        top="7rem"
        minHeight="30rem"
        minWidth="35rem"
        centerH
      >
        <Paper>
          <FileList />
        </Paper>
      </WidthDiv>
    </MainDiv>
  );
}

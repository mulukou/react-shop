import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";

interface prop {
  title: string;
  description: string;
  picture: string;
  price: number;
}

export default function StoreItem(props: prop) {
  return (
    <Box
      sx={{
        minWidth: 175,
        margin: 2,
        backgroundColor: "#ffffff",
        color: "#000",
      }}
      textAlign="center"
    >
      <Typography variant="h5">{props.title}</Typography>
      <Image src={props.picture} alt="Product Image" width={50} height={50} />
      <Typography variant="body1">{props.description}</Typography>
      <Typography variant="body2">${props.price.toFixed(2)}</Typography>
    </Box>
  );
}

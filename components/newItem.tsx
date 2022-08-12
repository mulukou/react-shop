import { Button, Modal, SxProps, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Cookies from "js-cookie";
import { Context, Dispatch, SetStateAction, useContext, useState } from "react";

interface Props {
  itemContext: Context<{
    itemCheck: boolean;
    setItemCheck: Dispatch<SetStateAction<boolean>>;
  }>;
  loginContext: Context<{
    login: boolean;
    setLogin: Dispatch<SetStateAction<boolean>>;
  }>;
}

const style: SxProps = {
  backgroundColor: "#fff",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function uploadItem(form: {
  title: string;
  description: string;
  price: number;
  picture: File;
}) {
  const formData = new FormData();
  console.log("title: ", form.title);
  console.log("picture: ", form.picture);
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("price", `${form.price}`);
  formData.append("picture", form.picture);

  axios.post(`${process.env.GO_BACKEND_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
}

export default function NewItemModal(prop: Props) {
  const [newItemModal, setNewItemModal] = useState(false);
  const { login, setLogin } = useContext(prop.loginContext);
  const { itemCheck, setItemCheck } = useContext(prop.itemContext);

  let form: {
    title: string;
    description: string;
    price: number;
    picture: File;
  };

  if (login) {
    return (
      <>
        <Modal open={newItemModal} onClose={() => setNewItemModal(false)}>
          <Box sx={style} textAlign="center">
            <TextField
              sx={{ margin: 1 }}
              label="Title"
              onChange={(v) => {
                form = { ...form, title: v.target.value };
              }}
            />
            <Button component="label">
              Upload File
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(v) => {
                  if (v.target.files?.length) {
                    form = { ...form, picture: v.target.files[0] };
                  }
                }}
              />
            </Button>
            <TextField
              sx={{ margin: 1 }}
              label="Description"
              onChange={(v) =>
                (form = { ...form, description: v.target.value })
              }
            />
            <TextField
              sx={{ margin: 1 }}
              label="Price"
              type="number"
              onChange={(v) =>
                (form = { ...form, price: parseFloat(v.target.value) })
              }
            />
            <Button
              variant="contained"
              onClick={() => {
                uploadItem(form);
                new Promise((resolve) => setTimeout(resolve, 400)).then(() => {
                  setItemCheck(!itemCheck);
                });
              }}
            >
              New Item
            </Button>
          </Box>
        </Modal>
        <Button color="inherit" onClick={() => setNewItemModal(true)}>
          New Item
        </Button>
      </>
    );
  } else {
    return <></>;
  }
}

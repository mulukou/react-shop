import { Button, Modal, SxProps, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import {
  Context,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

interface Props {
  context: Context<{
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

async function loginFunc(loginForm: { username: string; password: string }) {
  const formData = new FormData();
  formData.append("username", loginForm.username);
  formData.append("password", loginForm.password);

  const req = await axios.post(`${process.env.GO_LOGIN_URL}/login`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const data: { token: string; expiration: number } = req.data;
  const expirationDate = new Date(data.expiration * 1000);
  Cookies.set("token", data.token, { expires: expirationDate });
}

export default function LoginModal(prop: Props) {
  const [loginModal, setLoginModal] = useState(false);
  const { login, setLogin } = useContext(prop.context);

  useEffect(() => {
    if (Cookies.get("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  let loginForm: { username: string; password: string } = {
    username: "test",
    password: "test",
  };

  if (!login) {
    return (
      <>
        <Modal open={loginModal} onClose={() => setLoginModal(false)}>
          <Box sx={style}>
            <TextField
              sx={{ margin: 1 }}
              label="Username"
              onChange={(v) => (loginForm.username = v.target.value)}
            />
            <TextField
              sx={{ margin: 1 }}
              label="Password"
              onChange={(v) => (loginForm.password = v.target.value)}
            />
            <div>
              <Button
                onClick={() =>
                  loginFunc(loginForm).then(() => {
                    setLogin(true);
                    setLoginModal(false);
                  })
                }
              >
                Login
              </Button>
            </div>
          </Box>
        </Modal>
        <Button color="inherit" onClick={() => setLoginModal(true)}>
          Login
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          color="inherit"
          onClick={() => {
            Cookies.remove("token");
            setLogin(false);
          }}
        >
          Logout
        </Button>
      </>
    );
  }
}

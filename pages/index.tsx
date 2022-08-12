import type { NextPage } from "next";
import axios from "axios";
import StoreItem from "../components/storeItem";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { createContext, useState, useMemo, useEffect } from "react";
import NewItem from "../components/newItem";
import Login from "../components/login";
interface Props {
  items?: {
    ID: number;
    Title: string;
    Description: string;
    Picture: string;
    Price: number;
  }[];
  token?: string | undefined;
  error?: unknown;
}

const Home: NextPage = () => {
  const [login, setLogin] = useState(false);
  const LoginContext = createContext({ login, setLogin });
  const loginContextValue = useMemo(() => ({ login, setLogin }), [login]);

  const [items, setItems] = useState<
    {
      ID: number;
      Title: string;
      Description: string;
      Picture: string;
      Price: number;
    }[]
  >([]);

  const [itemCheck, setItemCheck] = useState(false);
  const ItemContext = createContext({ itemCheck, setItemCheck });
  const itemContextValue = useMemo(
    () => ({ itemCheck, setItemCheck }),
    [itemCheck]
  );

  useEffect(() => {
    axios.get("http://localhost:1323/items").then((res) => {
      setItems(res.data);
    });
  }, [itemCheck]);

  return (
    <div>
      <AppBar>
        <Toolbar variant="dense" sx={{ backgroundColor: "#000F9F" }}>
          <LoginContext.Provider value={loginContextValue}>
            <ItemContext.Provider value={itemContextValue}>
              <NewItem itemContext={ItemContext} loginContext={LoginContext} />
            </ItemContext.Provider>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h5">React Shop</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Login context={LoginContext} />
          </LoginContext.Provider>
        </Toolbar>
      </AppBar>
      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {items?.map((item) => (
          <StoreItem
            key={item.ID}
            description={item.Description}
            picture={item.Picture}
            price={item.Price}
            title={item.Title}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

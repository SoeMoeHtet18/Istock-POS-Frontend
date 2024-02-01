import { useState, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemText from "@mui/material/ListItemText";

const List = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  border: "1px solid #dbd9d9",
  borderLeft: "none",
  borderRight: "none",
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
}));

const ListItem = styled("li")(({ theme }) => ({
  padding: 0,
  margin: 0,
  marginLeft: 4,
  border: "1px solid #dbd9d9",
  borderRight: "none",
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  "&.active": {
    backgroundColor: "#d1f5f9",
    borderRight: "2px solid #d1f5f9",
    width: "100%",
    position: "relative",
    zIndex: 10,
  },
}));

const ListItemButton = styled("div")(({ theme }) => ({
  padding: "4px 16px",
  margin: 0,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#b6e4ea",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
}));

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("Product");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "13vw" }}>
      <CssBaseline />
      <div style={{ padding: "24px 10px" }}>
        <img src="/logo/profile.png" width={160} height={40} />
      </div>
      <List>
        {[
          "Sale",
          "Purchase",
          "Transfer",
          "Adjust/Convert",
          "Stock Status",
          "Price/Discount",
          "Consignment",
          "Outstanding",
          "Gross Profit",
        ].map((text, index) => (
          <Fragment key={text}>
            <ListItem
              key={text}
              disablePadding
              className={activeItem === text ? "active" : ""}
              onClick={() => setActiveItem(text)}
            >
              <ListItemButton>
                <ListItemText
                  primary={text}
                  className="text-center"
                  primaryTypographyProps={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Box>
  );
}

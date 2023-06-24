import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from "mdb-react-ui-kit";
import ProfilePage from "./Profile";
import ListOrder from "./ListOrder";
import {
  getOrderOrdered,
  getOrderReceived,
  getOrderTransport,
} from "../../APIs/order.api";
import { removeLocalStorage, STORAGE } from "../../Utils/storage";
import { Navigate, useNavigate } from "react-router-dom";
import Seller from "./Seller";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const [currentTabSide, setCurrentTabSide] = React.useState("User Profile");
  const [listProduct, setListProduct] = React.useState([]);
  const [listProductTransport, setListProductTransport] = React.useState([]);
  const [listProductReceived, setListProductReceived] = React.useState([]);
  React.useEffect(() => {
    getOrderOrdered(setListProduct);
    getOrderTransport(setListProductTransport);
    getOrderReceived(setListProductReceived);
  }, []);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-white rounded-3 p-3 mb-4 mt-4">
                <MDBBreadcrumbItem>
                  <a href="/home">Home</a>
                </MDBBreadcrumbItem>
                {/* <MDBBreadcrumbItem>
                  <a href="#">My account</a>
                </MDBBreadcrumbItem> */}
                <MDBBreadcrumbItem active>{currentTabSide}</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Toolbar />
        <Divider />
        <List>
          {["Ordered", "Transporting", "Received"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentTabSide(text);
                }}
                style={{
                  backgroundColor:
                    currentTabSide === text ? "rgb(66,134,245)" : "transparent",
                  color: currentTabSide === text ? "white" : "black",
                }}
              >
                <ListItemIcon
                  style={{
                    color: currentTabSide === text ? "white" : "black",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["User Profile", "Register Seller", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentTabSide(text);
                  if (text === "Logout") {
                    removeLocalStorage(STORAGE.USER_DATA);
                    removeLocalStorage(STORAGE.USER_TOKEN);
                    removeLocalStorage("EXPIRE");
                    navigate("/login");
                  }
                }}
                style={{
                  backgroundColor:
                    currentTabSide === text ? "rgb(66,134,245)" : "transparent",
                  color: currentTabSide === text ? "white" : "black",
                }}
              >
                <ListItemIcon
                  style={{
                    color: currentTabSide === text ? "white" : "black",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {currentTabSide === "User Profile" ? <ProfilePage /> : null}
        {currentTabSide === "Register Seller" ? <Seller /> : null}
        {currentTabSide === "Ordered" ? (
          <ListOrder listProduct={listProduct} name="Ordered" />
        ) : null}
        {currentTabSide === "Transporting" ? (
          <ListOrder listProduct={listProductTransport} name="Transporting" />
        ) : null}
        {currentTabSide === "Received" ? (
          <ListOrder listProduct={listProductReceived} name="Received" />
        ) : null}
      </Box>
    </Box>
  );
}

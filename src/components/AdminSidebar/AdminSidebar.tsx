import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.png";
import AltRouteIcon from "@mui/icons-material/AltRoute";

// Icons Import
import LogoutIcon from "@mui/icons-material/Logout";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CarIcon from "@mui/icons-material/DirectionsCarFilled";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import CreditCardOffOutlinedIcon from "@mui/icons-material/CreditCardOffOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADMIN_LOGOUT } from "../../redux/reducer/reduxNamings";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  component: React.ReactNode;
  className?: string;
}

export default function AdminSidebar(props: Props) {
  const { window, component } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch<any>();

  const adminSidebarLinks = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    // {
    //   label: "Live Chat",
    //   link: "/chat",
    //   icon: <MailOutlinedIcon />,
    // },
    { label: "Users", link: "/users", icon: <GroupOutlinedIcon /> },
    {
      label: "Instructors",
      link: "/instructors",
      icon: <DirectionsCarFilledOutlinedIcon />,
    },
    {
      label: "Bookings",
      link: "/bookings",
      icon: <LibraryBooksOutlinedIcon />,
    },
    {
      label: "Instructor Applicants",
      link: "/instructor-applicants",
      icon: <ReceiptLongIcon />,
    },
    {
      label: "Expired Instructors",
      link: "/expired-instructors",
      icon: <CreditCardOffOutlinedIcon />,
    },
    {
      label: "Suburbs",
      link: "/suburbs",
      icon: <AltRouteIcon />,
    },
    {
      label: "Cars",
      link: "/cars",
      icon: <CarIcon />,
    },
    {
      label: "Agreement",
      link: "/agreement",
      icon: <HandshakeIcon />,
    },
    {
      label: "Instructor Earnings",
      link: "/earnings",
      icon: <AttachMoneyIcon />,
    },
    // {
    //   label: "Fortnight Payments",
    //   link: "/fortnight-payments",
    //   icon: <PaidIcon />,
    // },
    // {
    //   label: "Sent Payments",
    //   link: "/sent-payments",
    //   icon: <PaymentsIcon />,
    // },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // admin logout
  const adminLogout = () => {
    dispatch({ type: ADMIN_LOGOUT });
  };

  const drawer = (
    <div>
      <Link to={"/admin/dashboard"}>
        <img
          src={logo}
          alt=""
          style={{
            width: "100%",
            padding: "25px",
          }}
        />
      </Link>
      <Divider />
      <List>
        {adminSidebarLinks.map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link to={`/admin${text.link}`} style={{ textDecoration: "none", color: "unset", width: "100%" }}>
              <ListItemButton>
                {" "}
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text?.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <ListItem disablePadding onClick={adminLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Instructor Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // background: "#f7f7f7",
          height: "100%",
        }}
      >
        <Toolbar />
        <div className={props.className && "dashbaord__content-wrapper"}>{component}</div>
      </Box>
    </Box>
  );
}

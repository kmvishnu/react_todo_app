import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Hooks/useUser";
import { useTodo } from "../../Hooks/useTodo";

import {
  StyledFab,
  StyledPopoverContent,
  StyledAvatar,
  TodoItem,
  ActionBox,
  ActionIconButton,
} from "../../styles";
import { Button } from "@mui/material";

export default function Home() {
  const name = useSelector((state) => state.user.user);
  const { logoutUser } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { todos } = useTodo();
  const [actionAnchorEl, setActionAnchorEl] = React.useState(null);
  const [selectedTodo, setSelectedTodo] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleActionClick = (event, todo) => {
    setSelectedTodo(todo);
    setActionAnchorEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedTodo(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const actionOpen = Boolean(actionAnchorEl);
  const actionId = actionOpen ? "action-popover" : undefined;

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{
          p: 2,
          pb: 0,
          position: "sticky",
          top: 0,
          bgcolor: "white",
          zIndex: 1,
        }}
      >
        Today
      </Typography>

      <Box sx={{ padding: "20px" }}>
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
          }}
        >
          {todos.map((todo) => (
            <React.Fragment key={todo._id}>
              <TodoItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="more"
                    onClick={(event) => handleActionClick(event, todo)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#3f51b5" }}>
                    <Typography variant="caption" color="white">
                      {todo.name.charAt(0)}
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={todo.name}
                  secondary={
                    <React.Fragment>{` - ${todo.details}`}</React.Fragment>
                  }
                />
              </TodoItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, bgcolor: "white" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            sx={{ color: "black" }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <StyledFab aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <StyledPopoverContent>
          <StyledAvatar
            alt={name}
            src="/static/images/avatar/default-avatar.png"
          />
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome back!
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </StyledPopoverContent>
      </Popover>
      <Popover
        id={actionId}
        open={actionOpen}
        anchorEl={actionAnchorEl}
        onClose={handleActionClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ActionBox>
          <ActionIconButton className="done" onClick={handleActionClose}>
            <DoneIcon />
          </ActionIconButton>
          <ActionIconButton className="view" onClick={handleActionClose}>
            <VisibilityIcon />
          </ActionIconButton>
          <ActionIconButton className="edit" onClick={handleActionClose}>
            <EditIcon />
          </ActionIconButton>
          <ActionIconButton className="delete" onClick={handleActionClose}>
            <DeleteIcon />
          </ActionIconButton>
          <ActionIconButton className="close" onClick={handleActionClose}>
            <CloseIcon />
          </ActionIconButton>
        </ActionBox>
      </Popover>
    </React.Fragment>
  );
}

import { Box, Container, FormControl, IconButton, Select, MenuItem, Typography, useTheme, Tooltip, Avatar, Menu, Divider, ListItemIcon } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorModeContext = useContext(ColorModeContext);
  const navigate = useNavigate()
  const [firstLetter, setfirstLetter] = useState('')
  const [name, setname] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    navigate('/', { replace: true })
    localStorage.removeItem('userColor')
    localStorage.removeItem('token')
  }


  const profile = () => {
    navigate('/profileUser')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (typeof token !== "string") {
      toast.error('Invalid token specified: must be a string')
      return
    }
    const getName = jwtDecode(token)
    setname(getName.name)
    if (name) {
      const letter = name.split('')[0]
      setfirstLetter(letter)
    }
  }, [name, firstLetter])


  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
      <Box sx={{ display: "flex", borderRadius: "3px", background: colors.primary[400] }}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Búsqueda"></InputBase>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={colorModeContext.toggleColorMode} sx={{ flex: 1 }}>
          {
            theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )
          }
        </IconButton>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{firstLetter}</Avatar>
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            background: theme.palette.mode === 'dark' ? colors.primary[600] : 'white',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={profile}>
          <Avatar /> Visualizar perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesion
        </MenuItem>

      </Menu>
      </Box>
     
    </Box>
  );
};

export default Topbar;

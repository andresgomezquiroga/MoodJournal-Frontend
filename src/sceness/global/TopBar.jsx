import { Box, Container, FormControl, IconButton, Select, MenuItem, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorModeContext = useContext(ColorModeContext);
  const navigate = useNavigate()

  const logout = () => {
    navigate('/', { replace: true })
  }

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
        <FormControl variant="outlined" sx={{ ml: 2 }} >
          <Select
          value=""
            displayEmpty
            sx={{ minWidth: 50 }}>
            <MenuItem value="" disabled>
              <ClearAllIcon />
            </MenuItem>
            <MenuItem>
              <Person2Icon sx={{ mr: 1 }} />
              Visualizar perfil
            </MenuItem>
            <MenuItem onClick={logout}>
              <LogoutIcon color="red" sx={{ mr: 1 }} />
              Cerrar sesión
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Topbar;

import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { ListAltOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState('Dashboard');
  const [firstLetter, setfirstLetter] = useState('')
  const [colorRandomUser, setcolorRandomUser] = useState('')
  const [selectImage, setselectImage] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (typeof token !== "string") {
      toast.error('Invalid token specified: must be a string')
      return
    }

    try {
      const decode = jwtDecode(token);
      setName(decode.name);
      setLastName(decode.last_name);
      setEmail(decode.email);
      setselectImage(decode.image)
    } catch (error) {
      toast.error('Error al decodificar el token');
    }
  }, []);

  useEffect(() => {
    if (name) {
      const firstLetterUser = name.split('')[0]
      setfirstLetter(firstLetterUser)
    }
  }, [name])
  const COLORS = [
    'blue',
    'green',
    'purple',
    'red',
    'yellow',
    'orange',
    'pink',
    'teal',
    'cyan',
    'lime',
    'indigo',
    'brown',
    'grey'
  ];

  useEffect(() => {
    const getColor = localStorage.getItem('userColor')
    if (getColor) {
      setcolorRandomUser(getColor)
    }
    else if (COLORS.length > 0) {
      const colorRandom = Math.floor(Math.random() * COLORS.length)
      const newColor = COLORS[colorRandom]
      setcolorRandomUser(newColor)
      localStorage.setItem('userColor', newColor)
    }
  }, [COLORS])

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Typography variant='h3' color={colors.grey[100]}>
                  ADMINISTRADOR
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                {selectImage ? (
                  <img src={selectImage} alt="" style={{cursor: 'pointer', borderRadius: '50%', width: '100px', height: '100px', fontSize: '50px'}}/>
                ) : (
                  <Avatar sx={{ bgcolor: colorRandomUser, cursor: 'pointer', borderRadius: '50%', width: '100px', height: '100px', fontSize: '50px' }}>
                    {firstLetter}</Avatar>
                )}

              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h2'
                  color={colors.grey[100]}
                  fontWeight='bold'
                  sx={{ m: '10px 0 0 0' }}
                >
                  {name || 'Loading...'}
                </Typography>
                <Typography variant='h5' color={colors.greenAccent[500]}>
                  {lastName || 'Loading...'}
                </Typography>
                <Typography variant='h5' color={colors.greenAccent[500]}>
                  {email || 'Loading...'}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Pagina principal'
              to='/dashboard'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h6'
              color={colors.grey[300]}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Usuarios
            </Typography>
            <SubMenu
              title="Usuarios"
              icon={<PeopleOutlinedIcon />}
              style={{ color: colors.grey[100] }}
            >
              <Item
                title='Crear usuario'
                to='/createUser'
                icon={<AddIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Listar usuarios'
                to='/listUser'
                icon={<ListAltOutlined />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

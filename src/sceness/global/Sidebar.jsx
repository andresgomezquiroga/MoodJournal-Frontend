import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

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
  const [selected, setSelected] = useState('Dashboard');

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
                  ADMINIS
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
                <img
                  alt='profile-user'
                  width='100px'
                  height='100px'
                  src="data:image/jpeg;base64,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"
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h2'
                  color={colors.grey[100]}
                  fontWeight='bold'
                  sx={{ m: '10px 0 0 0' }}
                >
                  Ed Roh
                </Typography>
                <Typography variant='h5' color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h6'
              color={colors.grey[300]}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Data
            </Typography>
            <Item
              title='Manage Team'
              to='/team'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Contacts Information'
              to='/contacts'
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Invoices Balances'
              to='/invoices'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h6'
              color={colors.grey[300]}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Pages
            </Typography>
            <Item
              title='Profile Form'
              to='/form'
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Calendar'
              to='/calendar'
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='FAQ Page'
              to='/faq'
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant='h6'
              color={colors.grey[300]}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Charts
            </Typography>
            <Item
              title='Bar Chart'
              to='/bar'
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Pie Chart'
              to='/pie'
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Line Chart'
              to='/line'
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Geography Chart'
              to='/geography'
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

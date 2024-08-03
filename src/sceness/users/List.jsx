import { useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import { Box, Button, Fade, Modal, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ApisAxios } from '../../api/ApiAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { GridToolbar } from '@mui/x-data-grid';

const List = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userArray, setUserArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleOpen = (id) => {
    setUserIdToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setUserIdToDelete(null);
    setOpen(false);
  };

  const getAllUser = async () => {
    try {
      const response = await ApisAxios.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserArray(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await ApisAxios.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const filterId = userArray.filter(userId => userId.id !== id);
      if (filterId) {
        toast.success(response.data.message);
        setUserArray(filterId);
        handleClose(); // Close the modal after successful deletion
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response: ', error.response.data);
        toast.warn(error.response.data.error || 'Error no encontrado');
      } else if (error.request) {
        console.log('Error de la request: ', error.response.data);
        toast.error('No se ha recibido la solicitud');
      } else {
        console.log(error);
        toast.error('Hubo un error al crear el usuario');
      }
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: theme.palette.mode === 'dark' ? colors.primary[500] : 'white',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const columnData = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: "last_name",
      headerName: "Apellidos",
      flex: 1,
      cellClassName: "last_name-column--cell"
    },
    {
      field: "age",
      headerName: "Edad",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "last_name-column--cell"
    },
    {
      field: "email",
      headerName: "Correo electronico",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Box display="center" justifyContent="center" alignItems="center">
            <Button variant="contained"><EditIcon /> Editar</Button>
            <Button variant="outlined" color='error' onClick={() => handleOpen(id)}><DeleteForeverIcon />Eliminar</Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                style: {
                  background: 'rgba(0, 0, 0, 0.145)',
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h2" component="h2" color={colors.greenAccent[400]}>
                    Confirmar eliminación
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }} variant='h5' marginBottom={3}>
                    Esta acción es irreversible. ¿Está seguro de que desea eliminar este usuario?
                  </Typography>
                  <Button variant="contained" onClick={handleClose} sx={{ marginRight: '15px' }}><CloseIcon /> Cancelar</Button>
                  <Button variant="outlined" color='error' onClick={() => deleteUser(userIdToDelete)}><DeleteForeverIcon />Eliminar</Button>
                </Box>
              </Fade>
            </Modal>
          </Box>
        );
      }
    }
  ];

  const rowData = userArray.map((item) => (
    {
      id: item.id,
      name: item.name,
      last_name: item.last_name,
      age: item.age,
      email: item.email
    }
  ));

  return (
    <Box>
      <Typography variant="h3" marginLeft={3} color={colors.greenAccent[400]}>
        Listar usuarios
      </Typography>
      <Box
        marginLeft={2}
        marginRight={2}
        height="78vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`
          },
        }}
      >
        <DataGrid
          rows={rowData}
          columns={columnData}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSize={9}
          pageSizeOptions={[5, 9, 15, 20]}
        />
      </Box>
      <ToastContainer theme='dark' />
    </Box>
  );
}

export default List;

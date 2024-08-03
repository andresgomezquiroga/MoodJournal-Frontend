import { useTheme } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { ApisAxios } from '../../api/ApiAxios'
import { Email } from '@mui/icons-material'

const List = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [userArray, setUserArray] = useState([])

  const getAllUser = async () => {
    try {
      const response = await ApisAxios.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUserArray(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUser()
  }, [])

  console.log(userArray)

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
      renderCell: () => {
        return (
          <Box display="center" justifyContent="center" alignItems="center">
            <Button variant="contained">Editar</Button>
            <Button variant="outlined" color='error'>Eliminar</Button>
          </Box>
        )
      }
    }
  ]

  const rowData = userArray.map((item) => (
    {
      id: item.id,
      name: item.name,
      last_name: item.last_name,
      age: item.age,
      email: item.email
    }
  ))

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
        }}
      >
        <DataGrid
          rows={rowData}
          columns={columnData}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSize={9}
          pageSizeOptions={[5, 9, 15, 20]}
        />
      </Box>
    </Box>
  )
}

export default List

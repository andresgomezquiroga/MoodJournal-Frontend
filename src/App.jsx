import { ThemeProvider } from "@emotion/react"
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline } from "@mui/material"
import TopBar from "./sceness/global/TopBar"
import { Route, Routes } from "react-router-dom"
import { Dashboard } from "@mui/icons-material"
import Sidebar from "./sceness/global/Sidebar"


function App() {
  const [theme, colorMode] = useMode()
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className="app">
            <Sidebar/>
            <main className="content">
              <TopBar/>
              <Routes>
                <Route path="/" element={<Dashboard/>}></Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App

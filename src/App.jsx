import { ThemeProvider } from "@emotion/react"
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline } from "@mui/material"
import { Route, Routes, useLocation } from "react-router-dom"
import Dashboard from "./sceness/Dashboard"
import { lazy, Suspense } from "react"
const Register = lazy(() => import('./sceness/Auth/Register'))
const Topbar = lazy(() => import("./sceness/global/TopBar"))
const Sidebar = lazy(() => import("./sceness/global/Sidebar"))
const Login = lazy(() => import("./sceness/Auth/Login"))
const Loading = lazy(() => import("./components/Loading"))
const ListUser = lazy(() => import('./sceness/users/List'))
const CreateUser = lazy(() => import('./sceness/users/Create'))
const ProfileUser = lazy(() => import('./sceness/users/ProfileUser'))

function App() {
  const [theme, colorMode] = useMode()
  const location = useLocation()
  const isLoginRoute = location.pathname === '/' || location.pathname === '/register'

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Loading />}>
          <div className="app">
            {!isLoginRoute && <Sidebar />}
            <main className="content">
              {!isLoginRoute && <Topbar />}
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/listUser" element={<ListUser/>}></Route>
                <Route path="/createUser" element={<CreateUser/>}></Route>
                <Route path="/profileUser" element={<ProfileUser/>}></Route>
              </Routes>
            </main>
          </div>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App

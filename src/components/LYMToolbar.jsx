import Toolbar from '@mui/material/Toolbar'

const LYMToolbar = ({ children }) => {
  return (
    <Toolbar
      sx={{ backgroundColor: 'rgb(5, 30, 52)', color: 'rgb(255, 255, 255)' }}
    >
      {children}
    </Toolbar>
  )
}

export default LYMToolbar

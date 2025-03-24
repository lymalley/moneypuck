import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import ScheduleProvider from '../../context/ScheduleContext'
import WeekSelect from '../Schedule/components/WeekSelect'
import RosterSwitch from '../Roster/components/RosterSwitch'
import useIsDevice from '../../hooks/useIsDevice'
import LYMToolbar from '../LYMToolbar'

const PageWrapper = ({ children }) => {
  const isDevice = useIsDevice()
  return (
    <ScheduleProvider>
      <AppBar>
        <LYMToolbar>
          <WeekSelect />
          <RosterSwitch />
        </LYMToolbar>
      </AppBar>
      <Box
        sx={{
          my: 6,
          display: 'flex',
          position: 'relative',
          height: '100%',
          maxHeight: '100%',
          width: '100%',
          padding: isDevice ? '50px 0px 10px 0px' : '50px 12px 50px 12px',
          justifyContent: 'center',
        }}
      >
        <Grid2 container>{children}</Grid2>
      </Box>
    </ScheduleProvider>
  )
}

export default PageWrapper

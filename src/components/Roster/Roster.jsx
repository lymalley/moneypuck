import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import ActionButtons from './components/ActionButtons'
import PlayerList from './components/PlayerList'
import NewPlayerDialog from './components/NewPlayerDialog'
import useScheduleHandler from '../../hooks/useScheduleHandler'
import RosterAnalitics from './components/RosterAnalytics'
import { rosterSpots } from '../../constants/ScheduleConstants'
import AnalyticsItem from './components/AnalyticsItem'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  overflowY: 'hidden',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))

const Roster = () => {
  const { playerDialog, roster } = useScheduleHandler().state
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <ActionButtons />
          </Grid>
          <AnalyticsItem title={`Roster (${roster.length} / ${rosterSpots})`}>
            <PlayerList />
          </AnalyticsItem>
          <AnalyticsItem title="Roster Analytics">
            <RosterAnalitics />
          </AnalyticsItem>
          <Grid size={12}></Grid>
        </Grid>
      </Box>
      {playerDialog && <NewPlayerDialog />}
    </>
  )
}

export default Roster

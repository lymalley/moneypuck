import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import useScheduleHandler from '../../../hooks/useScheduleHandler'
import { rosterSpots } from '../../../constants/ScheduleConstants'

const ActionButton = ({ disabled, label, onClick }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Button
        variant="contained"
        sx={{ backgroundColor: 'rgb(5, 30, 52)' }}
        fullWidth
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </Button>
    </Grid>
  )
}
const ActionButtons = () => {
  const { state, togglePlayerDialog, importRoster, clearRoster } =
    useScheduleHandler()
  return (
    <Grid container spacing={2}>
      <ActionButton
        disabled={state.roster.length >= rosterSpots}
        onClick={togglePlayerDialog}
        label="Add Player"
      />
      <ActionButton
        onClick={() => importRoster('malley')}
        label="Import Malleys"
      />
      <ActionButton
        onClick={() => importRoster('lauren')}
        label="Import Laurens"
      />
      <ActionButton
        disabled={state.roster.length === 0}
        onClick={clearRoster}
        label="Clear Roster"
      />
    </Grid>
  )
}

export default ActionButtons

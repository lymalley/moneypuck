import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useScheduleHandler from '../../../hooks/useScheduleHandler'
import { teams, positions } from '../../../constants/ScheduleConstants'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

const NewPlayerDialog = () => {
  const { togglePlayerDialog, addPlayer } = useScheduleHandler()
  const [teamValue, setValue] = useState('')
  const [newRosterPlayer, setNewRosterPlayer] = useState({
    team: null,
    position: [],
  })

  const resetForm = () => {
    setNewRosterPlayer({ team: null, position: [] })
    setValue('')
  }

  const handleClose = () => {
    resetForm()
    togglePlayerDialog()
  }
  useEffect(() => {
    const found =
      teamValue &&
      teamValue.length &&
      teams.find((t) => t.name.toLowerCase() === teamValue.toLowerCase())
    setNewRosterPlayer({ ...newRosterPlayer, team: found ? found : null })
  }, [teamValue])

  const selectPosition = (p) => {
    const ps = newRosterPlayer.position
    setNewRosterPlayer({
      ...newRosterPlayer,
      position: ps.includes(p) ? ps.filter((s) => s !== p) : [...ps, p],
    })
  }

  const isDisabled = (p) => {
    const forward = !['G', 'D'].includes(p)
    const defense = p === 'D'
    const goalie = p === 'G'
    const ps = newRosterPlayer.position
    const containsD = ps.includes('D')
    const containsG = ps.includes('G')
    const containsF = ps.length > 0 && !containsD && !containsG
    return (
      (containsD && !defense) ||
      (containsG && !goalie) ||
      (containsF && !forward)
    )
  }

  const handleAdd = () => {
    addPlayer(newRosterPlayer)
    resetForm()
  }
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Add Player</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={teams.map((option) => option.name)}
          id="controlled-demo"
          value={teamValue}
          blurOnSelect
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          renderInput={(params) => (
            <TextField {...params} label="Teams" variant="standard" fullWidth />
          )}
        />
        <FormGroup>
          {positions.map((p, i) => (
            <FormControlLabel
              key={`position_${p}_${i}`}
              control={
                <Checkbox
                  disabled={
                    newRosterPlayer.position.length > 0 && isDisabled(p)
                  }
                  checked={newRosterPlayer.position.includes(p)}
                  onChange={() => selectPosition(p)}
                />
              }
              label={p}
            />
          ))}
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            handleAdd()
          }}
          disabled={
            newRosterPlayer.team === null ||
            newRosterPlayer.position.length === 0
          }
        >
          Add Player
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default NewPlayerDialog

import Close from '@mui/icons-material/Close'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import useScheduleHandler from '../../../hooks/useScheduleHandler'
import { blue, green, pink } from '@mui/material/colors'

const PlayerListItem = ({ player, ind }) => {
  const { removePlayer } = useScheduleHandler()
  const position = player.position
  const defense = position[0] === 'D'
  const goalie = position[0] === 'G'
  const forward = !['D', 'G'].includes(position[0])
  const color = goalie ? blue[500] : defense ? green[500] : pink[300]

  const handleRemove = () => {
    removePlayer(ind)
  }
  const pos = forward ? ` - ${position.join('/')}` : ''
  return (
    <ListItem dense divider sx={{ backgroundColor: 'white', color: 'black' }}>
      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: color, width: 24, height: 24, fontSize: '16px' }}
        >
          {forward ? 'F' : position}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${player.team.name}${pos}`} />
      <IconButton size="small" onClick={handleRemove}>
        <Close edge="end" fontSize="12px" />
      </IconButton>
    </ListItem>
  )
}

export default PlayerListItem

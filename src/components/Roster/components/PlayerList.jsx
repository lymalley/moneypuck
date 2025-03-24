import List from '@mui/material/List'
import useScheduleHandler from '../../../hooks/useScheduleHandler'
import PlayerListItem from './PlayerListItem'

const PlayerList = () => {
  const { roster } = useScheduleHandler().state
  return (
    <List dense>
      {roster.map((player, ind) => (
        <PlayerListItem key={`roster${ind}`} ind={ind} player={player} />
      ))}
    </List>
  )
}

export default PlayerList

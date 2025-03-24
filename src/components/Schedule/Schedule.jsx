import ScheduleTable from './components/ScheduleTable'
import Roster from '../Roster/Roster'
import useScheduleHandler from '../../hooks/useScheduleHandler'

const GamesSchedule = () => {
  const { showRoster } = useScheduleHandler().state
  return (
    <>
      {showRoster && <Roster />}
      <ScheduleTable />
    </>
  )
}

export default GamesSchedule

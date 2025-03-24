import useScheduleHandler from '../../../hooks/useScheduleHandler'
import LYMTableProvider from '../../../context/LYMTableContext'
import LYMTable from '../../LYMTable/LYMTable'
import { TableType } from '../../../constants/LYMTableConstants'
import useIsDevice, { deviceSize } from '../../../hooks/useIsDevice'
import { useMemo } from 'react'

const ScheduleTable = () => {
  const { state } = useScheduleHandler()
  const { weeklyData, weekSelected, isLoading, currentWeek } = state
  const isDevice = useIsDevice()
  const isSmallDevice = useIsDevice(deviceSize.sm)
  const checkDay = (row, d) => {
    const found = row.games.find((game) => {
      const gd = new Date(game.gameDate)
      const day = gd.getDay()
      return day === d
    })
    return found ? found.opponent : ''
  }

  const getRemaining = (row) => {
    const remaining = row.games.filter(
      (g) => g.gameState === 'FUT' || g.gameState === 'PRE'
    )
    return remaining.length
  }
  const columns = useMemo(() => {
    const checkDeviceDay = (row, d) => {
      const str = checkDay(row, d)
      const days = ['M', 'T', 'W', 'H', 'F', 'S', 'N']
      return str.length === 0 ? str : days[d]
    }
    const getDayString = (d) => (!isDevice ? d : d.toLowerCase())
    return [
      {
        id: 'team',
        label: 'Team',
        isSortable: true,
        getValue: (row) => (isDevice ? row.abbrev : row.commonName),
        align: 'left',
      },
      {
        id: 'monday',
        label: getDayString('Mon'),
        isSortable: true,
        getValue: (row) => checkDay(row, 0),
        getDeviceValue: (row) => checkDeviceDay(row, 0),
        reverseSort: true,
      },
      {
        id: 'tuesday',
        label: getDayString('Tues'),
        isSortable: true,
        getValue: (row) => checkDay(row, 1),
        getDeviceValue: (row) => checkDeviceDay(row, 1),
        reverseSort: true,
      },
      {
        id: 'wednesday',
        label: getDayString('Wed'),
        isSortable: true,
        getValue: (row) => checkDay(row, 2),
        getDeviceValue: (row) => checkDeviceDay(row, 2),
        reverseSort: true,
      },
      {
        id: 'thursday',
        label: getDayString('Thur'),
        isSortable: true,
        getValue: (row) => checkDay(row, 3),
        getDeviceValue: (row) => checkDeviceDay(row, 3),
        reverseSort: true,
      },
      {
        id: 'friday',
        label: getDayString('Fri'),
        isSortable: true,
        getValue: (row) => checkDay(row, 4),
        getDeviceValue: (row) => checkDeviceDay(row, 4),
        reverseSort: true,
      },
      {
        id: 'saturday',
        label: getDayString('Sat'),
        isSortable: true,
        getValue: (row) => checkDay(row, 5),
        getDeviceValue: (row) => checkDeviceDay(row, 5),
        reverseSort: true,
      },
      {
        id: 'sunday',
        label: getDayString('Sun'),
        isSortable: true,
        getValue: (row) => checkDay(row, 6),
        getDeviceValue: (row) => checkDeviceDay(row, 6),
        reverseSort: true,
      },
      {
        id: 'total',
        label: isSmallDevice ? 'games' : 'Games',
        isSortable: true,
        getValue: (row) => row.games.length,
        reverseSort: true,
      },
      {
        id: 'remaining',
        label: isSmallDevice ? 'rmng' : 'Remaining',
        isSortable: true,
        getValue: getRemaining,
        reverseSort: true,
      },
    ]
  }, [isDevice, isSmallDevice])

  const weekValue = weekSelected || currentWeek || 0

  return (
    <LYMTableProvider>
      <LYMTable
        tableType={TableType.SCHEDULE}
        columns={columns}
        data={weeklyData}
        title={`Week ${weekValue} Schedule`}
        isLoading={isLoading}
      />
    </LYMTableProvider>
  )
}

export default ScheduleTable

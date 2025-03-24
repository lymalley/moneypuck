import { useLayoutEffect } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import useScheduleHandler from '../../../hooks/useScheduleHandler'
import Typography from '@mui/material/Typography'
import { scheduleWeeks } from '../../../constants/ScheduleConstants'
import useIsDevice, { deviceSize } from '../../../hooks/useIsDevice'

export default function WeekSelect() {
  const isDevice = useIsDevice(deviceSize.sm)
  const { state, selectWeek } = useScheduleHandler()
  const { weekSelected, currentWeek, weeks } = state

  useLayoutEffect(() => {
    selectWeek(currentWeek)
  }, [])

  const handleChange = (event) => {
    selectWeek(event.target.value)
  }
  const weekValue = weekSelected || currentWeek || scheduleWeeks[0].id
  const weekInfo = scheduleWeeks.find((w) => w.id === weekValue)
  const formatDate = (date) => {
    const newDate = new Date(date)
    const d = newDate.getDate()
    newDate.setDate(d + 1)
    return newDate.toDateString()
  }
  return (
    <>
      <Box sx={{ width: 200, paddingRight: '8px' }}>
        <FormControl fullWidth>
          <Select
            labelId="week-select-label"
            id="week-select"
            value={weekValue}
            displayEmpty
            onChange={handleChange}
            sx={{ backgroundColor: 'white', height: '40px' }}
          >
            {weeks.map((week) => (
              <MenuItem key={`week${week.id}`} value={week.id}>{`Week ${
                week.id
              }${week.current ? ' (Current)' : ''}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {!isDevice ? (
        <Typography sx={{ flexGrow: 1 }}>
          {formatDate(weekInfo.startDate)} - {formatDate(weekInfo.endDate)}
        </Typography>
      ) : (
        <div style={{ flexGrow: 1 }}></div>
      )}
    </>
  )
}

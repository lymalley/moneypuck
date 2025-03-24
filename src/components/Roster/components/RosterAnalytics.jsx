import useRosterAnalytics from '../../../hooks/useRosterAnalytics'
import useScheduleHandler from '../../../hooks/useScheduleHandler'
import DayAnalytics from './DayAnalytics'
import TotalCount from './TotalCount'

const RosterAnalitics = () => {
  const { state } = useScheduleHandler()
  const analytics = useRosterAnalytics(state)
  let totalCount = 0
  let totalOverflow = 0

  analytics.forEach((an) => {
    totalCount = totalCount + an.dailyTotal
    totalOverflow = totalOverflow + an.overflow.length
  })
  return (
    <>
      <div style={{ height: '15px' }} />
      <div style={{ padding: '0px 12px 12px 12px' }}>
        <TotalCount
          txt="Total"
          header
          count={totalCount}
          overflow={totalOverflow}
        />
      </div>
      {analytics.map((d) => (
        <DayAnalytics dayAnalytics={d} />
      ))}
    </>
  )
}

export default RosterAnalitics

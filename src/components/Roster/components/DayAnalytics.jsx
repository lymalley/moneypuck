import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TotalCount from './TotalCount'
import { experimentalStyled as styled } from '@mui/material/styles'

const DayComponent = styled(Paper)(() => ({
  backgroundColor: '#fff',
  color: 'rgba(0, 0, 0, 0.87)',
  borderRadius: 0,
}))

const Stat = ({ stat, pos, err }) => {
  const color = err ? 'error' : 'textPrimary'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '4px 0px',
      }}
    >
      <Typography
        color={color}
        sx={{ width: '140px', textAlign: 'left' }}
        variant="body1"
      >
        {stat}:
      </Typography>
      <Typography color={color} variant="subtitle2" sx={{ textAlign: 'left' }}>
        {pos.join(' - ')}
      </Typography>
    </div>
  )
}

const DayAnalytics = ({ dayAnalytics }) => {
  const {
    day,
    dailyTotal: games,
    open: notFilledPositions,
    overflow: playerOverFlow,
  } = dayAnalytics
  return (
    <DayComponent>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          display: 'flex',
          height: '48px',
          padding: '0px 16px',
        }}
      >
        <TotalCount txt={day} count={games} overflow={playerOverFlow.length} />
      </div>
      <div
        style={{
          padding: '16px 0px',
          border: 'solid rgba(0, 0, 0, 0.12) 0.5px',
          backgroundColor: '#F6F6F7',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 16px',
          }}
        >
          <Stat
            stat="Open Positions"
            pos={notFilledPositions}
            alignItems="flex-start"
          />
          {playerOverFlow.length > 0 && (
            <Stat stat="Overflow" pos={playerOverFlow} err />
          )}
        </div>
      </div>
    </DayComponent>
  )
}

export default DayAnalytics

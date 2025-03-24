import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Fragment } from 'react'
const rectangle = <Box component="span" sx={{ width: 10, height: 20 }} />

const Wrapper = ({ children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </div>
)
const TotalCount = ({ txt, count, overflow, header }) => {
  const CW = header ? Wrapper : Fragment
  const showBadge = overflow > 0
  return (
    <CW>
      <Typography component="span" variant="h5">
        {txt}
      </Typography>
      {!header && <span style={{ flexGrow: 1 }}></span>}
      <div
        style={{
          paddingRight: header ? '12px' : '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">{count - overflow}</Typography>
        <Badge color="error" invisible={!showBadge} badgeContent={overflow}>
          {rectangle}
        </Badge>
      </div>
    </CW>
  )
}
export default TotalCount

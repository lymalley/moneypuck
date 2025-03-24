import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useIsDevice, { deviceSize } from '../../../hooks/useIsDevice'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  paddingTop: theme.spacing(1),
  textAlign: 'center',
  overflowY: 'hidden',
}))
const AnalyticsItem = ({ children, title }) => {
  const isDevice = useIsDevice(deviceSize.sm)
  const sx = !isDevice ? { overflowY: 'scroll', maxHeight: '500px' } : {}
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Item
        sx={{
          height: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'rgb(5, 30, 52)',
          color: 'rgb(255, 255, 255)',
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <div style={sx}>{children}</div>
      </Item>
    </Grid>
  )
}

export default AnalyticsItem

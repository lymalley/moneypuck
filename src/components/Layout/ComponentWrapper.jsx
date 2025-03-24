import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))
const ComponentWrapper = ({ children }) => {
  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <Item>{children}</Item>
    </Grid>
  )
}

export default ComponentWrapper

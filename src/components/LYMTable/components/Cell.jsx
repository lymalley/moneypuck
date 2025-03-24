import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import useIsDevice from '../../../hooks/useIsDevice'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(5, 30, 52)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const Cell = ({ align = 'right', children, sortDirection, sx }) => {
  const isDevice = useIsDevice()
  return (
    <StyledTableCell
      sx={sx}
      align={isDevice ? 'center' : align}
      sortDirection={sortDirection}
    >
      {children}
    </StyledTableCell>
  )
}

export default Cell

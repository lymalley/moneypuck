import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import useTableHandler from '../../../hooks/useTableHandler'
import Cell from './Cell'
import useIsDevice from '../../../hooks/useIsDevice'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const Row = ({ row }) => {
  const isDevice = useIsDevice()
  const { state } = useTableHandler()
  const { visibleCols } = state
  const getCellData = (col) => {
    const defaultData = row[col.id] || '-'
    return isDevice && col.getDeviceValue
      ? col.getDeviceValue(row)
      : col.getValue
      ? col.getValue(row)
      : defaultData
  }
  return (
    <StyledTableRow>
      {visibleCols.map((col, ind) => (
        <Cell
          sx={col.sx}
          align={col.align}
          key={`tableRow-col${col.id}-${ind}`}
        >
          {getCellData(col)}
        </Cell>
      ))}
    </StyledTableRow>
  )
}

export default Row

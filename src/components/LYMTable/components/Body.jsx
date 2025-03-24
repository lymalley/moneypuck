import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import useTableHandler from '../../../hooks/useTableHandler'
import Row from './Row'

const TableMessage = ({ msg }) => {
  const { visibleCols } = useTableHandler().state
  return (
    <TableRow>
      <TableCell colSpan={visibleCols.length}>{msg}</TableCell>
    </TableRow>
  )
}

const Body = () => {
  const { rows } = useTableHandler().state

  return (
    <TableBody>
      {!rows ? (
        <TableMessage msg={'Loading...'} />
      ) : rows && rows.length > 0 ? (
        rows.map((row, ind) => <Row key={`bodyDataRow${ind}`} row={row} />)
      ) : (
        <TableMessage msg="No Data to Diplay" />
      )}
    </TableBody>
  )
}

export default Body

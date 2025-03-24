import Box from '@mui/material/Box'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import useTableHandler from '../../../hooks/useTableHandler'
import Cell from './Cell'
import { visuallyHidden } from '@mui/utils'
import { sortDir } from '../../../constants/LYMTableConstants'

const HeaderCell = ({ headerCell, isDevice }) => {
  const { createSortHandler, state } = useTableHandler()
  const { orderBy, orderDirection } = state
  const isOrderedBy = orderBy && orderBy === headerCell.id
  const defaultSort = headerCell.reverseSort ? sortDir.desc : sortDir.asc
  return (
    <Cell
      align={headerCell.align}
      sortDirection={isOrderedBy ? orderDirection : false}
    >
      <span
        active={isOrderedBy}
        direction={isOrderedBy ? orderDirection : 'asc'}
        role="button"
        style={isDevice ? { paddingLeft: '4px', paddingRight: '4px' } : {}}
        onClick={() => createSortHandler(headerCell.id, defaultSort)}
      >
        {headerCell.label}{' '}
        {isOrderedBy ? (
          <Box component="span" sx={visuallyHidden}>
            {orderDirection === 'desc'
              ? 'sorted descending'
              : 'sorted ascending'}
          </Box>
        ) : null}
      </span>
    </Cell>
  )
}

const Header = ({ isDevice }) => {
  const { visibleCols } = useTableHandler().state
  return (
    <TableHead>
      <TableRow>
        {visibleCols.map((headerCell) => (
          <HeaderCell
            key={`headerCell${headerCell.id}`}
            headerCell={headerCell}
            isDevice={isDevice}
          />
        ))}
      </TableRow>
    </TableHead>
  )
}

export default Header

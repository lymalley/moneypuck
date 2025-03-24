import { useEffect, useRef } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import useTableHandler from '../../hooks/useTableHandler'
import Body from './components/Body'
import Header from './components/Header'
import Box from '@mui/material/Box'
import TableToolbar from './components/TableToolbar'
import usePrint from '../../hooks/usePrint'
import useIsDevice, { deviceSize } from '../../hooks/useIsDevice'

const LYMTable = ({ columns, data, tableType, title, isLoading }) => {
  const isDevice = useIsDevice(deviceSize.sm)
  const { state, initialLoad, setBodyData, setLYMTableState } =
    useTableHandler()
  const tableRef = useRef(null)
  const handlePrint = usePrint(tableRef)
  useEffect(() => {
    initialLoad({ columns, tableType, title })
  }, [])
  useEffect(() => {
    if (data && !isLoading) setBodyData(data)
  }, [data, isLoading])
  useEffect(() => {
    if (state.title !== title) setLYMTableState({ title })
  }, [title])
  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={isDevice ? 1 : 2}
        sx={{ width: '100%', overflow: 'hidden' }}
      >
        <TableToolbar handlePrint={handlePrint} />
        <TableContainer ref={tableRef}>
          <Table
            padding={isDevice ? 'none' : 'normal'}
            stickyHeader
            aria-label={`${title} table`}
          >
            <Header isDevice={isDevice} />
            <Body />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default LYMTable

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useTableHandler from '../../../hooks/useTableHandler'
import ColumnsFilter from './ColumnsFilter'
import { Print } from '@mui/icons-material'
import useIsDevice, { deviceSize } from '../../../hooks/useIsDevice'
import LYMToolbar from '../../LYMToolbar'

const TableToolbar = ({ handlePrint }) => {
  const isDevice = useIsDevice(deviceSize.sm)
  const { state } = useTableHandler()
  const { title } = state
  return (
    <LYMToolbar>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
      <ColumnsFilter />
      {!isDevice && (
        <IconButton sx={{ color: 'white' }} onClick={handlePrint}>
          <Print />
        </IconButton>
      )}
    </LYMToolbar>
  )
}

export default TableToolbar

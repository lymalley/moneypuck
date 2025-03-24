import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import { ViewColumn } from '@mui/icons-material'
import useTableHandler from '../../../hooks/useTableHandler'
import useIsDevice from '../../../hooks/useIsDevice'

const ColumnsFilter = () => {
  const isDevice = useIsDevice()
  const { state, hideColumns } = useTableHandler()
  const { hiddenColumns, columns } = state
  const [anchorEl, setAnchorEl] = useState(null)
  const [hiddenCols, setHiddenCols] = useState([])
  const menu = Boolean(anchorEl)
  const handleToggleFilters = (event) => {
    setHiddenCols(hiddenColumns || [])
    setAnchorEl(event.currentTarget)
  }
  const handleCloseFilters = () => {
    setAnchorEl(null)
    setHiddenCols([])
  }

  const handleClickCheckbox = (event) => {
    const checked = event.target.checked
    const id = event.target.id
    setHiddenCols(
      !checked ? [...hiddenCols, id] : hiddenCols.filter((hc) => hc !== id)
    )
  }

  const applyColumns = () => {
    hideColumns(hiddenCols)
    handleCloseFilters()
  }
  const buttonAttributes = {
    'aria-label': 'columns filters',
    id: 'filters-button',
    onClick: handleToggleFilters,
    'aria-controls': menu ? 'columnsFilters' : undefined,
    'aria-haspopup': 'true',
    'aria-expanded': menu ? 'true' : undefined,
  }
  return (
    <>
      {isDevice ? (
        <IconButton sx={{ color: 'white' }} {...buttonAttributes}>
          <ViewColumn />
        </IconButton>
      ) : (
        <Button color="white" startIcon={<ViewColumn />} {...buttonAttributes}>
          Columns
        </Button>
      )}
      {menu && (
        <Menu
          anchorEl={anchorEl}
          id="columnsFilters"
          open={menu}
          onClose={handleCloseFilters}
          sx={{ padding: 0 }}
        >
          <div className="columnsFiltersContainer">
            <fieldset className="columnsFilterMenu">
              {columns.map(
                (col, ind) =>
                  ind !== 0 && (
                    <FormControlLabel
                      key={`columnsFilterMenu-${ind}`}
                      control={
                        <Checkbox
                          checked={!hiddenCols.includes(col.id)}
                          onChange={handleClickCheckbox}
                          key={`columnsFilterMenu-${col.id}`}
                          id={col.id}
                        />
                      }
                      label={col.label}
                    />
                  )
              )}
            </fieldset>
            <div className="columnsFiltersFooter">
              <Button onClick={applyColumns} variant="contained">
                Apply
              </Button>
            </div>
          </div>
        </Menu>
      )}
    </>
  )
}

export default ColumnsFilter

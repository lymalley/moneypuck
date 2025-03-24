import { useContext, useMemo } from "react"
import { LYMTableContext, LYMTableDispatchContext, TableAction, sortDir } from "../constants/LYMTableConstants";


const useTableHandler = () => {
    const dispatch = useContext(LYMTableDispatchContext);
    const state = useContext(LYMTableContext);
    const { columns, hiddenColumns, orderBy, orderDirection, bodyData} = state;
    const getVisibleColumns = (cols, hidden) => {
        const vcs = hidden ? cols.filter((col) => !hidden.includes(col.id)) : cols
        const b = vcs.filter((col) => !col.hidden)
        return b
      }
    
    const visibleCols = useMemo(() => {
        const vc = getVisibleColumns(columns, hiddenColumns);
        return vc
    }, [columns, hiddenColumns])

    function descendingComparator(a, b, orderById) {
        const target = c => columns.find(c => c.id === orderById).getValue(c)
        if (target(b)< target(a)) {
          return -1;
        }
        if (target(b) > target(a)) {
          return 1;
        }
        return 0;
      }
      
      function getComparator(order, orderById) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderById)
          : (a, b) => -descendingComparator(a, b, orderById);
      }

    
    const setSort = (orderById, defaultSort) => {
        const isAsc = (orderBy && orderBy === orderById && orderDirection === sortDir.asc) || defaultSort === sortDir.desc;
        dispatch({type: TableAction.SET_SORT, payload: { orderBy: orderById, direction: isAsc ? sortDir.desc : sortDir.asc }})}
    
    const rows = useMemo(() => {
        return orderBy && bodyData && bodyData.length > 0 ? [...bodyData].sort(getComparator(orderDirection, orderBy)): bodyData}, [bodyData, orderBy, orderDirection])
    return {
        state: {...state, visibleCols, rows },
        initialLoad: (payload) => {
            dispatch({ type: TableAction.INIT, payload });
        },
        setBodyData: (data) =>  {
            dispatch({ type: TableAction.SET_DATA, payload: data })},
        hideColumns: (hcs) => dispatch({ type: TableAction.HIDE_COLUMNS, payload: hcs }),
        setColumns: (cols) => dispatch({ type: TableAction.SET_COLUMNS, payload: cols }),
        createSortHandler: (id, defaultSort) => {
           
            setSort(id, defaultSort)
        },
        setLYMTableState: (payload) => dispatch({ type: TableAction.SET_LYM_TABLE_STATE, payload})    };
};

export default useTableHandler
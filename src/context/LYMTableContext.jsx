import React, { useReducer } from 'react'
import {
  LYMTableContext,
  LYMTableDispatchContext,
  TableAction,
  initialState,
} from '../constants/LYMTableConstants'

const tableReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case TableAction.SET_DATA:
      return {
        ...state,
        bodyData: payload,
        loading: false,
      }

    case TableAction.INIT:
      return {
        ...state,
        ...payload,
      }
    case TableAction.HIDE_COLUMNS:
      return {
        ...state,
        hiddenColumns: payload,
      }
    case TableAction.SET_COLUMNS:
      return {
        ...state,
        columns: payload,
      }
    case TableAction.SET_SORT:
      return {
        ...state,
        orderBy: payload.orderBy,
        orderDirection: payload.direction,
      }

    default:
      return state
  }
}

const LYMTableProvider = ({ children, initProps }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState)
  const newState = {
    ...state,
    ...initProps,
  }
  return (
    <LYMTableContext.Provider value={newState}>
      <LYMTableDispatchContext.Provider value={dispatch}>
        {children}
      </LYMTableDispatchContext.Provider>
    </LYMTableContext.Provider>
  )
}

export default LYMTableProvider

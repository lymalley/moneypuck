import React, { useReducer } from 'react'
import {
  Action,
  ScheduleContext,
  ScheduleDispatchContext,
  initialState,
} from '../constants/ScheduleConstants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  },
})

const scheduleReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case Action.SET_SCHEDULE_STATE:
      return {
        ...state,
        ...payload,
      }
    case Action.WEEK_SELECTED:
      return {
        ...state,
        weekSelected: payload,
      }
    case Action.SET_WEEK_DATA:
      return {
        ...state,
        data: { ...state.data, ...payload },
      }
    case Action.TOGGLE_ROSTER:
      return {
        ...state,
        showRoster: !state.showRoster,
      }

    case Action.ADD_PLAYER:
      return { ...state, roster: [...state.roster, payload] }

    case Action.REMOVE_PLAYER:
      return {
        ...state,
        roster: state.roster.filter((player, ind) => ind !== payload),
      }
    case Action.CLEAR_ROSTER:
      return { ...state, roster: [] }
    case Action.IMPORT_ROSTER:
      return { ...state, roster: payload }
    case Action.TOGGLE_PLAYER_DIALOG:
      return { ...state, playerDialog: !state.playerDialog }
    default:
      return state
  }
}

const ScheduleProvider = ({ children, initProps }) => {
  const [state, dispatch] = useReducer(scheduleReducer, initialState)
  const newState = {
    ...state,
    ...initProps,
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ScheduleContext.Provider value={newState}>
        <ScheduleDispatchContext.Provider value={dispatch}>
          {children}
        </ScheduleDispatchContext.Provider>
      </ScheduleContext.Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default ScheduleProvider

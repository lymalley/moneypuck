import { useContext, useMemo } from "react"
import { Action, ScheduleContext, ScheduleDispatchContext, scheduleWeeks } from "../constants/ScheduleConstants";
import useScheduleData from "./useScheduleData";
import { getRoster } from "../api/nhlApi";

const useScheduleHandler = () => {
    const dispatch = useContext(ScheduleDispatchContext);
    const state = useContext(ScheduleContext);
    const { weekSelected } = state;
    const { weeklyData, loading } = useScheduleData(weekSelected)

    const getWeeks = () => {
       
        const isCurrentWeek = (week) => {
          const todayStr = new Date().toLocaleDateString();
          const spl = todayStr.split('/')
          const month = Number(spl[0]) < 10 ? `0${spl[0]}` : spl[0]
          const ts = `${spl[2]}-${month}-${spl[1]}`.toString()
          const today =new Date(ts)
          const start = new Date(week.startDate);
          const end = new Date(week.endDate);
          return start <= today && end >= today
        }
        
        return scheduleWeeks.map(w => {
          return {...w, current: isCurrentWeek(w)}
        })
      }
      const weeks = getWeeks()
      const currentWeek = useMemo(() =>{
        const cw = weeks.find(w => w.current) || weeks[0]
        return cw.id
      }, [weeks])


    return {
        state: { ...state, weeks, currentWeek, weeklyData, isLoading: loading },
        selectWeek: (week) => {
            dispatch({ type: Action.WEEK_SELECTED, payload: week});
        },
        toggleRoster: () => dispatch({ type: Action.TOGGLE_ROSTER }),
        addPlayer: (player) => dispatch({ type: Action.ADD_PLAYER, payload: player}),
        removePlayer: (playerIndex) => dispatch({ type: Action.REMOVE_PLAYER, payload: playerIndex}),
        clearRoster: () => dispatch({ type: Action.CLEAR_ROSTER}),
        importRoster: async (owner) => {
          const res = await getRoster(owner)
          dispatch({ type: Action.IMPORT_ROSTER, payload: res.data})},
        togglePlayerDialog: () => dispatch({ type: Action.TOGGLE_PLAYER_DIALOG })
    };
};

export default useScheduleHandler
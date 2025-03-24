import { useEffect, useMemo, useState } from "react";
import { scheduleWeeks } from "../constants/ScheduleConstants";

const useRosterAnalytics = (props) => {
    const [analytics, setAnalytics] = useState([])
    const { weekSelected, roster, weeklyData, isLoading} = props;
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
   
      const gameDays = useMemo(() => {
       
            const days = [0, 1, 2, 3, 4, 5, 6]
            const dayStrings = [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ]
            const today = new Date()
            let d = today.getDay()-1;
            if (d === -1) d = 6;
            const filteredDays = !weekSelected || weekSelected === currentWeek ? days.filter((ds) => d <= ds) : days
            return filteredDays.map((ds) => {
              return { id: ds, day: dayStrings[ds] }
            })
      }, [weekSelected, currentWeek]);

      const analyzeDay = day => {
        const overflow = [];
        const open = [];
        const filledPosition =[]
        let filled = 0;
        const teamHasGame = weeklyData.filter((team) => team.games.find((game) => new Date(game.gameDate).getDay() === day.id)).map(t => t.name);
        const players = roster.filter((rs) => teamHasGame.includes(rs.team.name));
        const dailyTotal = players.length;
        let playersCloned = players
        const checkPos = (pos) => {
            const spots = pos === 'G' ? 2 : pos === 'D' ? 4 : 3;
            const pp = pos === 'F' ? playersCloned : playersCloned.filter(p => p.position.includes(pos));
            if (pp.length >= spots) {
                //remove
                [...Array(spots).keys()].forEach(() => filledPosition.push(pos));
                filled = filled + spots;
                [...Array(pp.length - spots).keys()].forEach(() => overflow.push(pos))
            } else {
                 //remove
                 [...Array(pp.length).keys()].forEach(() => filledPosition.push(pos));
                filled = filled + pp.length;
                [...Array(spots - pp.length).keys()].forEach(() => open.push(pos))
            }
           playersCloned = playersCloned.filter(pl => !pl.position.includes(pos))
        };
        checkPos('G');
        checkPos('D');
        const forwardPositions = ['C', 'LW', 'RW', 'F', 'F', 'F']
      
        if (playersCloned.length === 0) forwardPositions.forEach(p => open.push(p));
        else {
            const getP = p => {
                return {p, l: playersCloned.filter(r => r.position.includes(p)).length}
              }
              function compareLength(a, b) {
                return a.l - b.l
              }
              const fwds = ['C', 'LW', 'RW'].map(p => getP(p)).sort(compareLength)
              fwds.forEach(p => {
                if (p.l === 0) open.push(p.p);
                else {
                    const found = playersCloned.findIndex(pc => pc.position.includes(p.p));
                    if (found >= 0) {
                         //remove
                filledPosition.push(p.p);
                        filled = filled + 1;
                        playersCloned = playersCloned.filter((pl, ind) => ind  !== found)
                    } else open.push(p.p)
                }
              })
              
            checkPos('F')

            }
           
            return {...day, overflow, open, filled, dailyTotal, filledPosition}
      }

      useEffect(() => {
        let rg = [];
        if (weeklyData && !isLoading) {
           rg = gameDays.map((d) => {
               return analyzeDay(d)
                })
        }
        setAnalytics(rg)
      }, [weeklyData, gameDays, isLoading, roster])

    return analytics
}

export default useRosterAnalytics;
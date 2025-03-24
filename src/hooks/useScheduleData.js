import { useQueries } from "@tanstack/react-query";
import { scheduleWeeks, teams } from "../constants/ScheduleConstants";
import { getGames } from "../api/nhlApi";
import { useEffect, useState } from "react";

const useScheduleData = (week) => {
    const [weeklyData, setWeeklyData] = useState([]);
    const [isFetching, setIsFetching] = useState(false)


         const schedule = useQueries({
            queries: teams.map((team) => ({
                queryKey: ["schedule", team.abbrev],
                queryFn: () => getGames(team.abbrev),
            }))
        })

        const isDuringSelectedWeek = (gameDate, selectedWeek) => {
            const check = new Date(gameDate);
            const weekStart = new Date(selectedWeek.startDate);
            const weekEnd = new Date(selectedWeek.endDate);
            const isDuring = weekStart <= check && weekEnd >= check;
            return isDuring
        }


        const loading = !schedule || schedule.some(d => d.isLoading)
        useEffect(() => {
            const weekInfo = scheduleWeeks.find(w => w.id === week)
            if (weekInfo && schedule && !loading && !isFetching) {
                const data = []
                setIsFetching(true);
                teams.map(team => {
                    const found = schedule.find(d => d.data.team === team.abbrev);
                    const teamGames = found.data.games;
                    const filteredGames = teamGames.filter(game => isDuringSelectedWeek(game.gameDate, weekInfo));
                    const obj = {...team, games: filteredGames}
                    data.push(obj)
                })
                setWeeklyData(data)
                setIsFetching(false)
            }
        }, [week, loading])
      
        return {schedule, weeklyData, loading}
};

export default useScheduleData;
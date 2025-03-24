import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const getGameObj = (game, team) => {
    const isHomeTeam = game.homeTeam.abbrev === team;
    const {awayTeam, homeTeam, gameDate, gameState, id} = game;
    return { opponent: isHomeTeam ? `v${awayTeam.abbrev}` : `@${homeTeam.abbrev}`, id, gameDate, gameState}
  }
 
  const formatGameData = (games, team) => {
    const filteredGames = games.filter(game => {
      const gameDate = new Date(game.gameDate)
      //change for new season
      const d = new Date("2025-03-10");
      return gameDate >= d
    })
    return filteredGames.map(r => getGameObj(r, team))
  }

export const getGames =async (team) => {
    const response = await axios.get(`${url}/schedule/${team}`);
         const result = formatGameData(response.data.games, team)
         return {team, games: result}

 }

 export const getRoster = async (name) => {
  const response = await axios.get(`${url}/roster/${name}`);
  return response
 }
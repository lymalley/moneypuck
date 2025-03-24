import { createContext } from "react";

export const Action = {
    SET_WEEK_DATA: 'SET_CURRENT_WEEK',
    WEEK_SELECTED: 'WEEK_SELECTED',
    SET_SCHEDULE_STATE: 'SET_SCHEDULE_STATE',
    TOGGLE_ROSTER: 'TOGGLE_ROSTER',
    ADD_PLAYER: 'ADD_PLAYER',
    REMOVE_PLAYER: 'REMOVE_PLAYER',
    CLEAR_ROSTER: 'CLEAR_ROSTER',
    IMPORT_ROSTER: 'IMPORT_ROSTER',
    TOGGLE_PLAYER_DIALOG: 'TOGGLE_PLAYER_DIALOG'
}

export const initialState = {
    weekSelected: null,
    showRoster: false,
    roster: [],
    playerDialog: false

};

export const rosterSpots = 15;
export const rosterPositions = [
    "D", "D", "D", "D", "G", "G", "C", "LW", "RW", "F", "F", 'F'
]

export const positions = ['D', 'G', 'C', 'LW', 'RW',]

export const teams = [
    {
        abbrev: "NJD",
        commonName: "Devils",
        id: 1,
        name: "New Jersey Devils"
    },
    {
        abbrev: "NYI",
        commonName: "Islanders",
        id: 2,
        name: "New York Islanders"
    },
    {
        abbrev: "NYR",
        commonName: "Rangers",
        id: 3,
        name: "New York Rangers"
    },
    {
        abbrev: "PHI",
        commonName: "Flyers",
        id: 4,
        name: "Philadelphia Flyers"
    },
    {
        abbrev: "PIT",
        commonName: "Penguins",
        id: 5,
        name: "Pittsburgh Penguins"
    },
    {
        abbrev: "BOS",
        commonName: "Bruins",
        id: 6,
        name: "Boston Bruins"
    },
    {
        abbrev: "BUF",
        commonName: "Sabres",
        id: 7,
        name: "Buffalo Sabres"
    },
    {
        abbrev: "MTL",
        commonName: "Canadiens",
        id: 8,
        name: "Montréal Canadiens"
    },
    {
        abbrev: "OTT",
        commonName: "Senators",
        id: 9,
        name: "Ottawa Senators"
    },
    {
        abbrev: "TOR",
        commonName: "Maple Leafs",
        id: 10,
        name: "Toronto Maple Leafs"
    },
    {
        abbrev: "CAR",
        commonName: "Hurricanes",
        id: 12,
        name: "Carolina Hurricanes"
    },
    {
        abbrev: "FLA",
        commonName: "Panthers",
        id: 13,
        name: "Florida Panthers"
    },
    {
        abbrev: "TBL",
        commonName: "Lightning",
        id: 14,
        name: "Tampa Bay Lightning"
    },
    {
        abbrev: "WSH",
        commonName: "Capitals",
        id: 15,
        name: "Washington Capitals"
    },
    {
        abbrev: "CHI",
        commonName: "Blackhawks",
        id: 16,
        name: "Chicago Blackhawks"
    },
    {
        abbrev: "DET",
        commonName: "Red Wings",
        id: 17,
        name: "Detroit Red Wings"
    },
    {
        abbrev: "NSH",
        commonName: "Predators",
        id: 18,
        name: "Nashville Predators"
    },
    {
        abbrev: "STL",
        commonName: "Blues",
        id: 19,
        name: "St. Louis Blues"
    },
    {
        abbrev: "CGY",
        commonName: "Flames",
        id: 20,
        name: "Calgary Flames"
    },
    {
        abbrev: "COL",
        commonName: "Avalanche",
        id: 21,
        name: "Colorado Avalanche"
    },
    {
        abbrev: "EDM",
        commonName: "Oilers",
        id: 22,
        name: "Edmonton Oilers"
    },
    {
        abbrev: "VAN",
        commonName: "Canucks",
        id: 23,
        name: "Vancouver Canucks"
    },
    {
        abbrev: "ANA",
        commonName: "Ducks",
        id: 24,
        name: "Anaheim Ducks"
    },
    {
        abbrev: "DAL",
        commonName: "Stars",
        id: 25,
        name: "Dallas Stars"
    },
    {
        abbrev: "LAK",
        commonName: "Kings",
        id: 26,
        name: "Los Angeles Kings"
    },
    {
        abbrev: "SJS",
        commonName: "Sharks",
        id: 28,
        name: "San Jose Sharks"
    },
    {
        abbrev: "CBJ",
        commonName: "Blue Jackets",
        id: 29,
        name: "Columbus Blue Jackets"
    },
    {
        abbrev: "MIN",
        commonName: "Wild",
        id: 30,
        name: "Minnesota Wild"
    },
    {
        abbrev: "WPG",
        commonName: "Jets",
        id: 52,
        name: "Winnipeg Jets"
    },
    {
        abbrev: "VGK",
        commonName: "Golden Knights",
        id: 54,
        name: "Vegas Golden Knights"
    },
    {
        abbrev: "SEA",
        commonName: "Kraken",
        id: 55,
        name: "Seattle Kraken"
    },
    {
        abbrev: "UTA",
        commonName: "Utah Hockey Club",
        id: 59,
        name: "Utah Hockey Club"
    }
];

export const scheduleWeeks = [
    {
        endDate: "2025-03-16",
        id: 21,
        startDate: "2025-03-10"
    },
    {
        endDate: "2025-03-23",
        id: 22,
        startDate: "2025-03-17"
    },
    {
        endDate: "2025-03-30",
        id: 23,
        startDate: "2025-03-24"
    },
    {
        endDate: "2025-04-06",
        id: 24,
        startDate: "2025-03-31"
    },
    {
        endDate: "2025-04-13",
        id: 25,
        startDate: "2025-04-07"
    }
] 

export const ScheduleContext = createContext(initialState);
export const ScheduleDispatchContext = createContext();
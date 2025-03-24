import { createContext } from "react";

export const TableType = {
    SCHEDULE: "sched",
    INIT: "init",
}

export const TableAction = {
    INIT: "INIT",
    HIDE_COLUMNS: "HIDE_COLUMNS",
    SET_COLUMNS: "SET_COLUMNS",
    SET_DATA: "SET_DATA",
    SET_SORT: "SET_SORT"
}

export const initialState = {
    tableType: TableType.INIT,
    tableId: TableType.INIT,
    loading: true,
    orderBy: false,
    orderDirection: 'asc',
    bodyData: null,
    columns: [],
    hiddenColumns: [],
    title: ''
};

export const sortDir = {
    asc: 'asc',
    desc: 'desc'
}

export const LYMTableContext = createContext(initialState);
export const LYMTableDispatchContext = createContext();
import { DaysInWeekRaw } from "./Constant"

const GetUpcomingDay = (daysList) => {
    return DaysInWeekRaw[GetUpcomingDayIndex(daysList)]
}

const GetUpcomingDayIndex = (daysList) => {
    daysList = SortDaysList(daysList)
    const today = DaysInWeekRaw[(new Date()).getDay()]
    return (daysList.indexOf(today) + 1) % 7
}

const isWithinOneWeek = (day) => {
    const today = DaysInWeekRaw[(new Date()).getDay()]
}

const SortDaysList = (daysList) => {
    return daysList.toSorted((d1, d2) => DaysInWeekRaw.indexOf(d1) - DaysInWeekRaw.indexOf(d2))
}

const SortAlarmListByTime = (alarmList) => {
    const today = DaysInWeekRaw[(new Date()).getDay()]
    const alarmTime = alarmList.map((alarm) => new Date(2023, 10, (GetUpcomingDay(alarm.repeat_days)), alarm.bed_time.hours, alarm.bed_time.minutes))
}

export { GetUpcomingDayIndex, GetUpcomingDay }

from datetime import datetime, timedelta

# List of alarms in the specified format
alarms = [
    {'repeat': ['mon', 'wed', 'thu'], 'time': '9:00'},
    {'repeat': ['tue', 'thu'], 'time': '9:00'},
    {'repeat': ['fri', 'sat'], 'time': '9:00'},
    {'repeat': ['sun', 'mon'], 'time': '10:00'}
]

# Define a function to get the next occurrence of a particular weekday
def next_weekday(d, weekday):
    days_ahead = weekday - d.weekday()
    if days_ahead <= 0:  # Target day already happened this week
        days_ahead += 7
    return d + timedelta(days_ahead)

# Get current date and time
current_time = datetime.now()

# Convert weekdays to numeric representation
days_mapping = {
    'mon': 0,
    'tue': 1,
    'wed': 2,
    'thu': 3,
    'fri': 4,
    'sat': 5,
    'sun': 6
}

# Find the next alarm after the current time
next_alarm = None
next_alarm_time = None
for alarm in alarms:
    alarm_time = datetime.strptime(alarm['time'], "%H:%M").time()
    for day in alarm['repeat']:
        alarm_weekday = days_mapping[day]
        next_day = next_weekday(current_time, alarm_weekday)
        alarm_date = datetime.combine(next_day.date(), alarm_time)
        
        if alarm_date > current_time:
            if next_alarm is None or alarm_date < next_alarm:
                next_alarm = alarm_date
                next_alarm_time = alarm_time

# Check if a next alarm was found
if next_alarm:
    print(f"The next alarm is scheduled for: {next_alarm.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Alarm time: {next_alarm_time}")
else:
    print("No future alarms found.")
export function getAppointmentsForDay(state, day) {
  const appointmentsByDay = state.days.filter((singleDay) => {
    return singleDay.name === day
  })

  if (appointmentsByDay.length === 0) {
    return [];
  }

  const mappedAppointments = appointmentsByDay[0].appointments.map((appointment) => {
    return state.appointments[appointment]
  })

  return mappedAppointments;
};

export function getInterview(state, interview) {
  console.log("This is Interview!Yes!", interview)

  if (!interview) {
    return null;
  }

  console.log("INTERVIEWERS: >>> ", state.interviewers[interview.interviewer]);

  const newInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]  
  }
  return newInterview;
}



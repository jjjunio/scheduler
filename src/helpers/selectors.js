import React from "react";

export function getAppointmentsForDay(state, day) {
  const appointmentsByDay = state.days.filter((singleDay) => {
    return singleDay.name === day
  })

  if (appointmentsByDay.length === 0) {
    return [];
  }

  const mappedAppointments = appointmentsByDay[0].appointments.map((app) => {
    return state.appointments[app]
  })

  return mappedAppointments;
};



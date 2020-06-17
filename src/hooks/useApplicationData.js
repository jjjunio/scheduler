import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}, 
    spots: 5
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  function setSpots(state) {
    let spotsOpen = 0;
    for (let day in state.days) {
      if (state.days[day].name === state.day) {
        for (let id of state.days[day].appointments) {
          if (!state.appointments[id].interview) {
            spotsOpen++;
          }
        }
      }
    }
    return state.days.map(day => {
      if (day.name !== state.day) {
        return day;
      }
      return {
        ...day,
        spots: spotsOpen
      };
    });
  }
  
    function bookInterview(id, interview) {
      
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const updatedState = { ...state, appointments };
      const updatedDays = setSpots(updatedState);

      return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...updatedState, days: updatedDays });
      })
      // .catch((error) => {
      //   console.error("appointment PUT request failed: ", error)
      // });  
  };

  function cancelInterview(id) {

    console.log("This is the CANCELINTERVIEW: ", id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const updatedState = { ...state, appointments };
    const updatedDays = setSpots(updatedState);
    

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...updatedState, days: updatedDays})
      })    
  };

  return { state, setDay, bookInterview, cancelInterview, setSpots };
}
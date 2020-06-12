import React, { Fragment } from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

import "./styles.scss";

export default function Appointment(props) {
  console.log("This is the Appointment function: ", props.interview)
  return(
      <Fragment>
      <Header time={props.time} />
      { props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> }
      </Fragment>
  )
};
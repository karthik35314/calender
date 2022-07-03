import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin from "@fullcalendar/interaction";
import rrule from "@fullcalendar/rrule";

import "@fullcalendar/timegrid/main.css";
import Modal from "./MOdal";
import moment from "moment";

function App() {
  const [show, setshow] = useState(false);
  const [details, setdetails] = useState([]);

  console.log(details, "details");

  return (
    <div className="App">
      <FullCalendar
        defaultView="timeGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrule]}
        events={details}
        selectable="true"
        select={function (info, start, end) {
          var check = moment(info.start).format("YYYY-MM-DD");
          var today = moment(new Date()).format("YYYY-MM-DD");

          if (check < today) {
            alert("no past days");
          } else {
            setshow(true);
          }
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />

      <Modal
        show={show}
        setshow={setshow}
        setdetails={setdetails}
        details={details}
      />
    </div>
  );
}

export default App;

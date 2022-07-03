import React, { useState } from "react";
import "./modal.css";
import moment from "moment";
import "./App.css";

const Modal = ({ show, setshow, setdetails, details }) => {
  const [data, setdata] = useState({});
  const [month, setmonth] = useState(false);
  const [one, setone] = useState(false);
  const [week, setweek] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setdata((previousData) => ({ ...previousData, [name]: value }));
    // setdata([{...data,[name]:value}])
  };

  const submitData = () => {
    debugger
    const selecdate =
      week === true ? 7 : one === true ? 30 : month === true ? 90 : null;
  
    const enddate = moment(`${data.start}`)
      .add(selecdate, "days")
      .format("YYYY-MM-DD");

    // console.log(enddate, "ENDDATE");
    // console.log(data);
    data.starttime = moment(data?.starttime, "HH:mm").format("HH:mm:ss");
    data.endtime = moment(data?.endtime, "HH:mm").format("HH:mm:ss");

    // console.log(enddate);

    setdetails([
      ...details,
      {
        title: data.title,
         allday:false,
         start:data?.start+"T"+data.starttime,
         end:enddate+"T"+data.endtime,
        rrule: {
          // dtstart: data?.start+"T"+data.starttime,
          // until: enddate+"T"+data.endtime,
          freq:
            week === true
              ? "weekly"
              : one === true
              ? "monthly"
              : month === true
              ? "monthly"
              : null,
          count:
            week === true
              ? "7"
              : one === true
              ? "30"
              : month === true
              ? "90"
              : null,
          interval: 1,
          byweekday: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
          
        },
      },
    ]);

    setshow(false);
    selected(null);
  };

  const selected = (data) => {
    if (data === "week") {
      setweek(true);
      setone(false);
      setmonth(false);
    } else if (data === "one") {
      setone(true);
      setmonth(false);
      setweek(false);
    } else if (data === "month") {
      setmonth(true);
      setweek(false);
      setone(false);
    } else {
      setmonth(false);
      setweek(false);
      setone(false);
    }
  };

  return show ? (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-section">
            <label>Event Name</label>
            <input type="text" name="title" onChange={(e) => handle(e)} />
          </div>
          <div className="modal-section">
            <label>Date </label>
            start <input type="date" name="start" onChange={(e) => handle(e)} />
            Date end
            <button
              className={week ? "active" : null}
              onClick={() => selected("week")}
            >
              one week
            </button>
            <button
              className={one ? "active" : null}
              onClick={() => selected("one")}
            >
              {" "}
              one month
            </button>
            <button
              className={month ? "active" : null}
              onClick={() => selected("month")}
            >
              three month
            </button>
            {/* <input type="date" name="end" onChange={(e) => handle(e)} /> */}
          </div>

          <div className="modal-section">
            <label>Start </label>
            Time{" "}
            <input
              type="time"
              name="starttime"
              onChange={(e) => handle(e)}
            />{" "}
            End Time{" "}
            <input type="time" name="endtime" onChange={(e) => handle(e)} />
          </div>
          <div style={{ padding: "10px" }}>
            <button onClick={() => setshow(false)}>cancel</button>
            <span>{"                   "}</span>
            <button type="submit" onClick={() => submitData()}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;

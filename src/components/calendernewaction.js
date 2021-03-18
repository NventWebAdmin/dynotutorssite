import React, { Component } from "react";
import { GetGoogleIcon } from "./icons";
import Rteditor from "./richtexteditor";
//import { createRecord } from "../db/index";
import Spinner from "./spinner";

import {
  //  sortArray,
  // fieldTypeHtmltoDBmapping,
  getLocalData,
  // serverButtonHandler,
} from "../js/index";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tomailsearchArray: [],
      attherateindex: "0",
      tomail: "",
      tomailselectedarray: [],
      subject: "",
      startdate: "",
      enddate: "",
      starthour: "",
      startmin: "",
      endhour: "",
      endmin: "",
      showSpinner: "false",
    };
  }

  cancelMail = () => {
    this.props.onmailsent({ msgObj: {} });
  };
  sendMail = async () => {
    let localdata = getLocalData(this.props);
    console.log(localdata);
    let { orgname, userid } = localdata;
    let {
      tomailselectedarray,
      subject,
      startdate,
      starthour,
      startmin,
      enddate,
      endhour,
      endmin,
    } = this.state;
    console.log(this.state);

    if (startdate === "" && this.props.defaultNewMeetingDate) {
      startdate = this.props.defaultNewMeetingDate;
    }

    if (starthour === "" && this.props.defaultNewMeetingHour !== undefined) {
      starthour = this.props.defaultNewMeetingHour;
    }

    if (endhour === "" && this.props.defaultNewMeetingHour !== undefined) {
      endhour = this.props.defaultNewMeetingHour;
    }
    if (starthour.length === 1 || starthour < 10) {
      starthour = "0" + starthour;
    }
    if (startmin.length === 1) {
      startmin = "0" + startmin;
    }
    if (endhour.length === 1 || endhour < 10) {
      endhour = "0" + endhour;
    }
    if (endmin.length === 1) {
      endmin = "0" + endmin;
    }

    startdate = startdate + "T" + starthour + ":" + startmin + ":00";

    if (enddate === "" && this.props.defaultNewMeetingDate) {
      enddate = this.props.defaultNewMeetingDate;
    }
    enddate = enddate + "T" + endhour + ":" + endmin + ":00";

    let body = document.getElementById("calendernewactiondiv").innerHTML;
    console.log(tomailselectedarray);
    if (tomailselectedarray.length === 0) {
      alert("To field cannot be empty");
    } else if (subject === "" || subject === undefined) {
      alert("Subject field cannot be empty");
    } else if (
      starthour === "" ||
      starthour === undefined ||
      starthour === "select"
    ) {
      alert("starthour field cannot be empty");
    } else if (
      startmin === "" ||
      startmin === undefined ||
      startmin === "select"
    ) {
      alert("startmin field cannot be empty");
    } else if (
      endhour === "" ||
      endhour === undefined ||
      endhour === "select"
    ) {
      alert("endhour field cannot be empty");
    } else if (endmin === "" || endmin === undefined || endmin === "select") {
      alert("endmin field cannot be empty");
    } else {
      console.log(tomailselectedarray);
      let recorddata = {
        orgname: orgname,
        id: "mail-" + userid + n,
        from: userid,
        to: tomailselectedarray.toString(),
        subject: subject,
        body: body,
      };
      let attendeeuserid = {};
      for (let i = 0; i < tomailselectedarray.length; i++) {
        attendeeuserid[i] = {
          email: "",
          label: tomailselectedarray[i],
          name: tomailselectedarray[i],
          phone: "",
        };
      }
      var d = new Date();
      var n = d.getTime();

      recorddata = {
        attendeeuserid: attendeeuserid,
        body: body,
        dialnumber: "",
        enddate: enddate,
        eventid: "",
        id: "evt-" + userid + "-" + startdate + "-" + n,
        link: "zoom.com/123",
        locationaddress: "",
        locationgocode: "",
        organizeruserid: userid,
        orgname: orgname,
        passcode: "",
        startdate: startdate,
        subject: subject,
        type: "zoommeet,orgmeet",
      };

      console.log(recorddata);
      let result = await createRecord({
        objectName: "event",
        objectData: recorddata,
      });
      if (result.isSuccess === "false") {
        alert(result.message);
      } else {
        console.log(recorddata);
        this.setState({ showSpinner: "true" });
        this.props.onmailsent({ msgObj: {} });
      }
    }
  };
  handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "subject") {
      this.setState({ subject: e.target.value });
    }
    if (e.target.name === "startdate") {
      this.setState({ startdate: e.target.value });
    }
    if (e.target.name === "enddate") {
      this.setState({ enddate: e.target.value });
    }
    if (e.target.name === "starthour") {
      this.setState({ starthour: e.target.value });
    }
    if (e.target.name === "startmin") {
      this.setState({ startmin: e.target.value });
    }
    if (e.target.name === "endhour") {
      this.setState({ endhour: e.target.value });
    }
    if (e.target.name === "endmin") {
      this.setState({ endmin: e.target.value });
    }
    if (e.target.name === "mailnnewactionto") {
      if (e.target.value.includes("@")) {
        this.setState({
          tomailsearchArray: [
            { label: "pradeep", name: "pradeep" },
            { label: "harika", name: "harika" },
            { label: "mom", name: "mom" },
          ],
          tomail: e.target.value,
        });
        document.getElementById("mailnnewactiontolist").style.display = "block";
      } else {
        document.getElementById("mailnnewactiontolist").style.display = "none";
      }
    }
    console.log(this.state);
  };

  selectUser = (x) => {
    let tomailselectedarray = this.state.tomailselectedarray;
    if (!tomailselectedarray.includes(x)) {
      tomailselectedarray.push(x);
    }

    let tomail = this.state.tomail;
    tomail = tomail.replace("@", "");
    this.setState({ tomailselectedarray: tomailselectedarray, tomail: "" });
    console.log(tomailselectedarray);
    document.getElementById("mailnnewactiontolist").style.display = "none";
  };

  removeselecteduser = (x) => {
    let tomailselectedarray = this.state.tomailselectedarray;
    let temparray = [];
    for (let i = 0; i < tomailselectedarray.length; i++) {
      if (tomailselectedarray[i] !== x) temparray.push(tomailselectedarray[i]);
    }
    this.setState({ tomailselectedarray: temparray });
  };

  render() {
    console.log(this.props);
    let { defaultNewMeetingDate } = this.props;
    let {
      tomailsearchArray,
      tomail,
      tomailselectedarray,
      startdate,
      enddate,
      starthour,
      endhour,
      showSpinner,
    } = this.state;
    if (!startdate && defaultNewMeetingDate) {
      startdate = defaultNewMeetingDate;
    }
    if (!enddate && defaultNewMeetingDate) {
      enddate = defaultNewMeetingDate;
    }

    if (starthour === "" && this.props.defaultNewMeetingHour !== undefined) {
      starthour = this.props.defaultNewMeetingHour;
    }

    if (endhour === "" && this.props.defaultNewMeetingHour !== undefined) {
      endhour = this.props.defaultNewMeetingHour;
    }

    let tomailsearchArrayHoverHtml = [];
    let tomailselectedarrayHtml = [];
    for (let i = 0; i < tomailsearchArray.length; i++) {
      tomailsearchArrayHoverHtml.push(
        <div
          style={{ border: "1px solid black", padding: "5px" }}
          onClick={() => {
            this.selectUser(tomailsearchArray[i].name);
          }}
        >
          {tomailsearchArray[i].label}
        </div>
      );
    }
    for (let i = 0; i < tomailselectedarray.length; i++) {
      tomailselectedarrayHtml.push(<span>{tomailselectedarray[i]}</span>);
      tomailselectedarrayHtml.push(
        <GetGoogleIcon
          name="close"
          onClick={() => this.removeselecteduser(tomailselectedarray[i])}
        />
      );
    }

    let hourOptionhtml = [];
    hourOptionhtml.push(<option>Select</option>);
    for (let i = 0; i < 23; i++) {
      hourOptionhtml.push(<option>{i}</option>);
    }
    let minuteOptionhtml = [];
    minuteOptionhtml.push(<option>Select</option>);
    minuteOptionhtml.push(<option value="0">00</option>);
    minuteOptionhtml.push(<option value="15">15</option>);
    minuteOptionhtml.push(<option value="30">30</option>);
    minuteOptionhtml.push(<option value="45">45</option>);

    return (
      <>
        {showSpinner === "true" ? <Spinner /> : ""}
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            To
          </span>
          <div style={{ position: "relative", width: "90%" }}>
            <div>
              <input
                style={{ width: "100%" }}
                onChange={this.handleChange}
                name="mailnnewactionto"
                value={this.state.tomail}
              />
            </div>

            <div
              style={{
                position: "absolute",
                zIndex: 1,
                top: "100%",
                left: 0,
                backgroundColor: "red",
                display: "none",
              }}
              id="mailnnewactiontolist"
            >
              {tomailsearchArrayHoverHtml}
            </div>
          </div>
        </div>

        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          ></span>
          <div
            className="org-fr org-fai-c
        "
          >
            {tomailselectedarrayHtml}
          </div>
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Start Date
          </span>
          <input
            type="date"
            name="startdate"
            onChange={this.handleChange}
            value={startdate}
          />
          <select
            name="starthour"
            onChange={this.handleChange}
            value={starthour}
          >
            {hourOptionhtml}
          </select>
          <select name="startmin" onChange={this.handleChange}>
            {minuteOptionhtml}
          </select>
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            End Date
          </span>
          <input
            type="date"
            name="enddate"
            onChange={this.handleChange}
            value={enddate}
          />
          <select name="endhour" onChange={this.handleChange} value={endhour}>
            {hourOptionhtml}
          </select>
          <select name="endmin" onChange={this.handleChange}>
            {minuteOptionhtml}
          </select>
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            Subject
          </span>
          <input
            name="subject"
            style={{ width: "90%" }}
            onChange={this.handleChange}
          />
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
            name="subject"
          >
            Body
          </span>
          <div style={{ width: "90%" }}>
            <div
              style={{
                width: "100%",
                height: "50vh",
                backgroundColor: "white",
                color: "black",
              }}
              contenteditable="true"
              id="calendernewactiondiv"
            ></div>
          </div>
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          ></span>
          <input style={{ width: "90%" }} type="file" multiple="true" />
        </div>
        <div className="org-fr">
          <span
            style={{
              width: "10%",
              display: "inline-block",
              textAlign: "center",
            }}
          ></span>
          <button contenteditable="true" onClick={this.sendMail}>
            Send
          </button>
          <button contenteditable="true" onClick={this.cancelMail}>
            Cancel
          </button>

          <Rteditor htmlid="calendernewactiondiv" />

          <button
            onClick={() => {
              alert(document.getElementById("id1").innerHTML);
            }}
          >
            showvlue
          </button>
        </div>
      </>
    );
  }
}

export default F;

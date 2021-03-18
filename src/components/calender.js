import React, { Component } from "react";
import { GetLocalIcon, GetGoogleIcon } from "./icons";
//import { getRecorddata } from "../db/index";
//import Calendernewaction from "./calendernewaction";
import Calenderviewaction from "./calenderviewaction";
import {
  getMonthStringDisplay,
  getMonthDigitalDisplay,
  getDateDigitalDisplay,
  getDayStringDisplay,
  // getUniqueArray,
} from "../js/index";
import localdbdata from "../db/localdbdata.json";

class F extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    let month = (d.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    let date = d.getDate().toString();
    if (date.length === 1) {
      date = "0" + date;
    }

    let year = d.getFullYear();

    this.state = {
      compType: "list",
      viewMeetingData: "",
      viewtype: "month",
      currentdate: date,
      currentmonth: month,
      currentyear: year,
      activedate: date,
      activemonth: month,
      activeyear: year,
      eventdata: [],
      viewStartDate: "",
      viewEndDate: "",
      viewTypeMonthRetrievalStartDate1: "",
      viewTypeMonthRetrievalStartDate2: "",
      viewTypeWeekRetrievalStartDate1: "",
      viewTypeWeekRetrievalStartDate2: "",
      defaultNewMeetingDate: "",
      defaultNewMeetingHour: "",
    };
  }

  async componentDidMount() {
    console.log(this.props);
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      datadisplaytype,
      viewname,
      evtdefaultsortparam,
      hidesidebar,
      hidedisplaytypepanel,
      defaultdatafilter,
      enablelocaldbdata,
    } = this.props.compprops;

    let { activedate, activemonth, activeyear, viewtype } = this.state;
    if (viewname === null) {
      viewname = "recentlyviewed";
    }

    let viewStartDate,
      viewEndDate,
      viewTypeWeekRetrievalStartDate1,
      viewTypeWeekRetrievalStartDate2,
      viewTypeMonthRetrievalStartDate1,
      viewTypeMonthRetrievalStartDate2;

    if (viewtype === "week") {
      let d2 = new Date();
      console.log(d2);
      let d2day = d2.getDay();
      console.log(d2day);
      let d2date = d2.getDate();
      console.log(d2date);
      d2.setDate(d2date - d2day);
      console.log(d2);

      let d3 = new Date();
      console.log(d3);
      let d3day = d3.getDay();
      console.log(d3day);
      let d3date = d3.getDate();
      console.log(d3date);
      d3.setDate(d3date + 6 - d3day);
      console.log(d3);

      viewStartDate = d2;
      viewEndDate = d3;
      viewTypeWeekRetrievalStartDate1 = d2;
      viewTypeWeekRetrievalStartDate2 = d3;
    }

    if (viewtype === "month") {
      let d = new Date();
      d.setDate(1);
      console.log(d);

      let d1 = new Date();
      d1.setDate(0);
      console.log(d1);
      d1.setDate(1);
      console.log(d1);

      let d2 = new Date();
      d2.setDate(1);
      console.log(d2);

      let d3 = new Date();
      let d3month = d3.getMonth();
      d3month = d3month + 1;
      d3.setMonth(d3month);
      d3.setDate(0);
      console.log(d3);

      viewStartDate = d2;
      viewEndDate = d3;
      viewTypeMonthRetrievalStartDate1 = d1;
      viewTypeMonthRetrievalStartDate2 = d;
    }
    this.getRecordListMetadataAndDatafromServer({
      orgname: orgname,
      userProfileId: userprofileid,
      userId: userid,
      tableName: tablename,
      datasortparambeginswith: "",
      datasortparamequalsto: "",
      action: "",
      // viewName: viewname,
      datadisplaytype: datadisplaytype,
      evtdefaultsortparam: evtdefaultsortparam,
      targetdate: activedate,
      targetmonth: activemonth,
      targetyear: activeyear,
      viewtype: viewtype,
      hidesidebar: hidesidebar,
      hidedisplaytypepanel: hidedisplaytypepanel,
      defaultdatafilter: defaultdatafilter,
      enablelocaldbdata: enablelocaldbdata,
      viewStartDate: viewStartDate,
      viewEndDate: viewEndDate,
      viewTypeWeekRetrievalStartDate1: viewTypeWeekRetrievalStartDate1,
      viewTypeWeekRetrievalStartDate2: viewTypeWeekRetrievalStartDate2,
      viewTypeMonthRetrievalStartDate1: viewTypeMonthRetrievalStartDate1,
      viewTypeMonthRetrievalStartDate2: viewTypeMonthRetrievalStartDate2,
    });
  }

  filterbydefault = (props) => {
    let { data } = props;
    let defaultfiltereddata = [];
    let { defaultdatafilter } = this.props.compprops;
    for (let i = 0; i < data.length; i++) {
      let localdbdatavar = data[i];
      console.log(defaultdatafilter);
      console.log(localdbdatavar);
      if (localdbdatavar.defaultdatafilter) {
        let isequal = true;
        for (let j in defaultdatafilter) {
          if (defaultdatafilter[j] !== localdbdatavar.defaultdatafilter[j]) {
            isequal = false;
          }
        }
        if (isequal === true) {
          defaultfiltereddata.push(localdbdatavar);
        }
      }
    }
    console.log(defaultfiltereddata);
    return defaultfiltereddata;
  };

  async getRecordListMetadataAndDatafromServer(props) {
    let {
      //  orgname,
      //   userProfileId,
      //  userId,
      //   tableName,
      //  datasortparambeginswith,
      //  datasortparamequalsto,
      //  action,
      viewtype,
      //   datadisplaytype,
      //  evtdefaultsortparam,
      targetdate,
      targetmonth,
      targetyear,
      //   istoday,
      viewStartDate,
      viewEndDate,
      viewTypeMonthRetrievalStartDate1,
      viewTypeMonthRetrievalStartDate2,
      viewTypeWeekRetrievalStartDate1,
      viewTypeWeekRetrievalStartDate2,
      //   hidesidebar,
      //    hidedisplaytypepanel,
      //    defaultdatafilter,
      enablelocaldbdata,
    } = props;
    console.log(props);

    console.log("localdbdata" + localdbdata.localdbdata.data);
    if (
      localdbdata.localdbdata.data.length > 0 &&
      enablelocaldbdata === "true"
    ) {
      let filtereddata = this.filterbydefault({
        data: localdbdata.localdbdata.data,
      });

      if (viewtype === "day") {
        console.log(localdbdata.localdbdata.data);
        this.setState({
          eventdata: filtereddata,
          activedate: targetdate,
          activemonth: targetmonth,
          activeyear: targetyear,
          viewtype: viewtype,
        });
      }
      if (viewtype === "month") {
        this.setState({
          eventdata: filtereddata,
          viewStartDate: viewStartDate,
          viewStartDate2: viewStartDate,
          viewEndDate: viewEndDate,
          viewTypeMonthRetrievalStartDate1: viewTypeMonthRetrievalStartDate1,
          viewTypeMonthRetrievalStartDate2: viewTypeMonthRetrievalStartDate2,
          viewtype: viewtype,
        });
      }
      if (viewtype === "week") {
        this.setState({
          eventdata: filtereddata,
          viewStartDate: viewStartDate,
          viewStartDate2: viewStartDate,
          viewEndDate: viewEndDate,
          viewTypeWeekRetrievalStartDate1: viewTypeWeekRetrievalStartDate1,
          viewTypeWeekRetrievalStartDate2: viewTypeWeekRetrievalStartDate2,
          viewtype: viewtype,
        });
      }
    } else {
      // if (viewtype === "day") {
      //   let month, date, year, usrsortparamToday;
      //   date = targetdate;
      //   month = targetmonth;
      //   year = targetyear;
      //   usrsortparamToday =
      //     evtdefaultsortparam + "-" + userId + "-" + year + "-";
      //   if (month !== "" && month !== undefined) {
      //     usrsortparamToday = usrsortparamToday + month + "-";
      //   }
      //   if (date !== "" && date !== undefined) {
      //     usrsortparamToday = usrsortparamToday + date;
      //   }
      //   let dataParams = {
      //     objectName: tableName,
      //     objectData: {},
      //     keyConditions: [
      //       {
      //         field: "orgname",
      //         value: orgname,
      //         expression: "=",
      //       },
      //       { field: "id", value: usrsortparamToday, expression: "beginswith" },
      //     ],
      //     filterConditions: [],
      //     pageSize: "",
      //     limit: "",
      //     exclusiveStartKey: "",
      //   };
      //   let dataresult = await getRecorddata(dataParams);
      //   if (dataresult.isSuccess === "false") {
      //     alert("data" + dataresult.message);
      //   } else {
      //     console.log(dataresult.dataprops.Items);
      //     //if (dataresult.dataprops.Items.length > 0) {
      //     let eventdata = dataresult.dataprops.Items;
      //     console.log(eventdata);
      //     let filtereddata = this.filterbydefault({
      //       data: eventdata,
      //     });
      //     this.setState({
      //       eventdata: filtereddata,
      //       activedate: date,
      //       activemonth: month,
      //       activeyear: year,
      //       viewtype: viewtype,
      //     });
      //     // }
      //   }
      // } else if (viewtype === "month") {
      //   let d = viewTypeMonthRetrievalStartDate1;
      //   let d1 = viewTypeMonthRetrievalStartDate2;
      //   let dmonth = (d.getMonth() + 1).toString();
      //   if (dmonth.length === 1) {
      //     dmonth = "0" + dmonth;
      //   }
      //   let ddate = d.getDate().toString();
      //   if (ddate.length === 1) {
      //     ddate = "0" + ddate;
      //   }
      //   let dyear = d.getFullYear();
      //   let d1month = (d1.getMonth() + 1).toString();
      //   if (d1month.length === 1) {
      //     d1month = "0" + d1month;
      //   }
      //   let d1date = d1.getDate().toString();
      //   if (d1date.length === 1) {
      //     d1date = "0" + d1date;
      //   }
      //   let d1year = d1.getFullYear();
      //   let usrsortparamToday1 =
      //     evtdefaultsortparam + "-" + userId + "-" + dyear + "-" + dmonth + "-";
      //   let usrsortparamToday2 =
      //     evtdefaultsortparam +
      //     "-" +
      //     userId +
      //     "-" +
      //     d1year +
      //     "-" +
      //     d1month +
      //     "-";
      //   let dataParams = {
      //     objectName: tableName,
      //     objectData: {},
      //     keyConditions: [
      //       {
      //         field: "orgname",
      //         value: orgname,
      //         expression: "=",
      //       },
      //       {
      //         field: "id",
      //         value: usrsortparamToday1,
      //         expression: "beginswith",
      //       },
      //     ],
      //     filterConditions: [],
      //     pageSize: "",
      //     limit: "",
      //     exclusiveStartKey: "",
      //   };
      //   let dataParams1 = {
      //     objectName: tableName,
      //     objectData: {},
      //     keyConditions: [
      //       {
      //         field: "orgname",
      //         value: orgname,
      //         expression: "=",
      //       },
      //       {
      //         field: "id",
      //         value: usrsortparamToday2,
      //         expression: "beginswith",
      //       },
      //     ],
      //     filterConditions: [],
      //     pageSize: "",
      //     limit: "",
      //     exclusiveStartKey: "",
      //   };
      //   console.log(dataParams);
      //   console.log(dataParams1);
      //   let dataresult = await getRecorddata(dataParams);
      //   if (dataresult.isSuccess === "false") {
      //     alert("data" + dataresult.message);
      //   } else {
      //     console.log(dataresult.dataprops.Items);
      //     let eventdata = dataresult.dataprops.Items;
      //     console.log(eventdata);
      //     let dataresult1 = await getRecorddata(dataParams1);
      //     if (dataresult1.isSuccess === "false") {
      //       alert("data" + dataresult1.message);
      //     } else {
      //       console.log(dataresult1.dataprops.Items);
      //       let eventdata2 = dataresult1.dataprops.Items;
      //       console.log(eventdata2);
      //       let eventdata3 = [];
      //       for (let i = 0; i < eventdata.length; i++) {
      //         eventdata3.push(eventdata[i]);
      //       }
      //       for (let i = 0; i < eventdata2.length; i++) {
      //         eventdata3.push(eventdata2[i]);
      //       }
      //       console.log(eventdata3);
      //       console.log(viewStartDate);
      //       let filtereddata = this.filterbydefault({
      //         data: eventdata3,
      //       });
      //       this.setState({
      //         eventdata: filtereddata,
      //         viewStartDate: viewStartDate,
      //         viewStartDate2: viewStartDate,
      //         viewEndDate: viewEndDate,
      //         viewTypeMonthRetrievalStartDate1: viewTypeMonthRetrievalStartDate1,
      //         viewTypeMonthRetrievalStartDate2: viewTypeMonthRetrievalStartDate2,
      //         viewtype: viewtype,
      //       });
      //     }
      //   }
      // } else if (viewtype === "week") {
      //   let d = viewTypeWeekRetrievalStartDate1;
      //   let d1 = viewTypeWeekRetrievalStartDate2;
      //   let dmonth = (d.getMonth() + 1).toString();
      //   if (dmonth.length === 1) {
      //     dmonth = "0" + dmonth;
      //   }
      //   let ddate = d.getDate().toString();
      //   if (ddate.length === 1) {
      //     ddate = "0" + ddate;
      //   }
      //   let dyear = d.getFullYear();
      //   let d1month = (d1.getMonth() + 1).toString();
      //   if (d1month.length === 1) {
      //     d1month = "0" + d1month;
      //   }
      //   let d1date = d1.getDate().toString();
      //   if (d1date.length === 1) {
      //     d1date = "0" + d1date;
      //   }
      //   let d1year = d1.getFullYear();
      //   let usrsortparamToday1 =
      //     evtdefaultsortparam + "-" + userId + "-" + dyear + "-" + dmonth + "-";
      //   let usrsortparamToday2 =
      //     evtdefaultsortparam +
      //     "-" +
      //     userId +
      //     "-" +
      //     d1year +
      //     "-" +
      //     d1month +
      //     "-";
      //   let dataParams = {
      //     objectName: tableName,
      //     objectData: {},
      //     keyConditions: [
      //       {
      //         field: "orgname",
      //         value: orgname,
      //         expression: "=",
      //       },
      //       {
      //         field: "id",
      //         value: usrsortparamToday1,
      //         expression: "beginswith",
      //       },
      //     ],
      //     filterConditions: [],
      //     pageSize: "",
      //     limit: "",
      //     exclusiveStartKey: "",
      //   };
      //   let dataParams1 = {
      //     objectName: tableName,
      //     objectData: {},
      //     keyConditions: [
      //       {
      //         field: "orgname",
      //         value: orgname,
      //         expression: "=",
      //       },
      //       {
      //         field: "id",
      //         value: usrsortparamToday2,
      //         expression: "beginswith",
      //       },
      //     ],
      //     filterConditions: [],
      //     pageSize: "",
      //     limit: "",
      //     exclusiveStartKey: "",
      //   };
      //   console.log(dataParams);
      //   console.log(dataParams1);
      //   let dataresult = await getRecorddata(dataParams);
      //   if (dataresult.isSuccess === "false") {
      //     alert("data" + dataresult.message);
      //   } else {
      //     console.log(dataresult.dataprops.Items);
      //     let eventdata = dataresult.dataprops.Items;
      //     console.log(eventdata);
      //     let dataresult1 = await getRecorddata(dataParams1);
      //     if (dataresult1.isSuccess === "false") {
      //       alert("data" + dataresult1.message);
      //     } else {
      //       console.log(dataresult1.dataprops.Items);
      //       let eventdata2 = dataresult1.dataprops.Items;
      //       console.log(eventdata2);
      //       let eventdata3 = [];
      //       for (let i = 0; i < eventdata.length; i++) {
      //         eventdata3.push(eventdata[i]);
      //       }
      //       for (let i = 0; i < eventdata2.length; i++) {
      //         eventdata3.push(eventdata2[i]);
      //       }
      //       eventdata3 = getUniqueArray({ dataArray: eventdata3, param: "id" });
      //       console.log(eventdata3);
      //       console.log(viewStartDate);
      //       let filtereddata = this.filterbydefault({
      //         data: eventdata3,
      //       });
      //       this.setState({
      //         eventdata: filtereddata,
      //         viewStartDate: viewStartDate,
      //         viewStartDate2: viewStartDate,
      //         viewEndDate: viewEndDate,
      //         viewTypeWeekRetrievalStartDate1: viewTypeWeekRetrievalStartDate1,
      //         viewTypeWeekRetrievalStartDate2: viewTypeWeekRetrievalStartDate2,
      //         viewtype: viewtype,
      //       });
      //     }
      //   }
      // }
    }
  }
  changetoView = async (viewtype) => {
    let {
      currentdate,
      currentmonth,
      currentyear,
      activedate,
      activemonth,
      activeyear,
      viewStartDate,
      viewEndDate,
      //  viewTypeMonthRetrievalStartDate1,
      //  viewTypeMonthRetrievalStartDate2,
      //  viewTypeWeekRetrievalStartDate1,
      //  viewTypeWeekRetrievalStartDate2,
    } = this.state;

    if (viewtype === "today") {
      console.log(this.state);
      this.reloaddata({
        activedate: currentdate,
        activemonth: currentmonth,
        activeyear: currentyear,
        viewtype: "day",
      });
    } else {
      if (viewtype === "left" || viewtype === "right") {
        if (this.state.viewtype === "day") {
          let d;
          if (viewtype === "left") {
            d = new Date(
              activeyear + "-" + activemonth + "-" + activedate + "T00:00:00"
            );
            d.setDate(d.getDate() - 1);
          } else if (viewtype === "right") {
            d = new Date(
              activeyear + "-" + activemonth + "-" + activedate + "T00:00:00"
            );
            d.setDate(d.getDate() + 1);
          }
          activemonth = (d.getMonth() + 1).toString();
          if (activemonth.length === 1) {
            activemonth = "0" + activemonth;
          }
          activedate = d.getDate().toString();
          if (activedate.length === 1) {
            activedate = "0" + activedate;
          }

          activeyear = d.getFullYear();

          this.reloaddata({
            activedate: activedate,
            activemonth: activemonth,
            activeyear: activeyear,
            viewtype: "day",
          });
        }
        if (this.state.viewtype === "week" && viewtype === "left") {
          let d = new Date(viewStartDate.getTime());
          console.log(d);
          let ddate = d.getDate();
          d.setDate(ddate - 7);
          console.log(d);

          let d2 = new Date(viewEndDate.getTime());
          let d2date = d2.getDate();
          d2.setDate(d2date - 7);
          console.log(d2);

          this.reloaddata({
            viewStartDate: d,
            viewEndDate: d2,
            viewtype: "week",
            viewTypeWeekRetrievalStartDate1: d,
            viewTypeWeekRetrievalStartDate2: d2,
          });
        }
        if (this.state.viewtype === "week" && viewtype === "right") {
          let d = new Date(viewStartDate.getTime());
          console.log(d);
          let ddate = d.getDate();
          d.setDate(ddate + 7);
          console.log(d);

          let d2 = new Date(viewEndDate.getTime());
          let d2date = d2.getDate();
          d2.setDate(d2date + 7);
          console.log(d2);

          this.reloaddata({
            viewStartDate: d,
            viewEndDate: d2,
            viewtype: "week",
            viewTypeWeekRetrievalStartDate1: d,
            viewTypeWeekRetrievalStartDate2: d2,
          });
        }
        if (this.state.viewtype === "month" && viewtype === "left") {
          console.log(this.state);
          let d = new Date(viewStartDate.getTime());
          console.log(d);
          d.setDate(0);
          console.log(d);
          d.setDate(1);
          console.log(d);

          let d2 = new Date(viewEndDate.getTime());
          d2.setDate(1);
          d2.setDate(0);
          console.log(d);

          let d1 = new Date(d.getTime());
          d1.setDate(0);
          d1.setDate(1);
          console.log(d1);

          this.reloaddata({
            viewStartDate: d,
            viewEndDate: d2,
            viewtype: "month",
            viewTypeMonthRetrievalStartDate1: d,
            viewTypeMonthRetrievalStartDate2: d1,
          });
        }
        if (this.state.viewtype === "month" && viewtype === "right") {
          console.log(this.state);
          let d = new Date(viewStartDate.getTime());
          let dmonth = d.getMonth();
          console.log(d);
          d.setMonth(dmonth + 1);
          console.log(d);

          let d2 = new Date(viewEndDate.getTime());
          let d2month = d2.getMonth();
          console.log(d2);
          d2.setMonth(d2month + 1);
          console.log(d2);

          let d1 = new Date(viewStartDate.getTime());

          console.log(d1);

          this.reloaddata({
            viewStartDate: d,
            viewEndDate: d2,
            viewtype: "month",
            viewTypeMonthRetrievalStartDate1: d1,
            viewTypeMonthRetrievalStartDate2: d,
          });
        }
      } else if (viewtype === "weekk") {
        let d;
        d = new Date(
          currentyear + "-" + currentmonth + "-" + currentdate + "T00:00:00"
        );
        let day = d.getDay();
        console.log(d);
        console.log(day);
        let viewStartDate = d.setDate(d.getDate() - day);
        let remWeekDays = 6 - day;
        let viewEndDate = d.setDate(d.getDate() + remWeekDays);

        this.reloaddata({
          viewStartDate: viewStartDate,
          viewEndDate: viewEndDate,
        });
      } else if (viewtype === "month") {
        let d = new Date();
        d.setDate(1);
        console.log(d);

        let d1 = new Date();
        d1.setDate(0);
        console.log(d1);
        d1.setDate(1);
        console.log(d1);

        let d2 = new Date();
        d2.setDate(1);
        console.log(d2);

        let d3 = new Date();
        let d3month = d3.getMonth();
        d3month = d3month + 1;
        d3.setMonth(d3month);
        d3.setDate(0);
        console.log(d3);

        this.reloaddata({
          viewStartDate: d2,
          viewEndDate: d3,
          viewtype: viewtype,
          viewTypeMonthRetrievalStartDate1: d1,
          viewTypeMonthRetrievalStartDate2: d,
        });
      } else if (viewtype === "week") {
        let d2 = new Date();
        console.log(d2);
        let d2day = d2.getDay();
        console.log(d2day);
        let d2date = d2.getDate();
        console.log(d2date);
        d2.setDate(d2date - d2day);
        console.log(d2);

        let d3 = new Date();
        console.log(d3);
        let d3day = d3.getDay();
        console.log(d3day);
        let d3date = d3.getDate();
        console.log(d3date);
        d3.setDate(d3date + 6 - d3day);
        console.log(d3);

        this.reloaddata({
          viewStartDate: d2,
          viewEndDate: d3,
          viewtype: viewtype,
          viewTypeWeekRetrievalStartDate1: d2,
          viewTypeWeekRetrievalStartDate2: d3,
        });
      } else if (viewtype === "day") {
        console.log(this.state);
        this.reloaddata({
          activedate: currentdate,
          activemonth: currentmonth,
          activeyear: currentyear,
          viewtype: "day",
        });
      } else {
        this.setState({ viewtype: viewtype });
      }
    }
  };

  newMeeting = async (props) => {
    let { date, time } = props;
    let { activedate, activemonth, activeyear } = this.state;
    if (time !== undefined && date === undefined) {
      date = activeyear + "-" + activemonth + "-" + activedate;
    }

    console.log(date);
    console.log(time);
    this.setState({
      compType: "new",
      defaultNewMeetingDate: date,
      defaultNewMeetingHour: time,
    });
  };

  viewMeeting = async (props) => {
    let { eventdata } = props;
    this.setState({
      compType: "view",
      viewMeetingData: eventdata,
    });
  };

  onmailsent = (props) => {
    let {
      //activedate,
      // activemonth,
      // activeyear,
      viewtype,
    } = this.state;
    this.changetoView(viewtype);
    this.setState({ compType: "list" });
  };

  halfHourBlockClick = (props) => {
    let { e, eventdata, datetime, hour } = props;
    console.log(eventdata);
    console.log(datetime);
    console.log(hour);
    if (e && e.target) {
      console.log(e.target.dataset.name);

      e.stopPropagation();
      this.viewMeeting({ eventdata: eventdata });
    } else {
      let d = new Date(datetime);
      let dmonth = d.getMonth() + 1;
      if (dmonth < 10) {
        dmonth = "0" + dmonth;
      }
      let ddate = d.getDate();
      if (ddate < 10) {
        ddate = "0" + ddate;
      }
      console.log(d.getFullYear() + "-" + dmonth + "-" + ddate);
      console.log(hour);
      this.newMeeting({
        date: d.getFullYear() + "-" + dmonth + "-" + ddate,
        time: hour,
      });
    }
  };

  getHalfhourHtml = (props) => {
    let { firsthalfhourevent, secondhalfhourevent, zedIndex } = props;
    console.log("abcd");
    console.log(firsthalfhourevent);
    console.log(secondhalfhourevent);
    console.log(zedIndex);
    let colorindex = 1;
    let halfhoureventHtml = [];
    let halfhourevent = [];
    for (let j = 0; j < firsthalfhourevent.length; j++) {
      halfhourevent.push(firsthalfhourevent[j]);
    }
    for (let j = 0; j < secondhalfhourevent.length; j++) {
      halfhourevent.push(secondhalfhourevent[j]);
    }
    for (let j = 0; j < halfhourevent.length; j++) {
      let startdate = new Date(halfhourevent[j].startdate);
      let enddate = new Date(halfhourevent[j].enddate);
      let duration = enddate.getTime() - startdate.getTime();
      let startmin = startdate.getMinutes();

      let startminppercentage = (parseInt(startmin) * 10) / 3;
      if (secondhalfhourevent.length > 0) {
        startminppercentage = startminppercentage - 100;
      }
      startminppercentage = startminppercentage.toString() + "%";

      duration = duration / 60000;
      let durationhourppercentage = (parseInt(duration) * 10) / 3;
      durationhourppercentage = durationhourppercentage.toString() + "%";
      let colortext = "";
      if (colorindex === 1) {
        colortext = "#00B2A5";
      }
      if (colorindex === 2) {
        colortext = "#99B2A5";
      }
      if (colorindex === 3) {
        colortext = "#CCB2A5";
      }
      let halfhoureventwidth = parseInt(100 / halfhourevent.length) + "%";
      let evtDisplay =
        halfhourevent[j].id +
        "-" +
        halfhourevent[j].startdate +
        "-" +
        halfhourevent[j].enddate;
      halfhoureventHtml.push(
        <div
          key={j}
          style={{
            position: "relative",
            width: halfhoureventwidth,
          }}
        >
          <div
            style={{
              border: "1px solid black",
              position: "absolute",
              top: startminppercentage,
              width: "100%",
              height: durationhourppercentage,
              backgroundColor: colortext,
              zIndex: zedIndex,
            }}
          >
            <div
              style={{
                width: "50%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                margin: "auto",
              }}
              data-name="event"
              onClick={(e) =>
                this.halfHourBlockClick({
                  e: e,
                  eventdata: halfhourevent[j],
                  datetime: "",
                  hour: "",
                })
              }
              title={evtDisplay}
            >
              {evtDisplay}
            </div>
          </div>
        </div>
      );
      zedIndex = zedIndex + 1;
      colorindex = colorindex + 1;
      if (colorindex === 4) {
        colorindex = 1;
      }
    }
    console.log(halfhoureventHtml);
    return halfhoureventHtml;
  };

  getDayHtml = () => {
    let hourrowHtml = [];
    let maincomp = [];
    let { eventdata, activedate, activemonth, activeyear } = this.state;
    console.log(eventdata);
    let zedIndex = 2;
    //   let spacing = 0;
    // let colorindex = 1;
    for (let i = 0; i < 24; i++) {
      //   spacing = 0;
      //  colorindex = 1;
      let hourContentArrayHtml = [];
      let firsthalfhourevent = [];
      let secondhalfhourevent = [];
      for (let j = 0; j < eventdata.length; j++) {
        let startdate = new Date(eventdata[j].startdate);

        let activedatevar = new Date(
          activeyear + "-" + activemonth + "-" + activedate + "T00:00:00"
        );

        let startmin = startdate.getMinutes();
        let starthour = startdate.getHours();
        if (
          startdate.getDate() === activedatevar.getDate() &&
          startdate.getMonth() === activedatevar.getMonth() &&
          startdate.getFullYear() === activedatevar.getFullYear()
        ) {
          if (i === parseInt(starthour) && parseInt(startmin) < 30) {
            firsthalfhourevent.push(eventdata[j]);
          }
          if (i === parseInt(starthour) && parseInt(startmin) >= 30) {
            secondhalfhourevent.push(eventdata[j]);
          }
        }
      }
      let firsthalfhoureventHtml = [];
      if (firsthalfhourevent.length > 0) {
        firsthalfhoureventHtml = this.getHalfhourHtml({
          firsthalfhourevent,
          secondhalfhourevent: [],
          zedIndex,
        });
      }
      zedIndex = firsthalfhourevent.length + 1;
      let secondthalfhoureventHtml = [];
      //     colorindex = 1;
      if (secondhalfhourevent.length > 0) {
        secondthalfhoureventHtml = this.getHalfhourHtml({
          firsthalfhourevent: [],
          secondhalfhourevent,
          zedIndex,
        });
      }

      hourContentArrayHtml.push(
        <div
          key={i}
          className="org-fr"
          style={{
            height: "50%",
          }}
        >
          {firsthalfhoureventHtml}
        </div>
      );
      hourContentArrayHtml.push(
        <div key={i} className="org-fr" style={{ height: "50%" }}>
          {secondthalfhoureventHtml}
        </div>
      );

      hourrowHtml.push(
        <div
          key={i}
          className="org-fr"
          style={{
            height: "20%",
            backgroundColor: "green",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "10%",
              height: "100%",
            }}
            onClick={() => {
              this.newMeeting({ time: i });
            }}
          >
            {i}:00
          </div>
          <div
            style={{
              width: "90%",
              borderTop: "1px solid black",
              borderRight: "1px solid black",
              height: "100%",
            }}
          >
            {hourContentArrayHtml}
          </div>
        </div>
      );
    }

    maincomp.push(
      <div
        style={{
          height: "70vh",
          border: "1px solid black",
          width: "100%",
          overflow: "auto",
        }}
        className="org-fr"
      >
        {hourrowHtml}
      </div>
    );
    return maincomp;
  };

  getWeekHtml = () => {
    let hourrowHtml = [];
    let maincomp = [];
    let { viewStartDate, viewEndDate, eventdata } = this.state;
    console.log(eventdata);
    let zedIndex = 2;
    //  let spacing = 0;
    //  let colorindex = 1;
    let dayContentArrayHtml = [];
    if (viewStartDate) {
      let startdateOfMonth = new Date(viewStartDate.getTime());

      let enddatetime = viewEndDate.getTime();

      hourrowHtml = [];
      for (let i = 0; i < 24; i++) {
        let hourContentArrayHtml = [];
        //      let firsthalfhourevent = [];
        //     let secondhalfhourevent = [];

        hourContentArrayHtml.push(
          <div
            style={{
              height: "50%",
              textAlign: "center",
            }}
          >
            {i}:00
          </div>
        );

        hourrowHtml.push(
          <div
            className="org-fr"
            style={{
              height: "20%",
              backgroundColor: "green",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",

                borderRight: "1px solid black",
                height: "100%",
              }}
            >
              {hourContentArrayHtml}
            </div>
          </div>
        );
      }

      dayContentArrayHtml.push(
        <div style={{ width: "9%", height: "100%" }}>
          <div>
            <div style={{ textAlign: "center", visibility: "hidden" }}>tse</div>
            <div style={{ textAlign: "center", visibility: "hidden" }}>
              test
            </div>
          </div>
          {hourrowHtml}
        </div>
      );

      // for (let k = 17; k < 24; k++) {
      while (startdateOfMonth.getTime() <= enddatetime) {
        hourrowHtml = [];
        for (let i = 0; i < 24; i++) {
          //  spacing = 0;
          //  colorindex = 1;
          let hourContentArrayHtml = [];
          let firsthalfhourevent = [];
          let secondhalfhourevent = [];
          for (let j = 0; j < eventdata.length; j++) {
            let startdate = new Date(eventdata[j].startdate);
            let startyear = startdate.getFullYear();
            let startmonth = startdate.getMonth();
            let startdatevalue = startdate.getDate();
            let startmin = startdate.getMinutes();
            let starthour = startdate.getHours();
            if (
              startdateOfMonth.getFullYear() === startyear &&
              startdateOfMonth.getMonth() === startmonth &&
              startdateOfMonth.getDate() === startdatevalue &&
              i === parseInt(starthour) &&
              parseInt(startmin) < 30
            ) {
              firsthalfhourevent.push(eventdata[j]);
            }
            if (
              startdateOfMonth.getFullYear() === startyear &&
              startdateOfMonth.getMonth() === startmonth &&
              startdateOfMonth.getDate() === startdatevalue &&
              i === parseInt(starthour) &&
              parseInt(startmin) >= 30
            ) {
              secondhalfhourevent.push(eventdata[j]);
            }
          }
          let firsthalfhoureventHtml = [];
          if (firsthalfhourevent.length > 0) {
            firsthalfhoureventHtml = this.getHalfhourHtml({
              firsthalfhourevent,
              secondhalfhourevent: [],
              zedIndex,
            });
          }
          zedIndex = firsthalfhourevent.length + 1;
          let secondthalfhoureventHtml = [];
          //   colorindex = 1;
          if (secondhalfhourevent.length > 0) {
            secondthalfhoureventHtml = this.getHalfhourHtml({
              firsthalfhourevent: [],
              secondhalfhourevent,
              zedIndex,
            });
          }

          hourContentArrayHtml.push(
            <div
              className="org-fr"
              style={{
                height: "50%",
              }}
            >
              {firsthalfhoureventHtml}
            </div>
          );
          hourContentArrayHtml.push(
            <div className="org-fr" style={{ height: "50%" }}>
              {secondthalfhoureventHtml}
            </div>
          );
          let hourblockdatetime = startdateOfMonth.getTime();
          hourrowHtml.push(
            <div
              className="org-fr"
              style={{
                height: "20%",
                backgroundColor: "green",
                width: "100%",
              }}
              data-name="eventblank"
              onClick={() => {
                this.halfHourBlockClick({
                  e: "",
                  eventdata: "",
                  datetime: hourblockdatetime,
                  hour: i,
                });
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid black",
                  borderRight: "1px solid black",
                  height: "100%",
                }}
              >
                {hourContentArrayHtml}
              </div>
            </div>
          );
        }

        let viewStartDateMonthDigitalDisplay = getMonthDigitalDisplay({
          monthIndex: startdateOfMonth.getMonth(),
        });

        let viewStartDateDayDigitalDisplay = getDateDigitalDisplay({
          dateIndex: startdateOfMonth.getDate(),
        });

        let dayString = getDayStringDisplay({
          dayIndex: startdateOfMonth.getDay(),
        });

        dayContentArrayHtml.push(
          <div style={{ width: "13%", height: "100%" }}>
            <div>
              <div style={{ textAlign: "center" }}>{dayString}</div>
              <div style={{ textAlign: "center" }}>
                {startdateOfMonth.getFullYear()}-{" "}
                {viewStartDateMonthDigitalDisplay}-
                {viewStartDateDayDigitalDisplay}
              </div>
            </div>
            {hourrowHtml}
          </div>
        );
        let startdateOfMonthDate = startdateOfMonth.getDate() + 1;
        startdateOfMonth.setDate(startdateOfMonthDate);
      }

      maincomp.push(
        <div
          style={{
            height: "70vh",
            border: "1px solid black",
            width: "100%",
            overflow: "auto",
          }}
          className="org-fr"
        >
          {dayContentArrayHtml}
        </div>
      );
    }
    return maincomp;
  };

  getMonthHtml = () => {
    let { viewStartDate, eventdata } = this.state;
    let monthHtml = [];
    let datecompHtml = [];
    if (viewStartDate) {
      let startdateOfMonth = new Date(viewStartDate.getTime());
      let viewStartDateMonth = viewStartDate.getMonth();
      let viewStartDateMonthDisplay = getMonthStringDisplay({
        monthIndex: viewStartDateMonth,
      });
      let viewStartDateMonthDigitalDisplay = getMonthDigitalDisplay({
        monthIndex: viewStartDateMonth,
      });
      for (let k = 0; k < viewStartDate.getDay(); k++) {
        datecompHtml.push(
          <div
            style={{
              width: "14.28%",
              height: "130px",
              backgroundColor: "grey",
              color: "black",
              border: "1px solid grey",
              display: "inline-block",
              overflow: "auto",
            }}
          >
            .
          </div>
        );
      }
      let todaydate = new Date();
      for (let i = 0; i < 35; i++) {
        let startday;
        let istodaydate = false;
        if (
          startdateOfMonth.getDate() === todaydate.getDate() &&
          startdateOfMonth.getMonth() === todaydate.getMonth() &&
          startdateOfMonth.getFullYear() === todaydate.getFullYear()
        ) {
          istodaydate = true;
        }
        startday = startdateOfMonth.getDay();
        startday = getDayStringDisplay({ dayIndex: startday });
        let eventcomp = [];
        // update 1:03/17, if event is recurring defect fix
        for (let j = 0; j < eventdata.length; j++) {
          let startdate = new Date(eventdata[j].startdate);
          let startdatevalue = startdate.getDate();
          let startmonth = startdate.getMonth();

          if (eventdata[j].recurrency.isrecurring === "true") {
            let recurrencystartdate = new Date(
              eventdata[j].recurrency.startdate
            );
            let recurrencyenddate = new Date(eventdata[j].recurrency.enddate);
            if (
              todaydate.getTime() > recurrencystartdate.getTime() &&
              todaydate.getTime() < recurrencyenddate.getTime() &&
              startmonth === startdateOfMonth.getMonth()
            ) {
              eventcomp.push(
                <div
                  style={{
                    backgroundColor: "lightblue",
                    marginTop: "5px",
                    //  whiteSpace: "nowrap",
                    overflow: "scroll",
                  }}
                  onClick={() => {
                    this.viewMeeting({ eventdata: eventdata[j] });
                  }}
                >
                  {eventdata[j].subject}
                </div>
              );
            }
          } else if (
            startdatevalue === startdateOfMonth.getDate() &&
            startmonth === startdateOfMonth.getMonth()
          ) {
            eventcomp.push(
              <div
                style={{
                  backgroundColor: "lightblue",
                  marginTop: "5px",
                  //  whiteSpace: "nowrap",
                  overflow: "scroll",
                }}
                onClick={() => {
                  this.viewMeeting({ eventdata: eventdata[j] });
                }}
              >
                {eventdata[j].subject}
              </div>
            );
          }
        }

        if (viewStartDateMonth === startdateOfMonth.getMonth()) {
          let dataid =
            startdateOfMonth.getFullYear() +
            "-" +
            viewStartDateMonthDigitalDisplay +
            "-" +
            getDateDigitalDisplay({
              dateIndex: startdateOfMonth.getDate(),
            });
          datecompHtml.push(
            <div
              style={{
                width: "14.28%",
                height: "130px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid grey",
                display: "inline-block",
                overflow: "auto",
              }}
            >
              {istodaydate === true ? (
                <div
                  style={{ textAlign: "center", backgroundColor: "lightblue" }}
                >
                  {startday}
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>{startday}</div>
              )}

              {istodaydate === true ? (
                <div
                  style={{ textAlign: "center", backgroundColor: "lightblue" }}
                  data-meetingdate={dataid}
                  onClick={() => {
                    this.newMeeting({
                      date: dataid,
                    });
                  }}
                >
                  {startdateOfMonth.getFullYear()}-{" "}
                  {viewStartDateMonthDigitalDisplay}-
                  {getDateDigitalDisplay({
                    dateIndex: startdateOfMonth.getDate(),
                  })}
                </div>
              ) : (
                <div
                  style={{ textAlign: "center" }}
                  data-meetingdate={dataid}
                  onClick={() => {
                    this.newMeeting({
                      date: dataid,
                    });
                  }}
                >
                  {startdateOfMonth.getFullYear()}-{" "}
                  {viewStartDateMonthDigitalDisplay}-
                  {getDateDigitalDisplay({
                    dateIndex: startdateOfMonth.getDate(),
                  })}
                </div>
              )}
              <div>{eventcomp}</div>
            </div>
          );
        }
        let startdateOfMonthDate = startdateOfMonth.getDate() + 1;
        startdateOfMonth.setDate(startdateOfMonthDate);
      }
      monthHtml.push(
        <div className="org-fr org-fjc-c">
          {viewStartDate.getFullYear()}-{viewStartDateMonthDisplay}
        </div>
      );
      monthHtml.push(<div className="org-fr">{datecompHtml}</div>);
    }
    return monthHtml;
  };

  reloaddata = (props) => {
    let {
      orgname,
      userprofileid,
      userid,
      tablename,
      datadisplaytype,

      evtdefaultsortparam,
      hidesidebar,
      hidedisplaytypepanel,
      defaultdatafilter,
      enablelocaldbdata,
    } = this.props.compprops;
    let {
      activedate,
      activemonth,
      activeyear,
      viewStartDate,
      viewEndDate,
      viewtype,
      viewTypeMonthRetrievalStartDate1,
      viewTypeMonthRetrievalStartDate2,
      viewTypeWeekRetrievalStartDate1,
      viewTypeWeekRetrievalStartDate2,
    } = props;
    this.getRecordListMetadataAndDatafromServer({
      orgname: orgname,
      userProfileId: userprofileid,
      userId: userid,
      tableName: tablename,
      datasortparambeginswith: "",
      datasortparamequalsto: "",
      action: "",
      viewtype: viewtype,
      datadisplaytype: datadisplaytype,
      evtdefaultsortparam: evtdefaultsortparam,
      targetdate: activedate,
      targetmonth: activemonth,
      targetyear: activeyear,
      viewStartDate: viewStartDate,
      viewEndDate: viewEndDate,
      viewTypeMonthRetrievalStartDate1: viewTypeMonthRetrievalStartDate1,
      viewTypeMonthRetrievalStartDate2: viewTypeMonthRetrievalStartDate2,
      viewTypeWeekRetrievalStartDate1: viewTypeWeekRetrievalStartDate1,
      viewTypeWeekRetrievalStartDate2: viewTypeWeekRetrievalStartDate2,
      hidesidebar: hidesidebar,
      hidedisplaytypepanel: hidedisplaytypepanel,
      defaultdatafilter: defaultdatafilter,
      enablelocaldbdata: enablelocaldbdata,
    });
  };

  render() {
    let {
      // currentdate,
      // currentmonth,
      // currentyear,
      activedate,
      activemonth,
      activeyear,
      viewtype,
      // eventdata,
      compType,
      defaultNewMeetingDate,
      defaultNewMeetingHour,
      viewMeetingData,
    } = this.state;
    let { hidesidebar, hidedisplaytypepanel } = this.props.compprops;
    console.log(this.state);
    let calenderFormat = [];
    calenderFormat.push(
      <div>
        <GetLocalIcon
          name="left"
          onClick={() => {
            this.changetoView("left");
          }}
        />
        <GetLocalIcon
          name="right"
          onClick={() => {
            this.changetoView("right");
          }}
        />

        <button
          onClick={() => {
            this.changetoView("day");
          }}
        >
          Day
        </button>
        <button
          onClick={() => {
            this.changetoView("week");
          }}
        >
          Week
        </button>
        <button
          onClick={() => {
            this.changetoView("month");
          }}
        >
          Month
        </button>
        {/* <button
          onClick={() => {
            this.changetoView("year");
          }}
        >
          Year
        </button>
         <button
          onClick={() => {
            this.changetoView("blue");
          }}
        >
          Blue Background
        </button>
        <button
          onClick={() => {
            this.changetoView("yellow");
          }}
        >
          Yellow Background
        </button> */}

        <button
          onClick={() => {
            this.changetoView("today");
          }}
        >
          Today
        </button>
        {viewtype === "day" ? (
          <span>
            {activeyear}-{activemonth}-{activedate}
          </span>
        ) : (
          ""
        )}
      </div>
    );

    let sidebar = [];
    sidebar.push(
      <div>
        <div>
          <button onClick={this.newMeeting}>New Meeting</button>
        </div>
        <div className="org-fr org-fai-c">
          My Calenders <GetGoogleIcon name="expand_more" />
        </div>
        <div className="org-fr org-fai-c">
          <input type="checkbox" /> <div>Birthdays</div>
        </div>
        <div className="org-fr org-fai-c">
          <input type="checkbox" /> <div>Personal</div>
        </div>
        <div className="org-fr org-fai-c">
          <input type="checkbox" /> <div>Training</div>
        </div>
        <div className="org-fr org-fai-c">
          Other Calenders <GetGoogleIcon name="expand_more" />
          <div>
            <input className="org-datainput" elementtype="searchinput" />
          </div>
        </div>
        <div className="org-fr org-fai-c">
          <input type="checkbox" /> <div>Kishan Rao</div>
        </div>
        <div className="org-fr org-fai-c">
          <input type="checkbox" /> <div>Yamini</div>
        </div>
        <div className="org-fr org-fai-c">
          <input type="checkbox" /> <div>Nagalatha</div>
        </div>
      </div>
    );

    let maincomp = [];
    //  let hourrowHtml = [];
    if (hidedisplaytypepanel === "false") {
      maincomp.push(calenderFormat);
    }
    if (viewtype === "day") {
      maincomp.push(this.getDayHtml());
    }
    if (viewtype === "week") {
      let dayformathtml = [];

      dayformathtml.push(this.getWeekHtml());

      maincomp.push(
        <div
          style={{
            height: "70vh",
            border: "1px solid black",
            width: "100%",
            overflow: "auto",
          }}
          className="org-fr"
        >
          {dayformathtml}
        </div>
      );
    }
    if (viewtype === "month") {
      maincomp.push(this.getMonthHtml());
    }
    if (viewtype === "monthh") {
      let weekcomp = [];
      for (let i = 0; i < 7; i++) {
        let datecomp = [];
        datecomp.push(
          <>
            <span
              style={{
                width: "160px",
                height: "130px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid grey",
                display: "inline-block",
              }}
            >
              <div style={{ textAlign: "center" }}> Mon</div>
              <div style={{ textAlign: "center" }}>1/12/2018</div>
              <div>
                <div style={{ backgroundColor: "lightblue", marginTop: "5px" }}>
                  Pradeep Birthday
                </div>
                <div style={{ backgroundColor: "lightblue", marginTop: "5px" }}>
                  Nagalatha Birthday
                </div>
                <div style={{ backgroundColor: "lightblue", marginTop: "5px" }}>
                  Salesforce Training
                </div>
              </div>
            </span>
          </>
        );
        weekcomp.push(datecomp);
      }

      let monthcomp = [];
      for (let i = 0; i < 4; i++) {
        monthcomp.push(<div>{weekcomp}</div>);
      }

      maincomp.push(monthcomp);
    }
    let newHtml = [];
    // newHtml.push(
    //   <Calendernewaction
    //     {...this.props}
    //     onmailsent={this.onmailsent}
    //     defaultNewMeetingDate={defaultNewMeetingDate}
    //     defaultNewMeetingHour={defaultNewMeetingHour}
    //     viewType="new"
    //   />
    // );

    let viewHtml = [];
    viewHtml.push(
      <Calenderviewaction
        key="calenderviewaction"
        {...this.props}
        onmailsent={this.onmailsent}
        defaultNewMeetingDate={defaultNewMeetingDate}
        defaultNewMeetingHour={defaultNewMeetingHour}
        viewType="view"
        viewMeetingData={viewMeetingData}
      />
    );

    return (
      <>
        {compType === "list" && hidesidebar === "false" ? (
          <div className="org-fr org-flexbasis-100p">
            <span className="org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p sp">
              {sidebar}
            </span>
            <div className="org-flexbasis-100p org-mflexbasis-80p org-lflexbasis-80p sp ">
              {maincomp}
            </div>
          </div>
        ) : (
          []
        )}
        {compType === "list" && hidesidebar === "true" ? (
          <div className="org-fr org-flexbasis-100p ">
            <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p sp ">
              {maincomp}
            </div>
          </div>
        ) : (
          []
        )}
        {compType === "new" ? <div>{newHtml}</div> : []}
        {compType === "view" ? <div>{viewHtml}</div> : []}
      </>
    );
  }
}

export default F;

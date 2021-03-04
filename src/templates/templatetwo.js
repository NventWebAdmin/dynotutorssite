import React, { Component } from "react";
import Logo from "../images/snowmount.jpg";
import "../app.css";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = { activePageName: "" };
  }

  tabClick = (x) => {
    this.setState({ activePageName: x });
  };

  render() {
    let { siteprops } = this.props;
    let {
      sitelogourl,
      siteheaderorgname,
      siteheadernavmenuitems,
      siteintroposition,
      siteintroheading,
      siteintrosubheading,
      siteintroinputplaceholder,
      siteintrobuttonlabel,
      sitebodyarray,
      sitefooterlinks1,
      sitefooterlinks2,
      siteorgaddress,
      sitesociallinks,
    } = siteprops;
    let { activePageName } = this.state;
    if (activePageName == "") {
      activePageName = "home";
    }

    //let x = "left";

    // site header begin

    let logoHtml = [];
    logoHtml.push(
      <h1 className="sp" onClick={() => this.tabClick("home")}>
        {siteheaderorgname}
      </h1>
    );

    let navmenuItemHtml = [];
    let navmenuHtml = [];
    for (let i in siteheadernavmenuitems) {
      navmenuItemHtml.push(
        <div onClick={() => this.tabClick(i)}>
          <div className="dropdown">
            {siteheadernavmenuitems[i].label}{" "}
            <i class="fa fa-angle-down sp"></i>
            <div className="dropdown-content">
              <div className="dropdown2 ">
                <div className="org-fr org-fai-c org-fjc-sb org-bb">
                  test <i class="fa fa-angle-right "></i>
                </div>
                <div className="dropdown2-contentright ">
                  <div className="org-bb">test</div>
                  <div className="org-bb">test</div>
                  <div className="org-bb">test</div>
                </div>
              </div>

              <div className="dropdown2 ">
                <div className="org-fr org-fai-c org-fjc-sb org-bb">
                  test <i class="fa fa-angle-right "></i>
                </div>
                <div className="dropdown2-contentright ">
                  <div className="org-bb">test</div>
                  <div className="org-bb">test</div>
                  <div className="org-bb">test</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    navmenuHtml.push(
      <div className="org-fr org-fjc-e org-fai-c org-cdivleft-lp org-cdivv-mp lf">
        {navmenuItemHtml}
      </div>
    );

    let navmenuRowHtml = [];
    navmenuRowHtml.push(
      <div className="org-fr org-fai-c ">
        <div className="org-flexbasis-100p org-mflexbasis-20p org-lflexbasis-20p ">
          {logoHtml}
        </div>
        <div className="org-flexbasis-100p org-mflexbasis-80p org-lflexbasis-80p ">
          {navmenuHtml}
        </div>
      </div>
    );

    // site header end

    let siteintroBodyLeftHtml = [];
    siteintroBodyLeftHtml.push(
      <div style={{ width: "100%" }}>
        <div style={{ fontSize: "50px" }}>{siteintroheading}</div>
        <br />
        <br />
        <div style={{ fontSize: "30px" }}>{siteintrosubheading}</div>
        <br />
        <br />
        <div className="org-fr org-fai-c">
          <div
            style={{
              backgroundColor: "white",
              width: "75%",
              height: "50px",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <input
              placeholder={siteintroinputplaceholder}
              style={{
                width: "100%",
                height: "100%",
                padding: 0,
                border: 0,
              }}
            />
          </div>
          <div
            style={{
              backgroundColor: "#3bb3bd",
              width: "25%",
              height: "50px",
              textAlign: "center",
              padding: "10px",
            }}
            className="org-fr org-fjc-c org-fai-c"
          >
            {siteintrobuttonlabel}
          </div>
        </div>
      </div>
    );

    // siteintro start
    let siteintroHtml = [];

    siteintroHtml.push(
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={Logo}
          width="100%"
          height="600px"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            left: "0%",
            top: "0%",
            width: "100%",
            padding: "10px 30px",
          }}
        >
          {navmenuRowHtml}
        </div>
        {siteintroposition == "center" ? (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "30%",
              transform: "translate(-50%, 0%)",
            }}
          >
            {siteintroBodyLeftHtml}
          </div>
        ) : (
          ""
        )}
        {siteintroposition == "left" ? (
          <div
            style={{
              position: "absolute",
              left: "5%",
              top: "30%",
            }}
          >
            {siteintroBodyLeftHtml}
          </div>
        ) : (
          ""
        )}
        {siteintroposition == "right" ? (
          <div
            style={{
              position: "absolute",
              right: "5%",
              top: "30%",
            }}
          >
            {siteintroBodyLeftHtml}
          </div>
        ) : (
          ""
        )}
      </div>
    );

    siteintroHtml = [];
    siteintroHtml.push(<>{navmenuRowHtml}</>);

    // siteintro end
    // sitebody start
    let sitebodyHtml = [];
    console.log(activePageName);
    console.log(sitebodyarray[activePageName]);
    for (let i in sitebodyarray[activePageName]) {
      console.log(sitebodyarray[activePageName][i]);

      let sitebodyArrayItem = sitebodyarray[activePageName][i];
      if (sitebodyArrayItem.type == "imgright") {
        sitebodyHtml.push(
          <div className="org-fr lm">
            <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
              <div className="elf">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
            <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
              <img
                src={sitebodyArrayItem.imgurl}
                width="100%"
                height="300px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        );
      }
      if (sitebodyArrayItem.type == "imgleft") {
        sitebodyHtml.push(
          <div className="org-fr lm">
            <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
              <img
                src={sitebodyArrayItem.imgurl}
                width="100%"
                height="300px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p mp">
              <div className="elf">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
          </div>
        );
      }
      if (sitebodyArrayItem.type == "imgcenter") {
        sitebodyHtml.push(
          <div className="org-fr lm">
            <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p mp">
              <img
                src={sitebodyArrayItem.imgurl}
                width="100%"
                height="300px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p mp">
              <div className="elf">{sitebodyArrayItem.heading}</div>
              <br />
              <div className="mf">{sitebodyArrayItem.body}</div>
            </div>
          </div>
        );
      }
      if (sitebodyArrayItem.type == "threecolumn") {
        let columnhtml = [];
        for (let j in sitebodyArrayItem.body) {
          columnhtml.push(
            <div className="org-flexbasis-100p org-mflexbasis-33p org-lflexbasis-33p mp mf">
              <div className="org-flexbasis-100p org-mflexbasis-100p org-lflexbasis-100p ">
                <img
                  src={Logo}
                  width="100%"
                  height="300px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="elf">test</div>
              Are you struggling to keep up with your coursework? Do you want to
              get a head start on the next school year? At Tutor Doctor Park Cit
            </div>
          );
        }
        sitebodyHtml.push(<div className="org-fr lm">{columnhtml}</div>);
      }
      if (sitebodyArrayItem.type == "getstartedbuttonpanel") {
        sitebodyHtml.push(
          <div className="org-fr org-fjc-c org-fai-c  org-flexbasis-100p">
            <div className="eeelf org-flexbasis-100p org-mflexbasis-50p org-lflexbasis-50p">
              {sitebodyArrayItem.heading}
              <br />
              <br />
              <div
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "white",
                  textAlign: "center",
                }}
              >
                {sitebodyArrayItem.buttonlabel}
              </div>
              <br />
              <br />
            </div>
          </div>
        );
      }
    }

    // sitebody end
    // sitefooter start

    let sitesocialhtml = [];
    for (let i in sitesociallinks) {
      if (i == "facebook") {
        sitesocialhtml.push(<i class="fa fa-facebook-f sp"></i>);
      }
      if (i == "twitter") {
        sitesocialhtml.push(<i class="fa fa-twitter sp"></i>);
      }
      if (i == "whatsapp") {
        sitesocialhtml.push(<i class="fa fa-whatsapp sp"></i>);
      }
    }
    let sitefooterhtml1 = [];
    let sitefooterhtml2 = [];

    for (let i in sitefooterlinks1) {
      sitefooterhtml1.push(<div>{sitefooterlinks1[i].label}</div>);
    }
    for (let i in sitefooterlinks2) {
      sitefooterhtml2.push(<div>{sitefooterlinks2[i].label}</div>);
    }
    let sitefooterhtml = [];
    sitefooterhtml.push(
      <div className="org-fr  mp">
        <div className=" mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          {sitefooterhtml1}
        </div>
        <div className="mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          {sitefooterhtml2}
        </div>

        <div className="mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          <div>Contact Us</div>
          <div> {siteorgaddress}</div>
        </div>

        <div className="mf org-flexbasis-100p org-mflexbasis-25p org-lflexbasis-25p org-c-div-tac">
          <div> Social</div>
          <div>{sitesocialhtml}</div>
        </div>
      </div>
    );
    // sitefooter end

    return (
      <div style={{ color: "black" }}>
        <div>{siteintroHtml}</div>
        <div>{sitebodyHtml}</div>
        <div>{sitefooterhtml}</div>
      </div>
    );
  }
}

export default F;

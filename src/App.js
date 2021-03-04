import React, { Component } from "react";
import Logo from "./images/snowmount.jpg";
import "./app.css";
import Templateone from "./templates/templateone";
import Templatetwo from "./templates/templatetwo";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let siteprops = {};
    siteprops.sitetemplatename = "templatetwo";
    siteprops.sitelogourl = "";
    siteprops.siteheaderorgname = "Dynotutors";
    siteprops.siteheadernavmenuitems = {
      findtutors: { label: "Find Tutors", name: "findtutors", action: {} },
      enterprise: { label: "Enterprise", name: "enterprise", action: {} },
      becomeatutor: {
        label: "Become a Tutor",
        name: "becomeatutor",
        action: {},
      },
      // languagecurrency: {
      //   label: "Language & Curency",
      //   name: "languagecurrency",
      //   action: {},
      // },
      login: { label: "Login", action: {} },
    };

    siteprops.siteintroposition = "left";
    siteprops.siteintroheading = "Prepare to speak confidently";
    siteprops.siteintrosubheading = "with the best online tutors";
    siteprops.siteintroinputplaceholder = "What do you want to learn?";
    siteprops.siteintrobuttonlabel = "Find a Tutor";

    siteprops.sitebodyarray = {
      home: {
        0: {
          type: "imgright",
          imgurl: Logo,
          heading: "Tutoring Services in Park Cities",
          body:
            " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
        },
        1: {
          type: "imgcenter",
          imgurl: Logo,
          heading: "Tutoring Services in Park Cities",
          body:
            " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
        },
        2: {
          type: "imgleft",
          imgurl: Logo,
          heading: "Tutoring Services in Park Cities",
          body:
            " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
        },
        3: {
          type: "threecolumn",
          body: {
            0: {
              type: "threecolumn",
              imgurl: Logo,
              heading: "Tutoring Services in Park Cities",
              body:
                " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
            },
            1: {
              type: "threecolumn",
              imgurl: Logo,
              heading: "Tutoring Services in Park Cities",
              body:
                " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
            },
            2: {
              type: "threecolumn",
              imgurl: Logo,
              heading: "Tutoring Services in Park Cities",
              body:
                " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
            },
          },
        },
        4: {
          type: "getstartedbuttonpanel",

          heading: "Still have questions ? chat us or",
          buttonlabel: "Get Started",
        },
      },
      enterprise: {
        1: {
          type: "imgcenter",
          imgurl: Logo,
          heading: "Tutoring Services in Park Cities",
          body:
            " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
        },
        2: {
          type: "imgleft",
          imgurl: Logo,
          heading: "Tutoring Services in Park Cities",
          body:
            " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
        },
        3: {
          type: "threecolumn",
          body: {
            0: {
              type: "threecolumn",
              imgurl: Logo,
              heading: "Tutoring Services in Park Cities",
              body:
                " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
            },
            1: {
              type: "threecolumn",
              imgurl: Logo,
              heading: "Tutoring Services in Park Cities",
              body:
                " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
            },
            2: {
              type: "threecolumn",
              imgurl: Logo,
              heading: "Tutoring Services in Park Cities",
              body:
                " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
            },
          },
        },
        4: {
          type: "getstartedbuttonpanel",

          heading: "Still have questions ? chat us or",
          buttonlabel: "Get Started",
        },
      },
    };

    siteprops.sitefooterlinks1 = {
      0: { label: "About Us", link: "" },
      1: { label: "Help", link: "" },
      2: { label: "How it works", link: "" },
      3: { label: "Question and Answers", link: "" },
    };
    siteprops.sitefooterlinks2 = {
      0: { label: "Job Opportunities", link: "" },
      1: { label: "Find a Private tutor", link: "" },
      2: { label: "How to learn English", link: "" },
    };

    siteprops.siteorgaddress =
      "+1510240000 test@test.com hyderabad India, 50000";
    siteprops.sitesociallinks = {
      facebook: "facebook.com",
      twitter: "twitter.com",
      whatsapp: "whatsapp.com",
    };

    return (
      <>
        {siteprops.sitetemplatename == "templatetwo" ? (
          <Templatetwo siteprops={siteprops} />
        ) : (
          ""
        )}
        {siteprops.sitetemplatename == "templateone" ? (
          <Templateone siteprops={siteprops} />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default F;

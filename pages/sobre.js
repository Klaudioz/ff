import React, { Component } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import colors from "../components/Colors";
import Signup from "../components/Signup";
import { logPageView, logEvent } from "../utils/analytics";

function getYear() {
  const y = new Date().getFullYear();
  return y;
}

function handleClick(donationValue) {
  logEvent("User", `Clicked Donate: ${donationValue} $`);
}

class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    logPageView();
  }

  render() {
    return (
      <div>
        <Header title="Sobre" />
        <NavBar />
        <div
          style={{ backgroundColor: "white", color: colors.darkBrown }}
          className="w-100 ph5-ns ph4 pb6 tl pt5"
        >
          <div className="mw7 ph4-ns flex flex-row-l flex-column center justify-between">
            <h1
              className="normal f2 tracked-tight b"
              style={{
                color: colors.black,
                fontFamily: "Nunito, system-ui, sans-serif",
              }}
            >
              About
            </h1>
            <div className="flex flex-column pt4">
              <p className="measure lh-copy normal mt0">
                We built this site because we believe that information about
                financial planning can be more fun, accessible,
                educational, and transparent.
              </p>

              <div className="pt3 pb4 bw1 b--black-10 bg-lightest-blue pa4 br4">
                <h3 className="b chocolate">Newsletter</h3>
                <p className="mb4">
                Sign up to hear about the launch.
                </p>
                <Signup />
              </div>
              <h3 className="b mt5 chocolate">Contact</h3>
              <p className="measure mt0">
              For questions and suggestions, send us an email by clicking{" "}
                <a
                  className="link"
                  style={{ color: colors.redPink }}
                  href="mailto:klaudioz@gmail.com?subject=[Contact]"
                >
                  here
                </a>
                .
              </p>
              <h3 className="b mt4 chocolate">Open source</h3>
              <p className="measure lh-copy">
                Source code available here: {" "}
                <a
                  className="link"
                  style={{ color: colors.redPink }}
                  href="https://github.com/lucasnantonio/ff"
                  target="_blank"
                >
                  Github
                </a>
              </p>
              <div className="mt4 bt bw1 b--near-white w-100 pt4">
                <p className="measure lh-copy f7">
                  {getYear()}&nbsp;
                  <a
                    className="link"
                    style={{ color: colors.redPink }}
                    target="_blank"
                    href="https://www.claud.dev"
                  >
                    Claudio Canales&nbsp;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            button:hover {
              background-color: ${colors.darkGreenHover} !important;
            }
            button:active {
              background-color: ${colors.darkGreenActive} !important;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Index;

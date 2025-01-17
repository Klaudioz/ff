/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import colors from "./Colors";

const NavBar = props => (
  <div
    style={{ background: "#fff" }}
    className="white f5 ph4 pv3-ns pv2 w-100 ph4 z-max bb bw1 b--near-white"
  >
    <div className="flex mw7 ph4-ns center justify-between">
      <Link href="/">
        <button
          onClick={() =>
            props.isShowingAnswer || props.isShowingQuestions
              ? props.resetApp()
              : null
          }
          className="bn bg-transparent b pointer link white ph0"
        >
          <Logo isShowingAnswer={props.isShowingAnswer} />
        </button>
      </Link>
      <Link href="/sobre">
        <a
          style={{ transition: "all .2s" }}
          href="#"
          className="fw9 f7 link black-40 hover-black pointer pa3-ns pv3 br-pill chocolate-bold"
        >
          About
        </a>
      </Link>
    </div>
    <style jsx>
      {`
        a:hover {
          background-color: ${colors.lightGray};
        }
      `}
    </style>
  </div>
);

export default NavBar;

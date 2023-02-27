import React, { Component } from "react";
import CSSTransitionGroup from "react-addons-css-transition-group";
import colors from "./Colors";

const feedbacklist = {
  mySelectedInvestment: {
    poupança:
      "Be careful when choosing savings as your main investment. There are options with the same security and much better yields. Despite this, 39% of Brazilians preparing for retirement leave money in savings. :(",
    "renda fixa":
      "Good choice! Fixed income investments, such as Treasury Direct, CDBs and others, are a good low-risk option for those who are focused on the long term.",
    "renda variável":
    "Excellent! Variable income investments are a good option for those " +
    "is focused on the long term. Not everyone feels " +
    "comfortable with seeing money fluctuating every day, so it's important " +
    "check your investment profile.",
    "carteira mista":
      "Great! You already diversify your investments! Fill in the form below according to how much you invest in each part of your portfolio:"
  },
  poupança: [
    {
      lowerValue: 1.6,
      upperValue: 3.4,
      message:
        "You are optimistic. The average real return on savings from the year 2000 to date has been just 1.4% p.a.",
      src: "Source: www.ipeadata.gov.br"
    },
    {
      lowerValue: 3.5,
      upperValue: 5.1,
      message:
        "Since the year 2000, savings have had this rate of return only in 2006. Are you sure about this rate?",
      src: "Source: www.ipeadata.gov.br"
    }
  ],
  "renda fixa": [
    {
      lowerValue: 5,
      upperValue: 6.9,
      message:
        "You are optimistic. The average real return on the SELIC treasury from the year 2000 until today was only 4.7% p.a.",
      src: "Source: www.ipeadata.gov.br"
    },
    {
      lowerValue: 7,
      upperValue: 9,
      message:
        "Since the year 2000, fixed income has had this level of income only in 4 years. Are you sure about that rate?",
      src: "Source: www.ipeadata.gov.br"
    }
  ],
  "renda variável": [
    {
      lowerValue: 20,
      upperValue: Number.POSITIVE_INFINITY,
      message:
        "Wow! Tell me the magic you're doing to have this income!",
      src: "Fonte: Berkshire Hathaway. Annual Report, 2017."
    }
  ],
  myCurrentAge: [
    {
      lowerValue: 0,
      upperValue: 29,
      message:
        "It's starting early, congratulations! The average age of people starting to save for retirement is 28. Those initial years of investment make a lot of difference up front.",
      src:
        "Source: SPC Brasil. Preparing for retirement in Brazil. April 2018."
    },
    {
      lowerValue: 50,
      upperValue: 60,
      message:
        "It's never late to start! Start saving now and secure a more independent future."
    }
  ],
  myCurrentMonthlySavings: [
    {
      lowerValue: 10,
      upperValue: 999,
      message:
        "Saving an amount every month, even a small one, will have a huge impact on your quality of life down the road.",
      reaction: 0
    },
    {
      lowerValue: 1000,
      upperValue: 9999,
      message:
        "Did you know that only 31% of Brazilians saved part of their income in the last 12 months? You are part of this group, congratulations!",
      src:
        "Source: Central Bank of Brazil. Financial citizenship series. November 2017.",
      reaction: 0
    },
    {
      lowerValue: 10000,
      upperValue: Number.POSITIVE_INFINITY,
      message:
        "Wow! With monthly contributions of this size, you will reach financial independence in no time.",
      reaction: 1
    }
  ],
  myRetirementIncome: [
    {
      lowerValue: 5645.81,
      upperValue: Number.POSITIVE_INFINITY,
      message:
        "You intend to retire with an amount above the current ceiling of the INSS ($ 5645.81), so the rest should come from your savings over the years.",
      src:
        "Source: Central Bank of Brazil. Financial citizenship series. November 2017."
    }
  ]
};

class PigFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
  }

  hasFeedback = id => {
    const feedback =
      feedbacklist[id] &&
      feedbacklist[id].filter(
        item =>
          this.props.value >= item.lowerValue &&
          this.props.value <= item.upperValue
      );
    return feedback && feedback[0];
  };

  getFeedback = id => {
    const feedback =
      feedbacklist[id] &&
      feedbacklist[id].filter(
        item =>
          this.props.value >= item.lowerValue &&
          this.props.value <= item.upperValue
      );
    return feedback && feedback[0] && feedback[0].message;
  };

  getInvestmentFeedback = options => {
    const selectedInvestment = options.filter(item => item.isSelected);
    const feedback =
      feedbacklist.mySelectedInvestment[selectedInvestment[0].label];
    return feedback;
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ render: true });
    }, 1000);
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionName="feedback"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {this.hasFeedback(this.props.id) && this.state.render && (
          <p
            style={{
              color: "#173440",
              padding: "2rem 2rem",
              border: `2px solid ${colors.lightGray2}`
            }}
            className="pt2 mt4 overflow-hidden br3 f6-ns f7 lh-copy w-100 mb0 measure bg-white"
          >
            {this.getFeedback(this.props.id)}
          </p>
        )}
        {this.props.investmentOptions !== undefined &&
          this.props.investmentOptions.filter(i => i.isSelected).length > 0 &&
          this.state.render && (
            <p
              id="investmentTip"
              style={{
                color: "rgba(0,0,0,.8)",
                padding: "2rem 2rem",
                border: `2px solid ${colors.lightGray2}`
              }}
              className="bg-white pt2 mt4 overflow-hidden br3 f6-ns f7 lh-copy w-100 mb0 measure"
            >
              {this.getInvestmentFeedback(this.props.investmentOptions)}
            </p>
          )}
        <style jsx>
          {`
            p {
              -moz-transition: all 0.5s cubic-bezier(0.72, 0.01, 0.58, 1.16);
              -ms-transition: all 0.5s cubic-bezier(0.72, 0.01, 0.58, 1.16);
              -o-transition: all 0.5s cubic-bezier(0.72, 0.01, 0.58, 1.16);
              -webkit-transition: all 0.5s cubic-bezier(0.72, 0.01, 0.58, 1.16);
              transition: all 0.5s cubic-bezier(0.72, 0.01, 0.58, 1.16);
            }
             {
              .feedback-appear {
                opacity: 0;
                max-height: 0;
                padding: 0 0;
                transform: translateY(20px);
              }
              .feedback-appear.feedback-appear-active {
                opacity: 1;
                padding: 2rem 2rem;
                max-height: 20rem;
                transform: translateY(0px);
              }
              .feedback-leave {
                opacity: 1;
                padding: 2rem 2rem;
                max-height: 20rem;
                transform: translateY(0px);
              }
              .feedback-leave.feedback-leave-active {
                opacity: 0;
                padding: 0 0;
                max-height: 0;
                transform: translateY(20px);
              }
              .feedback-enter {
                opacity: 0;
                padding: 0 0;
                max-height: 0;
                transform: translateY(20px);
              }
              .feedback-enter.feedback-enter-active {
                opacity: 1;
                padding: 2rem 2rem;
                max-height: 20rem;
                transform: translateY(0px);
              }
            }
          `}
        </style>
      </CSSTransitionGroup>
    );
  }
}

export default PigFeedback;

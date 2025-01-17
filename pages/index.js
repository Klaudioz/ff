import React, { Component } from "react";
import { hotjar } from "react-hotjar";
import { initGA, logPageView, logEvent } from "../utils/analytics";
import Questions from "../components/Questions";
import Answer from "../components/Answer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TipsContainer from "../components/TipsContainer";
import NavBar from "../components/NavBar";
import colors from "../components/Colors";
import { getRetirementResults, getStudyCasesResults } from "../utils/math";
import { isNumber, valueByInputType } from "../utils/input";
import Signup from "../components/Signup";

function getRates(label) {
  return {
    poupança: 1.5,
    "renda fixa": 4.5,
    "renda variável": 7.0,
  }[label];
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingAnswer: false,
      isShowingQuestions: false,
      myCurrentBalance: 0,
      myCurrentAge: 18,
      myCurrentMonthlySavings: 100,
      myRetirementIncome: 0,
      myLifeExpectancy: 100,
      annualSavingsIncreaseRate: 0,
      selectedInvestment: false,
      leaveHeritage: false,
      myWallet: [
        {
          label: "poupança",
          allocation: 0,
        },
        {
          label: "renda fixa",
          allocation: 0,
        },
        {
          label: "renda variável",
          allocation: 0,
        },
      ],
      myInvestments: [
        {
          label: "savings",
          rate: getRates("poupança"),
          isSelected: false,
          isWallet: false,
        },
        {
          label: "renda fixa",
          rate: getRates("fixed income"),
          isSelected: false,
          isWallet: false,
        },
        {
          label: "variable income",
          rate: getRates("renda variável"),
          isSelected: false,
          isWallet: false,
        },
        {
          // just a placeholder, not a real investment
          label: "mixed portfolio",
          isSelected: false,
          isWallet: true,
        },
      ],
      studyCases: [
        // {
        //   label: 'changeMonthlySavings',
        //   myCurrentMonthlySavings: undefined,
        // },
        // {
        //   label: 'changeCurrentBalance',
        //   myCurrentBalance: undefined,
        // },
        // {
        //   label: 'changeLeaveHeritage',
        //   leaveHeritage: undefined,
        // },
        // {
        //   label: 'changeSelectedInvestment',
        //   myWallet: undefined,
        // },
        // {
        //   label: 'changeCurrentAge',
        //   myCurrentAge: undefined,
        // },
        // {
        //   label: 'optimized',
        //   myCurrentMonthlySavings: undefined,
        //   myCurrentBalance: undefined,
        //   leaveHeritage: undefined,
        //   myCurrentAge: undefined,
        //   myWallet: undefined,
        // },
      ],
      lifeEvents: [
        {
          label: "",
          age: 0,
          cost: "0",
        },
      ],
      retirementResults: false,
      studyCasesResults: false,
      focusedInput: "",
    };
  }

  componentDidMount() {
    if (process.env.NODE_ENV === "development") return null;

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    hotjar.initialize(1140598, 6);
  }

  componentDidUpdate(prevProps, prevState) {
    const nextRetirementResults = getRetirementResults(this.state);
    const nextStudyCasesResults = getStudyCasesResults(this.state);

    if (
      JSON.stringify(prevState.retirementResults) !==
      JSON.stringify(nextRetirementResults)
    ) {
      this.setState({ retirementResults: nextRetirementResults });
    }

    if (
      JSON.stringify(prevState.studyCasesResults) !==
      JSON.stringify(nextStudyCasesResults)
    ) {
      this.setState({ studyCasesResults: nextStudyCasesResults });
    }
  }

  startApp = () => {
    this.setState({ isShowingQuestions: true });
    logEvent("User", "clicked start");
  };

  resetApp = () => {
    this.setState({
      isShowingAnswer: false,
      isShowingQuestions: false,
      selectedInvestment: false,
    });
  };

  assembleStudyCases() {
    // update studyCases with user input
    const studyCases = this.state.studyCases.map((item) =>
      Object.assign(
        {},
        ...Object.keys(item).map((key) => {
          if (key === "label") {
            return { [key]: item[key] };
          }
          return { [key]: this.state[key] };
        })
      )
    );
    this.setState({ studyCases });
  }

  handleShowAnswer = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    this.setState({ isShowingAnswer: true });
    this.assembleStudyCases();
    logEvent("User", "clicked calculate");
  };

  handleBack = () => {
    this.setState({ isShowingAnswer: false, isShowingIntro: true });
  };

  handleInput = (e, value) => {
    const { id } = e.target;
    this.setState({ [id]: value === "" ? 0 : parseFloat(value) });
  };

  handleInputButtons = (e) => {
    const parentNode =
      e.target.parentNode.parentNode.querySelectorAll("input")[0];
    const parentId = parentNode.id;
    const parentValue = parentNode.value;
    this.setState({ [parentId]: parseFloat(parentValue) });
  };

  handleStudyCaseInput = (e, floatValue, studyCaseLabel) => {
    const { id, type, checked, value } = e.target;

    const studyCases = this.state.studyCases.map((item) => {
      if (
        item.label === studyCaseLabel ||
        (item.label === "optimized" && id in item)
      ) {
        // optimized case will mirror the other study cases values
        return {
          ...item,
          [id]: valueByInputType(type, floatValue, value, checked),
        };
      }
      return item;
    });

    this.setState({ studyCases });
  };

  handleStudyCaseWallet = (e, floatValue, studyCaseLabel) => {
    const { id } = e.target;
    const studyCases = this.state.studyCases.map((item) => {
      if (
        item.label === studyCaseLabel ||
        (item.label === "optimized" && "myWallet" in item)
      ) {
        const myWallet = { ...item.myWallet, [id]: parseFloat(floatValue) };
        return {
          ...item,
          myWallet,
        };
      }
      return item;
    });
    this.setState({ studyCases });
  };

  handleInvestmentRateInput = (e) => {
    const { id, value } = e.target;
    const myInvestments = this.state.myInvestments.map((item) => {
      if (item.label === id) {
        return {
          ...item,
          rate: value,
        };
      }
      return item;
    });
    this.setState({ myInvestments });
  };

  assembleMyWallet(selectedInvestmentLabel) {
    // if some investment option is selected, allocate 100% in that investment
    // and 0 % for the others
    const myWallet = this.state.myWallet.map((item) => ({
      ...item,
      allocation: item.label === selectedInvestmentLabel ? 100 : 0,
    }));

    this.setState({ myWallet });
  }

  handleInvestmentSelector = (e, index) => {
    const investmentsState = this.state.myInvestments;
    const myInvestments = investmentsState.map((item, itemIndex) => ({
      ...item,
      isSelected: index === itemIndex,
    }));

    this.assembleMyWallet(myInvestments[index].label);

    this.setState({
      myInvestments,
      selectedInvestment: true,
    });

    const investmentTip = document.getElementById("investmentTip");
    if (investmentTip) {
      investmentTip.scrollIntoView({ behavior: "smooth" });
    }

    logEvent("User", "Selected Investment");
  };

  handleResetRates = () => {
    const myInvestments = this.state.myInvestments.map((investment) => ({
      ...investment,
      rate: getRates(investment.label),
    }));

    this.setState({ myInvestments });
    logEvent("User", "clicked reset taxas");
  };

  handleWalletInput = (e, floatValue) => {
    const { id } = e.target;
    const value = floatValue === "" ? 0 : parseFloat(floatValue);

    const myWallet = this.state.myWallet.map((item) => {
      if (item.label === id) {
        return {
          ...item,
          allocation: value,
        };
      }
      return item;
    });

    this.setState({ myWallet });
  };

  setFocusedInput = (inputId) => {
    this.setState({ focusedInput: inputId });
  };

  handleTableInput = (e, value, idx, tableName, table, textField = false) => {
    const field = e.target.id;

    if (isNumber(value) || textField) {
      const updatedTable = table.map((row, pidx) => {
        if (idx === pidx) {
          return {
            ...row,
            [field]: textField ? value : parseFloat(value),
          };
        }
        return row;
      });
      this.setState((prevState) => ({
        [tableName]: updatedTable,
        retirementResults: getRetirementResults({
          ...prevState,
          [tableName]: updatedTable,
        }),
      }));
    }
  };

  handleAddTableRow = (tableName, fields) => () => {
    this.setState({
      [tableName]: [...this.state[tableName], fields],
    });
    logEvent("User", "added life event");
  };

  handleRemoveTableRow = (idx, tableName, table) => () => {
    const updatedTable = table.filter((p, pidx) => idx !== pidx);
    this.setState((prevState) => ({
      [tableName]: updatedTable,
      retirementResults: getRetirementResults({
        ...prevState,
        [tableName]: updatedTable,
      }),
    }));
    logEvent("User", "removed life event");
  };

  render() {
    return (
      <div id="pageWrapper" className="center vh-100 flex flex-column">
        <Header title="Klaudioz Fintech" />
        <NavBar
          resetApp={this.resetApp}
          isShowingAnswer={this.state.isShowingAnswer}
        />
        {!this.state.isShowingAnswer ? (
          <Hero
            startApp={this.startApp}
            isShowingQuestions={this.state.isShowingQuestions}
          />
        ) : (
          <div>
            <Answer {...this.state} />
            {/* <TipsContainer
              handleStudyCaseInput={this.handleStudyCaseInput}
              handleStudyCaseWallet={this.handleStudyCaseWallet}
              myInvestments={this.state.myInvestments}
              studyCases={this.state.studyCases}
              retirementResults={this.state.retirementResults}
              studyCasesResults={this.state.studyCasesResults}
              currentRetirementAge={this.state.retirementResults[0][1].retirement.age}
            /> */}
          </div>
        )}

        <div
          id="questionsContainer"
          className={`w-100 center ph0-ns ph3`}
          style={{ backgroundColor: "#CFF6FF" }}
        >
          <Questions
            {...this.state}
            isShowingAnswer={this.state.isShowingAnswer}
            startApp={this.startApp}
            handleShowAnswer={this.handleShowAnswer}
            handleResetRates={this.handleResetRates}
            handleInput={this.handleInput}
            handleInputButtons={this.handleInputButtons}
            handleCurrencyInput={this.handleCurrencyInput}
            handleTableInput={this.handleTableInput}
            handleAddTableRow={this.handleAddTableRow}
            handleRemoveTableRow={this.handleRemoveTableRow}
            handleInvestmentSelector={this.handleInvestmentSelector}
            handleInvestmentRateInput={this.handleInvestmentRateInput}
            setFocusedInput={this.setFocusedInput}
            handleWalletInput={this.handleWalletInput}
          />
        </div>
      </div>
    );
  }
}

export default Index;

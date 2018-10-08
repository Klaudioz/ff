import React, { Component } from 'react';
import InputContainer from '../components/InputContainer';
import OutPutContainer from '../components/OutPutContainer';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Button from '../components/Button';
import { getRetirementResults } from '../utils/math';
import { isNumber } from '../utils/input';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingIntro: true,
      isShowingCalculation: false,
      myCurrentBalance: 5000,
      myCurrentAge: 24,
      myCurrentMonthlySavings: 500,
      myRetirementIncome: 10000,
      myLifeExpectancy: 100,
      myInvestments: [
        {
          label: 'poupança',
          rate: 3,
          isSelected: false,
        },
        {
          label: 'renda fixa',
          rate: 6,
          isSelected: false,
        },
        {
          label: 'renda variável',
          rate: 8.5,
          isSelected: false,
        },
      ],
      lifeEvents: [
        {
        },
      ],
      retirementResults: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const nextRetirementResults = getRetirementResults(this.state);
    if (JSON.stringify(prevState.retirementResults) !== JSON.stringify(nextRetirementResults)) {
      // update if results are different
      this.setState({ retirementResults: nextRetirementResults });
    }
  }

  startApp = () => {
    this.setState({ isShowingIntro: false });
  }

  showFirstCalculation = () => {
    this.setState({ isShowingCalculation: true });
  }

  handleBack = () => {
    this.setState({ isShowingCalculation: false, isShowingIntro: true });
  }

  handleCurrencyInput = (e, floatValue) => {
    const { id } = e.target;
    this.setState({ [id]: floatValue });
  }

  handleInputButtons = (e) => {
    const parentNode = e.target.parentNode.parentNode.querySelectorAll('input')[0];
    const parentId = parentNode.id;
    const parentValue = parentNode.value;
    this.setState({ [parentId]: parentValue });
  }

  handleInput = (e) => {
    const { id, value } = e.target;
    if (e.target.type !== undefined && e.target.dataset.type !== 'rate') { // if user is typing inside input, not using buttons
      this.setState({ [id]: value });
    } else if (e.target.dataset.type === 'rate') { // check if is investment rate input
      const updateMyInvestments = this.state.myInvestments.map((item) => {
        if (item.label === id) {
          return {
            ...item,
            rate: value,
          };
        }
        return item;
      });
      this.setState({ myInvestments: updateMyInvestments });
    }
  }

  handleInvestmentSelector = (e, index) => {
    const investmentsState = this.state.myInvestments;
    const ressetedInvestment = investmentsState.map((item, itemIndex) => ({
      ...item,
      isSelected: index === itemIndex,
    }));
    this.setState({ myInvestments: ressetedInvestment });
  }

  handleTableInput = (idx, tableName, table, textField = false) => (event) => {
    const { value } = event.target;
    const field = event.target.id;

    if (isNumber(value) || textField) {
      const updatedTable = table.map((row, pidx) => {
        if (idx === pidx) {
          return {
            ...row,
            [field]: value,
          };
        }
        return row;
      });
      this.setState(prevState => ({
        [tableName]: updatedTable,
        retirementResults: getRetirementResults(
          { ...prevState, [tableName]: updatedTable },
        ),
      }));
    }
  };

  handleAddTableRow = (tableName, fields) => () => {
    this.setState({
      [tableName]: [...this.state[tableName], fields],
    });
  };

  handleRemoveTableRow = (idx, tableName, table) => () => {
    const updatedTable = table.filter((p, pidx) => idx !== pidx);
    this.setState(prevState => ({
      [tableName]: updatedTable,
      retirementResults: getRetirementResults(
        { ...prevState, [tableName]: updatedTable },
      ),
    }));
  };

  handleResetRates = () => {
    const { myInvestments } = this.state;

    const rates = {
      poupança: 3,
      'renda fixa': 6,
      'renda variável': 8.5,
    };

    const reseted = myInvestments.map(
      investment => ({ ...investment, rate: rates[investment.label] }),
    );

    this.setState({ myInvestments: reseted });
    this.setState(prevState => ({
      retirementResults: getRetirementResults(
        { ...prevState, myInvestments: reseted },
      ),
    }));
  }

  render() {
    return (
      <div>
          <Header />
          <div id="pageWrapper" className='a vh-100 flex flex-column overflow-hidden'>
            <Intro isShowing={this.state.isShowingIntro} />
            <div id="bottomWrapper"
              className={`
                bg-white flex z-max
                ${this.state.isShowingIntro ? 'h5' : ''}
                ${this.state.isShowingCalculation ? 'overflow-scroll' : 'overflow-hidden'}`}>
              <InputContainer
                  {...this.state}
                  handleBack = {this.handleBack}
                  isShowingCalculation = {this.state.isShowingCalculation}
                  isExpanded = {!this.state.isShowingIntro}
                  handleStartApp = {this.startApp}
                  handleShowCalculation = {this.showFirstCalculation}
                  handleResetRates = {this.handleResetRates}
                  handleInput = {this.handleInput}
                  handleInputButtons = {this.handleInputButtons}
                  handleCurrencyInput = {this.handleCurrencyInput}
                  handleTableInput = {this.handleTableInput}
                  handleAddTableRow = {this.handleAddTableRow}
                  handleRemoveTableRow = {this.handleRemoveTableRow}
                  handleInvestmentSelector = {this.handleInvestmentSelector}
                  />
                  {this.state.isShowingIntro
                    && <div className='w-100 flex items-center justify-end pr5'>
                      <Button isEnabled={true} label='começar'onClick={this.startApp} />
                    </div>
                  }
                  {!this.state.isShowingIntro
                    && <OutPutContainer {...this.state}/>
                  }
            </div>
          </div>
          <style jsx global>{`
            .r0{
              right:0;
            }
            ::selection{
              color:white;
              background-color:#2ea776;
            }
                .noSelect {
                  -webkit-touch-callout: none;
                  -webkit-user-select: none;
                  -khtml-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
              }
              .showing{
                opacity: 1;
              }
              .hidden{
                opacity: 0;
              }
              .absolute-bottom{
                bottom:4rem;
                right: 0;
              }
              .absolute-top{
                right: 0;
                top: 4rem;
              }
              .mt-negative{
                margin-top: -5rem;
              }
              input{outline:none; caret-color: #2ea776; caret-width: 2px}
              .checkmark{
                  transition: all .2s;
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                  /* display: none; <- Crashes Chrome on hover */
                  -webkit-appearance: none;
                  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
              }
              #bottomWrapper{
                transition: height .55s ease-in-out, width .55s ease-in-out;
              }
          `}</style>
      </div>);
  }
}

export default Index;

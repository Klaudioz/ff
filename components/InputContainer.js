import React, { Component } from 'react';
import InputField from './InputField';
import InputTable from './InputTable';
import IntroQuestion from './IntroQuestion';
import Logo from './Logo';
import QuestionChunk from './QuestionChunk';
import Button from './Button';
import MultiSelect from './MultiSelect';

class InputContainer extends Component {
  render() {
    return (
      <div id='inputContainer' className={`h-100 pl5 pr5
                                          ${this.props.isExpanded
                                            && this.props.isShowingCalculation ? 'w-50 pb6' : 'w-100'}
                                            ${this.props.isExpanded
                                            && !this.props.isShowingCalculation
                                            && 'flex flex-column'}`}>
        {this.props.isExpanded
        && <div onClick={this.props.handleBack} className="pointer grow w4 mt4">
          <Logo />
        </div>
            }
            <IntroQuestion 
              handleInput = {this.props.handleAgeInput}
              handleInputButtons = {this.props.handleInputButtons}
              myCurrentAge = {this.props.myCurrentAge}
              isShowingCalculation = {this.props.isShowingCalculation}
              isExpanded = {this.props.isExpanded}
            />
            <InputField
              isCurrency
              label = "Quanto você consegue guardar todo mês?"
              id = "myCurrentMonthlySavings"
              isShowingCalculation = {this.props.isShowingCalculation}
              isExpanded = {this.props.isExpanded}
              value={this.props.myCurrentMonthlySavings}
              handleInput = {this.props.handleCurrencyInput}
            />
            <InputField
              isCurrency
              label = "Quanto você quer tirar mês ao se aposentar?"
              id = "myRetirementIncome"
              isShowingCalculation = {this.props.isShowingCalculation}
              value={this.props.myRetirementIncome}
              isExpanded = {this.props.isExpanded}
              handleInput = {this.props.handleCurrencyInput}
            />
            <MultiSelect
              label="Onde você guarda seu dinheiro hoje?"
              isShowingCalculation = {this.props.isShowingCalculation}
              options={this.props.myInvestments}
              handleClick={this.props.handleInvestmentSelector}
              hiddenBorder={true}
            />
            {!this.props.isShowingCalculation && !this.props.isShowingIntro
              && <div className="self-end mb5">
              <Button
                isEnabled={this.props.myInvestments.filter(item => item.isSelected).length > 0}
                label="Calcular"
                onClick={this.props.handleShowCalculation}/>
              </div>
            }
            {this.props.isShowingCalculation
            && <QuestionChunk
              title="Opções avançadas"
            >
            <InputField
                hasSteppers
                label = "Você pretende viver até quantos anos?"
                id = "myLifeExpectancy"
                isExpanded = {this.props.isExpanded}
                value = {this.props.myLifeExpectancy}
                stepperIncrement = "1"
                min = "1"
                max = "100"
                handleInput = {this.props.handleAgeInput}
            />
            { this.props.myInvestments.map((item, index) => (<InputField
              isPercentage
              dataType = 'rate'
              key={index}
              isExpanded = {this.props.isExpanded}
              value = {item.rate}
              id = {item.label}
              label = {`Rendimento anual da ${item.label}`}
              handleInput = {this.props.handleInvestmentRateInput}
              />))
            }
            <button
              style={{ width: '100%' }}
              onClick={this.props.handleResetRates}>Reset taxas</button>
            </QuestionChunk>
            }
            {this.props.isShowingCalculation
            && <QuestionChunk
              title="Gastos planejados"
            >
            <InputTable
              id = "lifeEvents"
              table = {this.props.lifeEvents}
              fields = {
                {
                  label: '',
                  age: 0,
                  cost: 0,
                }
              }
              myInvestments = {this.props.myInvestments}
              retirementResults = {this.props.retirementResults}
              handleTableInput = {this.props.handleTableInput}
              handleAddTableRow = {this.props.handleAddTableRow}
              handleRemoveTableRow = {this.props.handleRemoveTableRow}
            />
            </QuestionChunk>
            }
      </div>
    );
  }
}

export default InputContainer;

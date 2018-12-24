import React, { Component } from 'react';
import { formatAge } from '../utils/math';
import DonationCall from './DonationCall';

class RetirementSummary extends Component {
  state = {};

  getSelectedInvestmentIndex = (array) => {
    const selectedItem = array.filter(item => item.isSelected);
    return array.indexOf(selectedItem[0]);
  };

  render() {
    const { age, balance } = this.props.retirementResults[
      this.getSelectedInvestmentIndex(this.props.myInvestments)
    ][1].retirement;
    const [y, m] = formatAge(age);

    return (
      <div className="w-100 flex flex-column ml0-ns center mr4">
        <h2 className="f2-l f3 white tracked-tight lh-solid">
          <span className="normal "> Você vai se aposentar aos </span> {y} anos.
        </h2>
        <h3 className="f5-l f6 black-80 normal lh-copy white-80 measure-narrow center ml0-ns">
          <span className="normal">Em {2019 - this.props.myCurrentAge + y} você terá </span> R$
          {balance.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}{' '}
          <span className="normal">em conta.</span> A partir daí, poderá torrar R$
          {this.props.myRetirementIncome} por mês até o fim da vida.
        </h3>
        <div className="dn dib-ns">
          <DonationCall />
        </div>
      </div>
    );
  }
}

export default RetirementSummary;

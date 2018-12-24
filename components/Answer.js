import React, { Component } from 'react';
import RetirementChart from './RetirementChart';
import RetirementSummary from './RetirementSummary';
import DonationCall from './DonationCall';

class OutPutContainer extends Component {
  render() {
    return (
      <div id="answersContainer" className={'bg-blue ph0-ns ph4 pv5'}>
        {this.props.isShowingAnswer && (
          <div className="flex flex-row-ns flex-column vh-75-l mt0-ns pv4 mw7 center ">
            <div className="w-100 f3-ns f5 tl-ns tc self-center pr4-ns pr0">
              <RetirementSummary
                myCurrentAge={this.props.myCurrentAge}
                myInvestments={this.props.myInvestments}
                retirementResults={this.props.retirementResults}
                myRetirementIncome={this.props.myRetirementIncome}
              />
            </div>
            <div className="w-100">
              <RetirementChart
                lifeEvents={this.props.lifeEvents}
                myInvestments={this.props.myInvestments}
                myRetirementIncome={this.props.myRetirementIncome}
                retirementResults={this.props.retirementResults}
              />
            </div>
            <div className="dn-ns dib">
              <DonationCall />
            </div>
          </div>
        )}
        <style jsx>
          {`
            .bg-green {
              background-color: #1ed090;
            }
          `}
        </style>
      </div>
    );
  }
}

export default OutPutContainer;
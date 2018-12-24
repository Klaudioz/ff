import React, { Component } from 'react';

class InputTable extends Component {
  render() {
    const {
      id,
      table,
      fields,
      myInvestments,
      retirementResults,
      handleTableInput,
      handleAddTableRow,
      handleRemoveTableRow,
    } = this.props;

    const selectedInvestment = myInvestments.filter(investment => investment.isSelected);

    if (selectedInvestment.length === 0) return null;

    const selectedInvestmentLabel = selectedInvestment[0].label;

    const { events } = retirementResults.filter(
      investment => investment[0] === selectedInvestmentLabel,
    )[0][1];

    return (
      <div>
        <table className="w-100">
          <thead>
            <tr className="h3">
              <td>nome do evento</td>
              <td>sua idade</td>
              <td>valor</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {table.map((row, rowId) => (
              <tr key={rowId}>
                <td className="w-third">
                  <input
                    placeholder="ex. volta ao mundo"
                    className="w-100 black-80 tc pa3-ns pa2 bg-near-white br1 ba0 f5-ns f6"
                    id="label"
                    type="text"
                    value={row.label}
                    onChange={handleTableInput(rowId, id, table, true)}
                  />
                </td>
                <td className="w-third">
                  <input
                    placeholder="35"
                    className="w-100 black-80 tc pa3-ns pa2 bg-near-white br1 ba0 f5-ns f6"
                    id="age"
                    type="number"
                    value={row.age}
                    onChange={handleTableInput(rowId, id, table)}
                  />
                </td>
                <td className="w-third">
                  <input
                    placeholder="200000"
                    className="w-100 black-80 tc pa3-ns pa2 bg-near-white br1 ba0 f5-ns f6"
                    id="cost"
                    type="number"
                    step="10000"
                    value={row.cost}
                    onChange={handleTableInput(rowId, id, table)}
                  />
                </td>
                <td>
                  <button
                    className="br-pill black-70 pointer bg-white pa2 ba0 hover-bg-near-white"
                    onClick={handleRemoveTableRow(rowId, id, table)}
                  >
                    {'—'}
                  </button>
                </td>
                <td>{events.length > rowId ? events[rowId].obs : ''}</td>
              </tr>
            ))}
            <tr>
              <td />
            </tr>
          </tbody>
        </table>
        <button
          style={{ backgroundColor: '#fd719b' }}
          className={'pv3 ph4 white br1 ba0 mv4'}
          onClick={handleAddTableRow(id, fields)}
        >
          {'+ Adicionar um evento'}
        </button>
        <style jsx>
          {`
            input::-webkit-input-placeholder {
              /* Chrome/Opera/Safari */
              color: rbga(0, 0, 0, 0.4);
            }
            input::-moz-placeholder {
              /* Firefox 19+ */
              color: rbga(0, 0, 0, 0.4);
            }
            input:-ms-input-placeholder {
              /* IE 10+ */
              color: rbga(0, 0, 0, 0.4);
            }
            input:-moz-placeholder {
              /* Firefox 18- */
              color: rbga(0, 0, 0, 0.4);
            }
          `}
        </style>
      </div>
    );
  }
}

export default InputTable;

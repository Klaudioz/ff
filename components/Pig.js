import React, { Component } from 'react';

function inputMessages(label) {
  const messages = {
    poupança: [
      {
        lowerValue: 1.6,
        upperValue: 3.5,
        message:
          'Você está otimista. O retorno médio real da poupança do ano 2000 até hoje foi de apenas 1.4% a.a.',
        src: 'Fonte: www.ipeadata.gov.br',
      },
      {
        lowerValue: 3.5,
        upperValue: 5.1,
        message:
          'Desde o ano 2000, a poupança teve essa ordem de rendimento apenas em 2006. Você está certo dessa taxa?',
        src: 'Fonte: www.ipeadata.gov.br',
      },
      {
        lowerValue: 5.1,
        upperValue: Number.POSITIVE_INFINITY,
        message: 'Com esse rendimento na poupança eu nem trabalhava mais.',
      },
    ],
    'renda fixa': [
      {
        lowerValue: 5,
        upperValue: 7,
        message:
          'Você está otimista. O retorno médio real do tesouro SELIC do ano 2000 até hoje foi de apenas 4.7% a.a.',
        src: 'Fonte: www.ipeadata.gov.br',
      },
      {
        lowerValue: 7,
        upperValue: 9,
        message:
          'Desde o ano 2000, a renda fixa teve essa ordem de rendimento apenas em 4 anos. Você está certo dessa taxa?',
        src: 'Fonte: www.ipeadata.gov.br',
      },
    ],
    'renda variável': [
      {
        lowerValue: 20,
        upperValue: Number.POSITIVE_INFINITY,
        message:
          'Parabéns, temos um novo Warren Buffett. O retorno anual da Berkshire Hathaway é de 20,9%.',
        src: 'Fonte: Berkshire Hathaway. Annual Report, 2017.',
      },
    ],
    myCurrentAge: [
      {
        lowerValue: 0,
        upperValue: 29,
        message:
          'Está começando cedo, parabéns. A idade média das pessoas que começam a poupar para a aposentadoria é 28 anos.',
        src: 'Fonte: SPC Brasil. O preparo para a aposentadoria no Brasil. Abril 2018.',
      },
      {
        lowerValue: 50,
        upperValue: 60,
        message: 'Nunca é tarde para começar.',
      },
    ],
    myCurrentMonthlySavings: [
      {
        lowerValue: 0.01,
        upperValue: 10000,
        message:
          'Sabia que apenas 31% dos brasileiros pouparam parte dos seus rendimentos nos últimos 12 meses? Você faz parte desse grupo.',
        src: 'Fonte: Banco Central do Brasil. Série cidadania financeira. Novembro 2017.',
        reaction: 0,
      },
      {
        lowerValue: 10000,
        upperValue: 30000,
        message: 'Aooow chefia. Tá cheio da nota, hein?!',
        reaction: 1,
      },
      {
        lowerValue: 30000,
        upperValue: Number.POSITIVE_INFINITY,
        message: 'Ah, tá de sacanagem que você poupa tudo isso por mês.',
        reaction: 2,
      },
    ],
    myRetirementIncome: [
      {
        lowerValue: 5645.81,
        upperValue: Number.POSITIVE_INFINITY,
        message:
          'Você pretende se aposentar com um valor acima do teto atual do INSS ($ 5645,81), portanto, provavelente você precisa se preocupar em complementar a sua aposentadoria.',
        src: 'Fonte: Banco Central do Brasil. Série cidadania financeira. Novembro 2017.',
      },
    ],
  };

  return messages[label];
}

function selectedInvestmentMessage(label) {
  return {
    poupança: [
      {
        message:
          'A poupança não é a melhor opção para quem busca a '
          + 'liberdade financeira. Por curiosidade, veja as outras opções de '
          + 'investimento e a diferença que isso faz.',
        reaction: 2,
      },
      {
        message:
          'Apesar disso, 39% dos brasileiros que se preparam para a '
          + 'aposentadoria deixam o dinheiro na poupança.',
        src: 'Fonte: SPC Brasil. O preparo para a aposentadoria no Brasil. Abril 2018.',
      },
    ],
    'renda fixa': [
      {
        message:
          'Investimentos de renda fixa são uma boa opção de baixo risco '
          + 'para quem está focado no longo prazo.',
        reaction: 0,
      },
    ],
    'renda variável': [
      {
        message:
          'Investimentos de renda variável são uma boa opção para quem '
          + 'está focado no longo prazo. Não é todo mundo que se sente '
          + 'confortável em ver o dinheiro oscilando todo dia, portanto, é importante '
          + 'checar o seu perfil de investimento.',
        reaction: 0,
      },
    ],
  }[label];
}

function getReaction(messages) {
  return Math.max(...messages.map(m => (m.reaction ? m.reaction : 0)));
}

function reactionSVG(reactionIndex) {
  const r = 5;
  const face0 = (
    <svg viewBox="0 0 100 30">
      <circle
        cx={'35%'}
        cy={'50%'}
        r={r}
        style={{
          stroke: '#000',
          fill: '#000',
        }}
      />
      <circle
        cx={'65%'}
        cy={'50%'}
        r={r}
        style={{
          stroke: '#000',
          fill: '#000',
        }}
      />
    </svg>
  );

  const face1 = (
    <svg viewBox="0 0 100 30">
      <text
        x={'35%'}
        y={'100%'}
        textAnchor={'middle'}
        style={{
          fontSize: 30,
        }}
      >
        $
      </text>
      <text
        x={'65%'}
        y={'100%'}
        textAnchor={'middle'}
        style={{
          fontSize: 30,
        }}
      >
        $
      </text>
    </svg>
  );

  const face2 = (
    <svg viewBox="0 0 100 30">
      <line
        x1={'25%'}
        x2={'45%'}
        y1={'100%'}
        y2={'100%'}
        style={{
          strokeWidth: 5,
          stroke: '#000',
          fill: '#000',
        }}
      />
      <line
        x1={'55%'}
        x2={'75%'}
        y1={'100%'}
        y2={'100%'}
        style={{
          strokeWidth: 5,
          stroke: '#000',
          fill: '#000',
        }}
      />
    </svg>
  );

  return {
    0: face0,
    1: face1,
    2: face2,
  }[reactionIndex];
}

function renderPig(messages) {
  const reactionIndex = getReaction(messages);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
      }}
    >
      {reactionSVG(reactionIndex)}
      <img
        src={'../static/pig.svg'}
        style={{
          width: 48,
        }}
      />
    </div>
  );
}

let timeoutVar = 0;

class Pig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSelectedInvestment = prevProps.myInvestments.find(i => i.isSelected);
    const newSelectedInvestment = this.props.myInvestments.find(i => i.isSelected);

    if (prevSelectedInvestment === undefined) return null;

    if (prevSelectedInvestment.label !== newSelectedInvestment.label) {
      // show message again if the user changes the selected investment
      this.setState({ open: true });
    }
  }

  filterMessages(label, messages, inputValue) {
    if (label !== this.props.focusedInput) return [];

    return messages.filter(m => inputValue >= m.lowerValue && inputValue < m.upperValue);
  }

  getInvestmentMessages(investmentLabel) {
    const { label, rate } = this.props.myInvestments.find(
      investment => investment.label === investmentLabel,
    );
    const messages = inputMessages(investmentLabel);

    return this.filterMessages(label, messages, rate);
  }

  getInputMessages(label) {
    const messages = inputMessages(label);
    return this.filterMessages(label, messages, this.props[label]);
  }

  getSelectedInvestmentMessage(duration = 7000) {
    const selectedInvestment = this.props.myInvestments.find(i => i.isSelected);
    if (selectedInvestment === undefined) return [];

    clearTimeout(timeoutVar);
    timeoutVar = setTimeout(() => this.setState({ open: false }), duration);
    if (!this.state.open) return [];

    return selectedInvestmentMessage(selectedInvestment.label);
  }

  getAllMessages() {
    const messages = [];
    messages.push(...this.getInputMessages('myCurrentAge'));
    messages.push(...this.getInputMessages('myCurrentMonthlySavings'));
    messages.push(...this.getInputMessages('myRetirementIncome'));
    messages.push(...this.getInvestmentMessages('poupança'));
    messages.push(...this.getInvestmentMessages('renda fixa'));
    messages.push(...this.getInvestmentMessages('renda variável'));
    messages.push(...this.getSelectedInvestmentMessage());
    return messages;
  }

  render() {
    const messages = this.getAllMessages();
    const newMessage = messages.length > 0;
    return (
      <div>
        {newMessage ? renderPig(messages) : null}
        {newMessage && (
          <div className={'message-box'}>
            {messages.map((m, id) => (
              <div key={id}>
                {'message' in m && <p className={'message-content'}>{m.message}</p>}
                {'src' in m && <p className={'message-src'}>{m.src}</p>}
              </div>
            ))}
          </div>
        )}
        <style jsx>
          {`
            .message-box {
              position: fixed;
              bottom: 70px;
              right: 70px;
              padding: 24px;
              background-color: #fff;
              border: 1px solid black;
              border-radius: 25px;
              max-width: 300px;
            }
            .message-content {
              font-size: 14px;
            }
            .message-src {
              font-size: 10px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Pig;

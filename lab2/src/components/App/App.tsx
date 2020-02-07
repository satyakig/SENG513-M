import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { C, CE, CalcValueType, DIVIDE, EQUAL, MINUS, MULTIPLY, PLUS, ROWS } from 'CalcValue';
import { CalcRow, VerticalOrientation } from '../CalcRow/CalcRow';
import './App.scss';

const App = (): JSX.Element => {
  const [lastExp, setLastExp] = useState<string>('');
  const [lastExpDisplay, setLastExpDisplay] = useState<string>('');
  const [lastExpError, setLastExpError] = useState<boolean>(true);

  const [exp, setExp] = useState<string>('');

  function evaluate(input: string): string {
    try {
      const val = eval(input); // eslint-disable-line no-eval

      return val;
    } catch (err) {
      return 'Error';
    }
  }

  function valueUpdater(val: string): void {
    switch (val) {
      case C.value:
        setLastExp('');
        setExp('');

        return;
      case CE.value:
        setExp(exp.slice(0, -1));

        return;
      case EQUAL.value:
        setLastExp(exp);
        setExp('');

        return;
      case DIVIDE.value:
      case MULTIPLY.value:
      case PLUS.value:
      case MINUS.value:
        if (exp.length === 0) {
          const prev = evaluate(lastExp.split(' = ')[0]);
          setExp(`${prev} ${val} `);
        } else {
          setExp(`${exp} ${val} `);
        }

        return;
      default:
        setExp(`${exp}${val}`);

        return;
    }
  }

  useEffect(() => {
    if (lastExp.length === 0) {
      setLastExpDisplay('');
      setLastExpError(false);

      return;
    }

    try {
      const val = eval(lastExp); // eslint-disable-line no-eval
      setLastExpDisplay(`${lastExp} = ${val}`);
      setLastExpError(false);
    } catch (err) {
      setLastExpDisplay(`${lastExp} = Error`);
      setLastExpError(true);
    }
  }, [lastExp]);

  return (
    <main>
      <section>
        <Container fluid={true}>
          <Card>
            <Card.Body>
              <Card.Text className={lastExpError ? 'error' : ''}>{lastExpDisplay}</Card.Text>
              <Card.Title>{exp}</Card.Title>
            </Card.Body>
          </Card>
          {ROWS.map(
            (row: CalcValueType[], index: number): JSX.Element => {
              let vOrientation = VerticalOrientation.MID;

              if (index === 0) {
                vOrientation = VerticalOrientation.TOP;
              } else if (index === ROWS.length - 1) {
                vOrientation = VerticalOrientation.BOTTOM;
              }

              return (
                <CalcRow
                  vOrientation={vOrientation}
                  buttons={row}
                  updater={valueUpdater}
                  key={index}
                />
              );
            },
          )}
        </Container>
      </section>
    </main>
  );
};

export default App;

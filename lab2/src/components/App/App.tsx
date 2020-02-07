import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  C,
  CE,
  CalcValueType,
  DIVIDE,
  EQUAL,
  MINUS,
  MULTIPLY,
  PLUS,
  ROWS,
  LEFT_BRACKET,
} from 'CalcValue';
import { CalcRow, VerticalOrientation } from '../CalcRow/CalcRow';
import './App.scss';
import { evaluateExpression } from '../../Evaluate';

const App = (): JSX.Element => {
  const [lastExp, setLastExp] = useState<string>('');
  const [lastVal, setLastVal] = useState<number>(Number.NaN);

  const [current, setCurrent] = useState<string>('');

  function valueUpdater(val: string): void {
    switch (val) {
      case C.value:
        setLastExp('');
        setCurrent('');
        break;
      case CE.value:
        setCurrent(current.slice(0, -1));
        break;
      case EQUAL.value:
        if (current.length > 0) {
          setLastExp(current);
          setCurrent('');
        }
        break;
      case DIVIDE.value:
      case MULTIPLY.value:
      case PLUS.value:
      case MINUS.value:
      case LEFT_BRACKET.value:
        if (current.length === 0 && lastExp.length > 0) {
          setCurrent(`${lastVal}${val}`);
        } else {
          setCurrent(`${current}${val}`);
        }
        break;
      default:
        setCurrent(`${current}${val}`);
        break;
    }
  }

  useEffect(() => {
    setLastVal(evaluateExpression(lastExp));
  }, [lastExp]);

  return (
    <main>
      <section>
        <Container fluid={true}>
          <Card>
            <Card.Body>
              <Card.Text className={lastExp.length > 0 && Number.isNaN(lastVal) ? 'error' : ''}>
                {lastExp.length > 0 ? `${lastExp} = ${lastVal}` : ''}
              </Card.Text>
              <Card.Title>{current}</Card.Title>
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

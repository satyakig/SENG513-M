import React, { useCallback, useState } from 'react';
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
  RIGHT_BRACKET,
} from 'CalcValue';
import { CalcRow, VerticalOrientation } from '../CalcRow/CalcRow';
import './App.scss';
import { currentDisplay, evaluate, formatExpression, formatLastDisplay } from '../Formatters';

const App = (): JSX.Element => {
  const [state, setState] = useState({
    lastExp: '',
    lastVal: Number.NaN,
    currentExp: '',
  });

  const valueUpdater = useCallback(
    (val: string) => {
      let newState = state;

      switch (val) {
        case C.value:
          newState = {
            lastExp: '',
            lastVal: Number.NaN,
            currentExp: '',
          };
          break;
        case CE.value:
          if (state.currentExp.length > 0) {
            newState = {
              ...state,
              currentExp: formatExpression(state.currentExp.slice(0, -1)),
            };
          }

          break;
        case EQUAL.value:
          if (state.currentExp.length > 0) {
            newState = {
              lastExp: state.currentExp,
              lastVal: evaluate(state.currentExp),
              currentExp: '',
            };
          }
          break;
        case DIVIDE.value:
        case MULTIPLY.value:
        case PLUS.value:
        case MINUS.value:
        case LEFT_BRACKET.value:
        case RIGHT_BRACKET.value:
          if (state.currentExp.length === 0 && state.lastExp.length > 0) {
            newState = {
              ...state,
              currentExp: formatExpression(`${state.lastVal}${val}`),
            };
            break;
          }
        // eslint-disable-next-line no-fallthrough
        default:
          newState = {
            ...state,
            currentExp: formatExpression(`${state.currentExp}${val}`),
          };
          break;
      }

      setState(newState);
    },
    [state],
  );

  return (
    <main>
      <section>
        <Container fluid={true}>
          <Card>
            <Card.Body>
              <Card.Text
                className={state.lastExp.length > 0 && Number.isNaN(state.lastVal) ? 'error' : ''}
              >
                {formatLastDisplay(state.lastExp, state.lastVal)}
              </Card.Text>
              <Card.Title>
                {currentDisplay(state.currentExp, state.lastExp, state.lastVal)}
              </Card.Title>
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

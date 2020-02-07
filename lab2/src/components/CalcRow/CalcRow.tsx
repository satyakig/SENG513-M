import React from 'react';
import { Row } from 'react-bootstrap';
import { CalcValueType } from '../../CalcValue';
import { CalcButton, HorizontalOrientation } from '../CalcButton/CalcButton';
import './CalcRow.scss';

export enum VerticalOrientation {
  TOP = 'top',
  MID = 'mid',
  BOTTOM = 'bottom',
}

export interface CalcRowProps {
  vOrientation: VerticalOrientation;
  buttons: CalcValueType[];
  updater: (val: string) => void;
}

export const CalcRow = (props: CalcRowProps): JSX.Element => {
  const lastIndex = props.buttons.length - 1;

  return (
    <Row noGutters={true}>
      {props.buttons.map(
        (button: CalcValueType, index: number): JSX.Element => {
          let hOrientation = HorizontalOrientation.MID;

          if (index === 0) {
            hOrientation = HorizontalOrientation.LEFT;
          } else if (index === lastIndex) {
            hOrientation = HorizontalOrientation.RIGHT;
          }

          return (
            <CalcButton
              button={button}
              hOrientation={hOrientation}
              vOrientation={props.vOrientation}
              updater={props.updater}
              key={index}
            />
          );
        },
      )}
    </Row>
  );
};

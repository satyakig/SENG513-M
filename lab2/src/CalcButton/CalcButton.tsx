import React, { useCallback, useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import { VerticalOrientation } from '../CalcRow/CalcRow';
import { C, CalcValueType, CE, EQUAL } from '../CalcValue';
import './CalcButton.scss';

export enum HorizontalOrientation {
  LEFT = 'left',
  MID = 'mid',
  RIGHT = 'right',
}

export interface CalcButtonProps {
  button: CalcValueType;
  hOrientation: HorizontalOrientation;
  vOrientation: VerticalOrientation;
  updater: (val: string) => void;
}

export const CalcButton = (props: CalcButtonProps): JSX.Element => {
  const onClick = useCallback(() => {
    props.updater(props.button.value);
  }, [props]);

  const keyPress = useCallback(
    (event: KeyboardEvent) => {
      if (props.button.value === C.value) {
        return;
      } else if (event.key === props.button.value) {
        onClick();
      } else if (props.button.value === EQUAL.value && event.key === 'Enter') {
        onClick();
      } else if (
        props.button.value === CE.value &&
        (event.key === 'Backspace' || event.key === 'Delete')
      ) {
        onClick();
      }
    },
    [onClick, props.button],
  );

  // useEffect(() => {
  //   document.addEventListener('keyup', keyPress, false);
  //
  //   return () => {
  //     document.removeEventListener('keyup', keyPress, false);
  //   };
  // }, [keyPress]);

  let extraClasses = '';

  if (props.vOrientation === VerticalOrientation.TOP) {
    if (props.hOrientation === HorizontalOrientation.LEFT) {
      extraClasses = 'topLeft';
    } else if (props.hOrientation === HorizontalOrientation.RIGHT) {
      extraClasses = 'topRight';
    }
  } else if (props.vOrientation === VerticalOrientation.BOTTOM) {
    if (props.hOrientation === HorizontalOrientation.LEFT) {
      extraClasses = 'bottomLeft';
    } else if (props.hOrientation === HorizontalOrientation.RIGHT) {
      extraClasses = 'bottomRight';
    }
  }

  if (props.button.action) {
    extraClasses = `${extraClasses} action`;
  }

  if (props.vOrientation === VerticalOrientation.TOP) {
    extraClasses = `${extraClasses} top`;
  }

  if (props.vOrientation === VerticalOrientation.MID) {
    extraClasses = `${extraClasses} vMid`;
  }

  if (props.vOrientation === VerticalOrientation.BOTTOM) {
    extraClasses = `${extraClasses} bottom`;
  }

  if (props.hOrientation === HorizontalOrientation.RIGHT) {
    extraClasses = `${extraClasses} right`;
  }

  if (props.hOrientation === HorizontalOrientation.MID) {
    extraClasses = `${extraClasses} hMid`;
  }

  if (props.hOrientation === HorizontalOrientation.LEFT) {
    extraClasses = `${extraClasses} left`;
  }

  if (props.button.action) {
    extraClasses = `${extraClasses} action`;
  }

  extraClasses = extraClasses.trim();

  const variant = props.button.action ? 'outline-warning' : 'outline-info';

  return (
    <Col>
      <Button block={true} onClick={onClick} variant={variant} className={extraClasses}>
        {props.button.value}
      </Button>
    </Col>
  );
};

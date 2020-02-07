export interface CalcValueType {
  value: string;
  action: boolean;
}

export const LEFT_BRACKET: CalcValueType = {
  value: '(',
  action: false,
};

export const RIGHT_BRACKET: CalcValueType = {
  value: ')',
  action: false,
};

export const C: CalcValueType = {
  value: 'C',
  action: true,
};

export const CE: CalcValueType = {
  value: 'CE',
  action: true,
};

const SEVEN: CalcValueType = {
  value: '7',
  action: false,
};

const EIGHT: CalcValueType = {
  value: '8',
  action: false,
};

const NINE: CalcValueType = {
  value: '9',
  action: false,
};

export const DIVIDE: CalcValueType = {
  value: '/',
  action: true,
};

const FOUR: CalcValueType = {
  value: '4',
  action: false,
};

const FIVE: CalcValueType = {
  value: '5',
  action: false,
};

const SIX: CalcValueType = {
  value: '6',
  action: false,
};

export const MULTIPLY: CalcValueType = {
  value: '*',
  action: true,
};

const ONE: CalcValueType = {
  value: '1',
  action: false,
};

const TWO: CalcValueType = {
  value: '2',
  action: false,
};

const THREE: CalcValueType = {
  value: '3',
  action: false,
};

export const MINUS: CalcValueType = {
  value: '-',
  action: true,
};

const ZERO: CalcValueType = {
  value: '0',
  action: false,
};

const DOT: CalcValueType = {
  value: '.',
  action: false,
};

export const EQUAL: CalcValueType = {
  value: '=',
  action: true,
};

export const PLUS: CalcValueType = {
  value: '+',
  action: true,
};

export const ROW_1: CalcValueType[] = [LEFT_BRACKET, RIGHT_BRACKET, C, CE];

export const ROW_2: CalcValueType[] = [SEVEN, EIGHT, NINE, DIVIDE];

export const ROW_3: CalcValueType[] = [FOUR, FIVE, SIX, MULTIPLY];

export const ROW_4: CalcValueType[] = [ONE, TWO, THREE, MINUS];

export const ROW_5: CalcValueType[] = [ZERO, DOT, EQUAL, PLUS];

export const ROWS: CalcValueType[][] = [ROW_1, ROW_2, ROW_3, ROW_4, ROW_5];

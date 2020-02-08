import {
  CalcValueType,
  DIVIDE,
  EQUAL,
  LEFT_BRACKET,
  MINUS,
  MULTIPLY,
  PLUS,
  RIGHT_BRACKET,
} from './CalcValue';

const regexes = [/([\d])(\(.*?)/, /(\(.*?\))(\(.*?\))/, /(.*?\))([\d])/];
const symbols: CalcValueType[] = [PLUS, MINUS, MULTIPLY, DIVIDE, LEFT_BRACKET, RIGHT_BRACKET];

export function formatExpression(input: string): string {
  let exp = input;

  for (let i = 0; i < regexes.length; i++) {
    const reg = regexes[i];

    let match = exp.match(reg);

    while (match !== null) {
      const first = match[1] as string;
      const second = match[2] as string;
      const startIndex = match.index as number;
      const lastIndex = startIndex + match[0].length;

      const val = `${first}${MULTIPLY.value}${second}`;

      exp = `${exp.substr(0, startIndex)}${val}${exp.substr(lastIndex)}`;
      match = exp.match(reg);
    }
  }

  return exp;
}

export function evaluate(input: string): number {
  if (input.length < 1) {
    return Number.NaN;
  }

  try {
    const value = eval(input);
    return Number(value);
  } catch (err) {
    return Number.NaN;
  }
}

export function formatDisplay(exp: string, val?: number): string {
  if (exp.length < 1) {
    return exp;
  }

  let newExp = exp;
  for (let i = 0; i < symbols.length; i++) {
    const delimiter = symbols[i].value;
    newExp = newExp.split(delimiter).join(` ${delimiter} `);
  }

  return val !== undefined ? `${newExp} ${EQUAL.value} ${val}` : newExp;
}

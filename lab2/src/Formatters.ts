import { CalcValueType, DIVIDE, EQUAL, MINUS, MULTIPLY, PLUS } from './CalcValue';

const regexes = [/([\d])(\(.*?)/, /(\(.*?\))(\(.*?\))/, /(.*?\))([\d])/];
const symbols: CalcValueType[] = [PLUS, MINUS, MULTIPLY, DIVIDE];

export function formatExpression(input: string): string {
  let exp = input.trim();
  if (exp.length < 1) {
    return exp;
  }

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

  for (let i = 0; i < symbols.length; i++) {
    const delimiter = symbols[i].value;
    const pattern = `[\\s]*[${delimiter}][\\s]*`;
    exp = exp.split(new RegExp(pattern)).join(` ${delimiter} `);
  }

  return exp.trim();
}

export function evaluate(input: string): number {
  if (input.length < 1) {
    return Number.NaN;
  }

  try {
    // eslint-disable-next-line no-eval
    const value = eval(input);
    return Number(value);
  } catch (err) {
    return Number.NaN;
  }
}

export function formatLastDisplay(exp: string, val: number): string {
  if (exp.length < 1) {
    return exp;
  }

  if (Number.isNaN(val)) {
    return `${exp} ${EQUAL.value} Error`;
  }

  return `${exp} ${EQUAL.value} ${val}`;
}

export function currentDisplay(exp: string, lastExp: string, lastVal: number): string {
  if (exp.length < 1 && lastExp.length > 0) {
    return Number.isNaN(lastVal) ? 'Error' : `${lastVal}`;
  }

  return exp;
}

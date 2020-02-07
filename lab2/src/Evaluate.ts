import { MULTIPLY, LEFT_BRACKET, RIGHT_BRACKET } from './CalcValue';

const regexes = [/([\d])(\(.*?\))/, /(\(.*?\))(\(.*?\))/, /(\(.*?\))([\d])/];

export function evaluateExpression(input: string): number {
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

  try {
    const value = eval(exp);
    return Number(value);
  } catch (err) {
    return Number.NaN;
  }
}

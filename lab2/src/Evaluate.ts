import { MULTIPLY, LEFT_BRACKET, RIGHT_BRACKET } from './CalcValue';

export function evaluateExpression(input: string): number {
  let exp = input
    .split(' ')
    .join('')
    .trim();

  const regex1 = /\((\d+)\)/g;
  const regex2 = /\((\d+\.\d+)\)/g;

  let matches = [...exp.matchAll(regex1)];

  while (matches.length > 0) {
    const match = matches[0];
    let val = match[1] as string;
    const index = match.index as number;
    const lastIndex = index + match[0].length;

    if (index > 0) {
      const prevValue = exp[index - 1];

      if (prevValue === RIGHT_BRACKET.value) {
        val = `${MULTIPLY.value}${val}`;
      }

      if (!isNaN(parseInt(prevValue))) {
        val = `${MULTIPLY.value}${val}`;
      }
    }

    if (lastIndex < exp.length) {
      const nextValue = exp[lastIndex];

      if (nextValue === LEFT_BRACKET.value) {
        val = `${val}${MULTIPLY.value}`;
      }

      if (!isNaN(parseInt(nextValue))) {
        val = `${val}${MULTIPLY.value}`;
      }
    }

    exp = `${exp.substr(0, index)}${val}${exp.substr(lastIndex)}`;
    matches = [...exp.matchAll(regex1)];
  }

  matches = [...exp.matchAll(regex2)];

  while (matches.length > 0) {
    const match = matches[0];
    let val = match[1] as string;
    const index = match.index as number;
    const lastIndex = index + match[0].length;

    if (index > 0) {
      const prevValue = exp[index - 1];

      if (prevValue === RIGHT_BRACKET.value) {
        val = `${MULTIPLY.value}${val}`;
      }

      if (!isNaN(parseInt(prevValue))) {
        val = `${MULTIPLY.value}${val}`;
      }
    }

    if (lastIndex < exp.length) {
      const nextValue = exp[lastIndex];

      if (nextValue === LEFT_BRACKET.value) {
        val = `${val}${MULTIPLY.value}`;
      }

      if (!isNaN(parseInt(nextValue))) {
        val = `${val}${MULTIPLY.value}`;
      }
    }

    exp = `${exp.substr(0, index)}${val}${exp.substr(lastIndex)}`;
    matches = [...exp.matchAll(regex2)];
  }

  try {
    const value = eval(exp);
    return Number(value);
  } catch (err) {
    return Number.NaN;
  }
}

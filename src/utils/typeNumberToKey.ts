type TypeNumberToKeyReturnTypes = 'value_string' | 'value_int' | 'value_float';

export default function typeNumberToKey(number: number): TypeNumberToKeyReturnTypes {
  switch (number) {
    case 0:
      return 'value_string';
    case 1:
      return 'value_int';
    default:
      return 'value_float';
  }
}

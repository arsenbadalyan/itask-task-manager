export const checkZero = (num) => (num < 10 ? '0' + num : num);

export const getDate = (date) => {
  const time = checkZero(date.getHours()) + ':' + checkZero(date.getMinutes());
  const today =
    checkZero(date.getDay()) +
    '.' +
    checkZero(date.getMonth()) +
    '.' +
    date.getFullYear();
  return `${today} \n ${time}`;
};

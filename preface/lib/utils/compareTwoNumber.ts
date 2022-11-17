export const compareTwoNumber = (number: number, standardNumber: number) => {
  const differ = number - standardNumber;
  return differ === 0 ? "zero" : differ > 0 ? "positive" : "negative";
};

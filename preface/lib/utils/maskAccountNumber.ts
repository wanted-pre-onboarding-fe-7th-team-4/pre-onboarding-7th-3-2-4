export const maskAccountNumber = (accountNumber: string) => {
  const firstTwo = accountNumber.slice(0, 2);
  const mask = accountNumber.slice(2, -2).replace(/./gi, '*');
  const lastTwo = accountNumber.slice(-2);

  return firstTwo + mask + lastTwo;
};

export const getMoney = (money: string) => {
  return (
    money
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .split('.')[0] + '원'
  );
};

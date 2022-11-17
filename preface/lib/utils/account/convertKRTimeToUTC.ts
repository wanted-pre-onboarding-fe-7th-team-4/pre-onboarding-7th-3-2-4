export const convertKRTimeToUTC = (KRTime: string) => {
  const covert = KRTime.replace(/년|월|일/gi, "");

  const createDate = new Date(covert);
  return createDate;
};

export default convertKRTimeToUTC;

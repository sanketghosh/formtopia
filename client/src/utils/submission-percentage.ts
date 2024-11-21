export const submissionPercentage = (
  totalForms: number,
  totalSubmissions: number,
): number => {
  if (totalForms === 0) {
    return 0;
  }

  const percentage = (totalSubmissions / totalForms) * 100;

  return parseFloat(percentage.toFixed(2));
};

/**
 *
 * Calculates the percentage of submissions based on the total number of forms created.
 *
 * @param {number} totalForms - The total number of forms created.
 * @param {number} totalSubmissions - The total number of submissions.
 * @returns {number} The percentage of submissions rounded to two decimal places.
 *
 */
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

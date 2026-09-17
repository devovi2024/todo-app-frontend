// client/src/utils/helpers.js
export const formatDate = (date) => date ? new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date)) : 'No due date';
export const toDateInput = (date) => date ? new Date(date).toISOString().slice(0, 10) : '';
export const priorityRank = { high: 0, medium: 1, low: 2 };

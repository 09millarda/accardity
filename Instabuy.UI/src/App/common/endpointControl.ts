export const getDataUrl = async (): Promise<string> => {
  const hostName = window && window.location && window.location.hostname;

  switch (hostName) {
    case 'instabuy.io':
      return `https://instabuy.io/api`;
    default:
      return `https://localhost:44353/api`
  }
};
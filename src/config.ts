const getEnvironment = (name: string, force = true) => {
  const value = process.env[name];
  if (force && !value) {
    throw Error(`Missing evironment variable: ${name}`);
  }
  return value;
}

export const apiUrl = getEnvironment("REACT_APP_API_URL");

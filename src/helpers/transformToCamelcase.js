/* join header titles and apply camel case
regex negates everything other than alphanumeric characters,
zero or more characters which are other than a-z, A-z or 0-9
g performs a global match - find all matches rather than stopping after the first match
dot (.) matches new line characters. Treats the entire input as a single line */
const transformToCamelcase = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, character) => {
      return character.toUpperCase();
    });
};

export default transformToCamelcase;

import randomSeed from './random';

export const globalUsersValues = {
  lastName: ['Dufour', 'Duratier', 'Manjeur', 'Rougeolle', 'Pouet', 'Danger'],
  firstName: ['Suzanne', 'Lola', 'Ginette', 'Lolé', 'Popeye', 'Jean'],
  login: ['dudu', 'durat', 'manman', 'rourou', 'poupou', 'dandan'],
  status: ['user', 'user', 'admin', 'user', 'user', 'user'],
};

export const defaultColumnValues = {
  lastName: 'valjean',
  firstName: 'jean',
  login: 'jeannot',
  status: 'user',
};

export function generateRows({
  columnValues = defaultColumnValues,
  length,
  random = randomSeed(329972281),
}) {
  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach(column => {
      let values = columnValues[column];

      if (typeof values === 'function') {
        record[column] = values({ random, index: i, record });
        return;
      }

      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]];
      }

      const value = values[Math.floor(random() * values.length)];
      if (typeof value === 'object') {
        record[column] = { ...value };
      } else {
        record[column] = value;
      }
    });

    data.push(record);
  }

  return data;
}

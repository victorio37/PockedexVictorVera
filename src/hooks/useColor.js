import { useState } from 'react';

export const useColor = () => {
  const [statColor, setStatColor] = useState(null);

  const pokemonsColors = [
    {
      name: 'normal',
      color: '#735259',
    },
    {
      name: 'fighting',
      color: '#96402A',
    },
    {
      name: 'flying',
      color: '#A8A8F0',
    },
    {
      name: 'poison',
      color: '#5B3184',
    },
    {
      name: 'ground',
      color: '#654008',
    },
    {
      name: 'rock',
      color: '#A3A3A3',
    },
    {
      name: 'bug',
      color: '#8CB230',
    },
    {
      name: 'ghost',
      color: '#323569',
    },
    {
      name: 'steel',
      color: '#C3C3C3',
    },
    {
      name: 'fire',
      color: '#F96D6F',
    },
    {
      name: 'water',
      color: '#1479FB',
    },
    {
      name: 'grass',
      color: '#7EC6C5',
    },
    {
      name: 'electric',
      color: '#0C1395',
    },
    {
      name: 'psychic',
      color: '#FFC0CB',
    },
    {
      name: 'ice',
      color: '#6FBEDF',
    },
    {
      name: 'dragon',
      color: '#478A93',
    },
    {
      name: 'dark',
      color: '#030706',
    },
    {
      name: 'fairy',
      color: '#FFAACC',
    },
  ];

  const setColor = (tipo) => {
    const i = pokemonsColors.filter((color) => color.name === tipo);
    if (!statColor) setStatColor(i[0].color);
    return i[0].color;
  };

  const returnColorByType = (tipo) => {
    const i = pokemonsColors.filter((color) => color.name === tipo);
    return i[0].color;
  };

  return { statColor, pokemonsColors, setColor, returnColorByType };
};

import { createBrowserRouter } from 'react-router-dom';
import Index from './routes/index';
import Pokedex from './routes/Pokedex';
import PokemonDetails from './routes/PokemonDetails';
import Error from './routes/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/pokedex',
    element: <Pokedex />,
    errorElement: <Error />,
  },
  {
    path: '/pokedex/:id',
    element: <PokemonDetails />,
  },
]);

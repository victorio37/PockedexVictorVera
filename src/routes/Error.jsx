import React, { useState } from 'react';
import pokeball from '../assets/SVG/pokeball.svg';
import { Navigate, useRouteError } from 'react-router-dom';

const Error = () => {
  const [count, setCount] = useState(5);

  const error = useRouteError();
  console.log(error);

  setTimeout(() => {
    if (count > 0) setCount(count - 1);
  }, 1000);

  return (
    <div
      id="error-page"
      className="min-h-screen pb-5 flex flex-col justify-center items-center gap-4"
    >
      <img src={pokeball} alt="pokeball" className="animate-spin" />
      <h1 className="text-5xl lg:text-6xl font-medium">Oops!</h1>
      <p className="text-center lg:text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="text-center lg:text-lg">
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="text-center lg:text-lg">
        <strong>
          {' (La mayoria de las veces este error sucede porque ingresaste un nombre mal)'}
        </strong>
      </p>
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-xl lg:text-lg">Seras redirigido a pokedex en: </p>
        <h1 className="text-center text-6xl lg:text-7xl">{count}</h1>
      </div>
      <div className="relative grid place-items-center">
        <iframe
          title="gift"
          src="https://giphy.com/embed/hpIt6ZVfnAmT69ViaU"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
      <div>{!count && <Navigate to={'/pokedex'} />}</div>
    </div>
  );
};

export default Error;

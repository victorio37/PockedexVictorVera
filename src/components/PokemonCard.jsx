import React, { useEffect, useState } from 'react';
import { getService } from '../services/services';
import PokemonStats from './PokemonStats';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useColor } from '../hooks/useColor';

function generateUniqueId() {
  return uuidv4();
}

const PokemonCard = ({ pokemon }) => {
  const { statColor, setColor } = useColor();

  const [pokemonData, setPokemonData] = useState(null);

  const settingPokemonData = async () => {
    if (pokemon.url) setPokemonData(await getService(pokemon.url));
    else if (pokemon.id) {
      setPokemonData(pokemon);
    } else if (pokemon.pokemon.url) setPokemonData(await getService(pokemon.pokemon.url));
  };

  useEffect(() => {
    settingPokemonData();
  }, []);

  return (
    <>
      {pokemonData && (
        <div
          style={{
            border: `10px solid ${setColor(pokemonData.types[0].type.name)}`,
            boxShadow: '1px 1px 3px black',
            backgroundImage: `linear-gradient(${statColor}, transparent)`,
          }}
          className={`w-[280px] py-8 rounded lg:hover:scale-110 transition`}
        >
          <Link to={`/pokedex/${pokemonData.id}`}>
            <div className="flex flex-col justify-center items-center gap-1 ">
              <img
                src={
                  pokemonData.sprites.other.dream_world.front_default ||
                  pokemonData.sprites.other.home.front_default ||
                  pokemonData.sprites.other['official-artwork'].front_default
                }
                alt={pokemonData.name + 'IMG'}
                className="h-[150px]"
              />
              <p
                style={{
                  color: setColor(pokemonData.types[0].type.name),
                  textShadow: '1px 1px 1px black',
                }}
                className="text-[30px] font-bold text-center"
              >
                {pokemonData.name}
              </p>
              <article className="flex flex-col items-center justify-center">
                <h2 className="flex order-1 text-[#575555] text-[14px]">Tipo</h2>
                <div className="flex gap-1">
                  {pokemonData.types.map((type) => (
                    <h3 className="font-normal text-[18px]" key={type.type.name}>
                      {type.type.name}
                    </h3>
                  ))}
                </div>
              </article>
            </div>
            <article className="mt-3 flex flex-wrap justify-center items-center gap-5">
              {pokemonData.stats
                .filter(
                  (stat) =>
                    stat.stat.name === 'hp' ||
                    stat.stat.name === 'attack' ||
                    stat.stat.name === 'defense' ||
                    stat.stat.name === 'speed',
                )
                .map((stat) => (
                  <PokemonStats
                    key={generateUniqueId()}
                    text={stat.stat.name}
                    value={stat.base_stat}
                    color={statColor}
                  />
                ))}
            </article>
          </Link>
        </div>
      )}
    </>
  );
};

export default PokemonCard;

//<p>{pokemon.url || pokemon.id || pokemon.pokemon.url}</p>

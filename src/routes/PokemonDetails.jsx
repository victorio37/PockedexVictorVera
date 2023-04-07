import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserNameContext } from '../contexts/UserNameContext';
import { getService } from '../services/services';
import PokemonStats from '../components/PokemonStats';
import elipse from '../assets/SVG/elipse.svg';
import title from '../assets/SVG/title.svg';
import pokeball from '../assets/SVG/pokeball.svg';
import { useColor } from '../hooks/useColor';
const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';

const PokemonDetails = () => {
  const { name } = useContext(UserNameContext);
  const { id } = useParams();

  const { statColor, setColor, returnColorByType } = useColor();

  const [pokemon, setPokemon] = useState(null);

  const settingPokemom = async () => {
    const res = await getService(pokemonURL + id);
    setPokemon(res);
  };

  useEffect(() => {
    settingPokemom();
  }, [id, settingPokemom]);

  return (
    <>
      {pokemon && (
        <section>
          <div>
            <div className="w-full min-w-[320px] relative top-0">
              <div className="w-full h-[70px] bg-[#DD1A1A] relative">
                <img
                  src={title}
                  alt="title"
                  className="w-[200px] ml-4 absolute bottom-0"
                />
              </div>
              <div className="flex justify-end min-w-[340px] ">
                <img
                  src={elipse}
                  alt="elipse"
                  className="w-[70px] mr-10 absolute bottom-0"
                />
              </div>
              <div className="w-full h-[40px] bg-[#0C0C0C]"></div>
            </div>
          </div>
          <section className="pt-[80px] pb-5 border-[3px] border-black flex justify-center items-center">
            <div
              className="min-w-[305px] lg:mt-6 max-w-[1071px] p-[2px] w-[85%] relative flex flex-col gap-5"
              style={{ boxShadow: '1px 1px 3px black' }}
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(${setColor(
                    pokemon.types[0].type.name,
                  )}, transparent, ${statColor} )`,
                  border: `10px solid ${statColor}`,
                }}
              >
                <div className="relative h-[145px] flex justify-center">
                  <img
                    src={
                      pokemon.sprites.other.dream_world.front_default ||
                      pokemon.sprites.other.home.front_default ||
                      pokemon.sprites.other['official-artwork'].front_default
                    }
                    alt={pokemon.name + 'IMG'}
                    className="h-[150px] lg:h-[200px] lg:bottom-8 absolute bottom-16"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <p
                  className="shadow shadow-black px-3 rounded font-medium text-3xl"
                  style={{ color: statColor, textShadow: '1px 1px 1px black' }}
                >
                  #
                  <span
                    className="font-medium text-3xl"
                    style={{ color: statColor, textShadow: '1px 1px 1px black' }}
                  >
                    {id}
                  </span>
                </p>
              </div>
              <article className="flex flex-col justify-center items-center gap-4">
                <div>
                  <h1
                    className="text-3xl font-medium"
                    style={{ color: statColor, textShadow: '1px 1px 1px black' }}
                  >
                    {pokemon.name}
                  </h1>
                </div>
                <div className="flex gap-4">
                  <PokemonStats text={'Peso'} value={pokemon.weight} />
                  <PokemonStats text={'Altura'} value={pokemon.height} />
                </div>
              </article>
              <article className="my-4 lg:my-8 flex flex-wrap justify-center items-center gap-6">
                <section>
                  <h2 className="text-center mb-4 text-[#302F2F] text-[22px] font-medium">
                    Tipo
                  </h2>
                  <div className="flex gap-4">
                    {pokemon.types.map((type) => (
                      <p
                        key={type.type.name}
                        style={{
                          backgroundColor: returnColorByType(type.type.name),
                        }}
                        className="box-type-hablity text-[#FFFFFF] py-1 text-lg font-medium rounded w-[140px] text-center"
                      >
                        {type.type.name}
                      </p>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="text-center mb-4 text-[#302F2F] text-[22px] font-medium">
                    Habilidades
                  </h2>
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    {pokemon.abilities.map((ability) => (
                      <p
                        key={ability.ability.name}
                        className="box-type-hablity py-1 text-lg font-medium rounded w-[140px] text-center border-[3px] border-[#D3D3D3]"
                      >
                        {ability.ability.name}
                      </p>
                    ))}
                  </div>
                </section>
              </article>
              <article className="px-1">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[#302F2F] font-medium text-3xl">Stats</h2>
                  <img src={pokeball} alt="pokeball" className="animate-spin" />
                </div>
                {pokemon.stats
                  .filter(
                    (stat) =>
                      stat.stat.name === 'hp' ||
                      stat.stat.name === 'attack' ||
                      stat.stat.name === 'defense' ||
                      stat.stat.name === 'speed',
                  )
                  .map((stat) => (
                    <div key={stat.stat.name} className="text-[#302F2F] font-semibold">
                      <div className="flex justify-between">
                        <p className="lg:text-xl">{stat.stat.name}:</p>
                        <p className="lg:text-xl">{stat.base_stat}/150</p>
                      </div>
                      <div className="w-[100] h-[30px] bg-[#F6F6F6] rounded">
                        <div
                          className="h-[30px] rounded"
                          style={{
                            width: `${(stat.base_stat / 150) * 100}%`,
                            backgroundImage: 'linear-gradient(#FCD676, #E6901E)',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </article>
              <article className="px-1">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-[#302F2F] font-medium text-3xl">Movements</h2>
                  <img src={pokeball} alt="pokeball" className="animate-spin" />
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {pokemon.moves.map((move) => (
                    <p
                      key={move.move.name}
                      className="py-2 px-4 rounded-2xl text-lg bg-[#d1cfcf]"
                    >
                      {move.move.name}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </section>
      )}
      <div>{!name && <Navigate to={'/'} />}</div>
    </>
  );
};

export default PokemonDetails;

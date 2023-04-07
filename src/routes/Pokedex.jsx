import React, { useContext, useEffect, useState } from 'react';
import { UserNameContext } from '../contexts/UserNameContext';
import { Navigate } from 'react-router-dom';
import { getService } from '../services/services';
import PokemonCard from '../components/PokemonCard';
import { useForm } from 'react-hook-form';
import usePagination from '../hooks/usePagination';
import elipse from '../assets/SVG/elipse.svg';
import title from '../assets/SVG/title.svg';
const AllPokemonsURL = 'https://pokeapi.co/api/v2/pokemon/?limit=1300';
const pokemonsTypeURL = 'https://pokeapi.co/api/v2/type/';
const pokemonsNameURL = 'https://pokeapi.co/api/v2/pokemon/';

const Pokedex = () => {
  const { name } = useContext(UserNameContext);
  const { register, handleSubmit, setValue } = useForm();

  const [pokemons, setPokemons] = useState([]);
  const [pokeListTypes, setPokeListTypes] = useState([]);

  const pagination = usePagination(pokemons, 12);
  const listPagesPagination = usePagination(pagination.pages, 5);

  //para todos los pokemones
  const settingPokemons = async () => {
    const res = await getService(AllPokemonsURL);
    setPokemons(res.results);
  };

  //para la lista de los tipos de pokemones
  const settingPokeListTypes = async () => {
    const res = await getService('https://pokeapi.co/api/v2/type/');
    setPokeListTypes(res.results);
  };

  const myHandleSubmit = async (data) => {
    if (data.pokemonName && !data.pokemonsType) {
      const array = [];
      const res = await getService(pokemonsNameURL + data.pokemonName.toLowerCase());
      array.push(res);
      setPokemons(array);
    } else if (!data.pokemonName && data.pokemonsType) {
      if (data.pokemonsType === 'Todos') {
        settingPokemons();
      } else {
        const res = await getService(pokemonsTypeURL + data.pokemonsType);
        setPokemons(res.pokemon);
      }
    }
  };

  const colorButtonPage = (page) => {
    if (pagination.currentPage === page) return 'red';
    else return '';
  };

  useEffect(() => {
    settingPokeListTypes();
    settingPokemons();
  }, []);

  return (
    <div>
      <div className="w-full min-w-[320px] relative top-0">
        <div className="w-full h-[70px] bg-[#DD1A1A] relative">
          <img src={title} alt="title" className="w-[200px] ml-4 absolute bottom-0" />
        </div>
        <div className="flex justify-end min-w-[340px] ">
          <img src={elipse} alt="elipse" className="w-[70px] mr-10 absolute bottom-0" />
        </div>
        <div className="w-full h-[40px] bg-[#0C0C0C]"></div>
      </div>
      <div className="px-2 py-4 flex flex-col gap-5">
        <h1 className="text-center text-[15px]">
          <p>
            <span className="text-[#FE1936] font-bold ">Bienvenido {name}</span>
            <span className="text-[#333333]">
              , aqui podras encontrar tu pokemon favorito
            </span>
          </p>
        </h1>
        <div>
          {/* Fomulario */}
          <form
            onSubmit={handleSubmit((data) => myHandleSubmit(data))}
            className="flex flex-wrap justify-center items-center gap-2 rounded-sm"
          >
            {/* Input Name */}
            <input
              onFocus={() => setValue('pokemonsType', '')}
              type="search"
              {...register('pokemonName', {
                required: false,
              })}
              placeholder="Busca un pokemon"
              className="order-1 placeholder:text-[#D3D3D3] py-2 pl-3 shadow shadow-black"
            />
            {/* Input Tipos */}
            <select
              name="pokemonsType"
              onFocus={() => setValue('pokemonName', '')}
              {...register('pokemonsType', {
                required: false,
              })}
              className="input-type py-[6px] pl-2 order-3 rounded-sm shadow shadow-black lg:hover:cursor-pointer"
            >
              <option disabled value={''}>
                Ninguno
              </option>
              <option value={'Todos'}>Todos los pokemones</option>
              {pokeListTypes &&
                pokeListTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
            </select>
            <button
              type="submit"
              className="pokedex-button-submit order-2 bg-[#D93F3F] lg:hover:bg-[#b82424] transition text-[#FFFFFF] py-2 px-1 rounded-sm"
            >
              Buscar
            </button>
          </form>
        </div>
        <section className="my-5 flex justify-center items-center gap-2">
          {pokemons.length > 1 && (
            <>
              <button
                onClick={listPagesPagination.previousPage}
                className="p-2 bg-[#DD1A1A] flex items-center justify-center rounded-sm shadow-sm shadow-black"
              >
                <box-icon name="left-arrow" type="solid" color="#ffffff"></box-icon>
              </button>
              {listPagesPagination.listSlice.map((page) => (
                <button
                  onClick={() => pagination.changePageTo(page)}
                  key={page}
                  style={{ color: colorButtonPage(page) }}
                  className={'w-[28px]'}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={listPagesPagination.nextPage}
                className="p-2 bg-[#DD1A1A] flex items-center justify-center rounded-sm shadow-sm shadow-black"
              >
                <box-icon type="solid" name="right-arrow" color="#ffffff"></box-icon>
              </button>
            </>
          )}
        </section>
        <div className=" flex flex-col justify-center items-center">
          <main className="max-w-[1300px] flex flex-wrap justify-center items-center gap-6">
            {pokemons &&
              pagination.listSlice.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name || pokemon.name || pokemon.pokemon.name}
                  pokemon={pokemon}
                />
              ))}
          </main>
        </div>
        <section className="my-5 flex justify-center items-center gap-2">
          {pokemons.length > 1 && (
            <>
              <button
                onClick={listPagesPagination.previousPage}
                className="p-2 bg-[#DD1A1A] flex items-center justify-center rounded-sm shadow-sm shadow-black"
              >
                <box-icon name="left-arrow" type="solid" color="#ffffff"></box-icon>
              </button>
              {listPagesPagination.listSlice.map((page) => (
                <button
                  onClick={() => pagination.changePageTo(page)}
                  key={page}
                  style={{ color: colorButtonPage(page) }}
                  className={'w-[28px]'}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={listPagesPagination.nextPage}
                className="p-2 bg-[#DD1A1A] flex items-center justify-center rounded-sm shadow-sm shadow-black"
              >
                <box-icon type="solid" name="right-arrow" color="#ffffff"></box-icon>
              </button>
            </>
          )}
        </section>
      </div>
      {!name && <Navigate to={'/'} />}
    </div>
  );
};

export default Pokedex;

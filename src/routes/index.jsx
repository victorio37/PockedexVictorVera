import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserNameContext } from '../contexts/UserNameContext';
import { Navigate } from 'react-router-dom';
import title from '../assets/SVG/title.svg';
import elipse from '../assets/SVG/elipse.svg';

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { name, setName } = useContext(UserNameContext);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-7">
      <div>
        <img src={title} alt="mainTitle" className="h-[60px] lg:h-[80px]" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[#FE1936] text-3xl lg:text-4xl font-bold">
          ¡Hola entrenador!
        </h1>
        <p className="lg:text-lg">para poder comenzar dame tu nombre</p>
      </div>
      <form
        onSubmit={handleSubmit((data) => setName(data.userName))}
        className="index-form flex flex-wrap justify-center items-center gap-2"
      >
        <input
          type="text"
          name="userName"
          placeholder="Tu nombre..."
          {...register('userName', {
            required: {
              value: true,
              message: 'campo obligatorio',
            },
            pattern: {
              value: /[a-zA-z-Zá-úÁ-ÚñÑ]{4,20}/,
              message: 'nombre no valido',
            },
          })}
          className="p-2 placeholder:text-[#D3D3D3] shadow-sm shadow-black"
        />
        <button
          type="submit"
          className="bg-[#D93F3F] px-5 py-2 text-[#FFFFFF] shadow-sm shadow-black"
        >
          Comenzar
        </button>
      </form>
      <p>
        {errors.userName && (
          <span className="text-red-800">{errors.userName.message}</span>
        )}
      </p>
      <div className="w-full absolute bottom-0">
        <div className="w-full h-[70px] bg-[#DD1A1A]"></div>
        <div className="flex justify-center">
          <img src={elipse} alt="elipse" className="w-[90px] absolute bottom-0" />
        </div>
        <div className="w-full h-[40px] bg-[#0C0C0C]"></div>
      </div>
      {name && <Navigate to={'/pokedex'} />}
    </div>
  );
};

export default Index;

import React from 'react';

const PokemonStats = ({ text, value, color }) => {
  return (
    <div className="w-[100px] flex flex-col justify-center items-center shadow shadow-black rounded">
      <h3 className="text-[#313030]">{text}</h3>
      <p
        style={{
          color: color,
          textShadow: '1px 1px 1px black',
        }}
        className="text-[22px]"
      >
        {value}
      </p>
    </div>
  );
};

export default PokemonStats;

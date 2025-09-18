// Filename: app/components/SpellTable.tsx

import React from 'react';

interface SpellAttribute {
  label: string;
  value: string;
}

interface Spell {
  key: string;
  img: string;
  name: string;
  description: string;
  attributes: SpellAttribute[];
}

interface SpellTableProps {
  spell: Spell;
}

const SpellTable: React.FC<SpellTableProps> = ({ spell }) => {
  return (
    <div className=" relative bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-l-2xl shadow-lg p-4 w-[100%] md:w-[70%] max-w-md font-orbitron">
      <h2 className="text-yellow-400 text-sm xl:text-xl font-bold mb-1">🪐 {spell.name}</h2>
      <p className="text-blue-300 text-sm xl:text-base mb-2 ">{spell.key ?? 'null'}</p>
      <p className="text-gray-300 text-[12px] xl:text-sm mb-4">{spell.description}</p>
      {spell.attributes.length > 0 && (
      <table className="w-full text-[12px] xl:text-sm ">
        <thead>
          <tr className="text-gray-400 uppercase text-xs border-b border-gray-600">
            <th className="py-2 text-left">Attribute</th>
            <th className="py-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {spell.attributes.map((attr, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
              <td className="py-2">{attr.label}</td>
              <td className="py-2">{attr.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default SpellTable;

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
    <div className=" relative bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-4 w-full max-w-md font-orbitron">
      <h2 className="text-yellow-400 text-xl font-bold mb-1">🪐 {spell.name}</h2>
      <p className="text-blue-300 text-base mb-4 ">{spell.key ?? 'nill'}</p>
      <p className="text-gray-300 text-sm mb-6">{spell.description}</p>
      {spell.attributes.length > 0 && (
      <table className="w-full text-sm">
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

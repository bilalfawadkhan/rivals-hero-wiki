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
    <div className=" mx-auto bg-gray-600 shadow-xl rounded-2xl p-4">
      {/* <h2 className="text-3xl font-bold text-indigo-600 mb-2">{spell.name.trim()}</h2> */}
      <p className="text-white text-xs mb-6">{spell.description}</p>

      <table className="w-full border-collapse border border-white">
        <thead className="bg-gray-500">
          <tr>
            <th className="text-left px-4 py-2 border text-white text-xs border-gray-200 font-semibold">Attribute</th>
            <th className="text-left px-4 py-2 border text-white text-xs border-gray-200 font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {spell.attributes.map((attr, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="px-4 py-2 border text-white text-xs border-gray-200">{attr.label}</td>
              <td className="px-4 py-2 border text-white text-xs border-gray-200">{attr.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpellTable;

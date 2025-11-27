// components/LocationList.js
import React from 'react';

export default function LocationList({ locations, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {locations.map((loc) => (
        <div key={loc.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer bg-white text-black" onClick={() => onSelect(loc)}>
          <img src={loc.img} alt={loc.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{loc.name}</h3>
            <p className="text-gray-600 mb-2">{loc.description}</p>
            <p className="text-blue-600 font-bold">{loc.price}€ / séance</p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">Choisir ce lieu</button>
          </div>
        </div>
      ))}
    </div>
  );
}
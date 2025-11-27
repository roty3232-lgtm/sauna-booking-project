// components/AdminWrapper.js
"use client";

import React, { useState } from 'react';
import { updatePrice } from '@/app/actions'; // On importe notre fonction magique

export default function AdminWrapper({ locations }) {
  const [data, setData] = useState(locations);
  const [isSaving, setIsSaving] = useState(false); // Pour afficher "Chargement..."

  // Met à jour l'affichage local quand tu tapes
  const handlePriceChange = (id, newPrice) => {
    const updated = data.map(loc => 
      loc.id === id ? { ...loc, price: newPrice } : loc
    );
    setData(updated);
  };

  // La fonction qui sauvegarde pour de vrai
  const handleSave = async () => {
    setIsSaving(true);
    // On boucle sur chaque sauna pour mettre à jour son prix
    for (const loc of data) {
      await updatePrice(loc.id, loc.price);
    }
    setIsSaving(false);
    alert("✅ Prix mis à jour avec succès !");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-black">Gérer mes Saunas</h2>
      
      <div className="space-y-6">
        {data.map((loc) => (
          <div key={loc.id} className="flex flex-col md:flex-row border p-4 rounded gap-4 items-center text-black">
            <img src={loc.img} alt={loc.name} className="w-20 h-20 object-cover rounded" />
            
            <div className="flex-1">
              <h3 className="font-bold text-lg">{loc.name}</h3>
              <p className="text-sm text-gray-500">{loc.description}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Prix / Heure</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={loc.price}
                  onChange={(e) => handlePriceChange(loc.id, e.target.value)}
                  className="border p-2 rounded w-24 font-bold text-black"
                />
                <span className="text-black">€</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t text-right">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-3 rounded font-bold text-white transition ${isSaving ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
        >
          {isSaving ? "Sauvegarde en cours..." : "Sauvegarder les changements"}
        </button>
      </div>
    </div>
  );
}
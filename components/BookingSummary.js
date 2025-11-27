// Fichier : components/BookingSummary.js
"use client";

import React, { useState } from 'react';
import { createBookingSession } from '@/app/actions'; // Note le nouveau nom de la fonction

export default function BookingSummary({ location, date, time, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 1. On appelle le serveur pour avoir le lien Stripe
    const result = await createBookingSession(location.id, date, time, formData, location.price);
    
    // 2. Si on a le lien, on y va !
    if (result.url) {
      window.location.href = result.url;
    } else {
      alert("Erreur lors de la création du paiement.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto border p-6 rounded-lg shadow-md bg-white text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Paiement</h2>
      
      <div className="bg-gray-50 p-4 rounded mb-6 text-sm">
        <p><span className="font-bold">Lieu :</span> {location.name}</p>
        <p><span className="font-bold">Date :</span> {date} à {time}</p>
        <p className="text-lg font-bold mt-2 text-right">Total à payer : {location.price}€</p>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Nom complet</label>
          <input required type="text" name="name" className="w-full border p-2 rounded" onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Email</label>
          <input required type="email" name="email" className="w-full border p-2 rounded" onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Téléphone</label>
          <input required type="tel" name="phone" className="w-full border p-2 rounded" onChange={handleChange} />
        </div>

        <button 
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded mt-4 transition shadow-lg flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? "Redirection Stripe..." : `Payer ${location.price}€ par Carte`}
        </button>
      </form>
      
      <button onClick={onBack} className="w-full mt-3 text-gray-500 text-sm hover:underline">
        Retour
      </button>
    </div>
  );
}
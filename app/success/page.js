// Fichier : app/success/page.js
import React from 'react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center max-w-lg">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Paiement réussi !</h1>
        <p className="text-gray-700 mb-8">
          Merci pour votre réservation. Vous allez recevoir un email de confirmation (simulation).
        </p>
        <a href="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
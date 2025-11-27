import React from 'react';

export default function BookingCalendar({ 
  location, timeSlots, selectedDate, selectedTime, 
  capacity, takenCounts, 
  onDateChange, onTimeChange, onBack, onNext 
}) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-black">
      <h3 className="text-xl font-bold mb-6">Réserver : {location.name}</h3>
      
      {/* J'ai supprimé la ligne qui affichait la capacité ici */}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-semibold">Choisir une date</label>
        <input 
          type="date" 
          value={selectedDate}
          className="w-full p-2 border rounded"
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      {selectedDate && (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">Choisir un créneau</label>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => {
              // Calcul des places
              const count = takenCounts[time] || 0;
              const remaining = capacity - count;
              const isFull = remaining <= 0;
              
              return (
                <button
                  key={time}
                  disabled={isFull}
                  onClick={() => onTimeChange(time)}
                  className={`
                    p-3 rounded border text-sm transition flex justify-between items-center
                    ${isFull 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : selectedTime === time 
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                        : 'bg-white hover:border-blue-500 text-black shadow-sm'
                    }
                  `}
                >
                  <span className="font-bold">{time}</span>
                  
                  {/* On garde l'info des places SUR LE BOUTON uniquement */}
                  <span className={`text-xs ${isFull ? 'text-red-400 font-bold' : selectedTime === time ? 'text-blue-100' : 'text-green-600'}`}>
                    {isFull ? "COMPLET" : `${remaining} place${remaining > 1 ? 's' : ''}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="text-gray-500 underline">Retour</button>
        <button 
          disabled={!selectedTime || !selectedDate}
          onClick={onNext} 
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
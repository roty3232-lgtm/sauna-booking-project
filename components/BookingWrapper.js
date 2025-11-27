// Fichier : components/BookingWrapper.js
"use client";

import React, { useState } from 'react';
import LocationList from '@/components/LocationList';
import BookingCalendar from '@/components/BookingCalendar';
import BookingSummary from '@/components/BookingSummary';
// On importe notre nouvelle fonction serveur pour vérifier les places
import { getSlotAvailability } from '@/app/actions';

export default function BookingWrapper({ locations, timeSlots }) {
  // --- VARIABLES D'ÉTAT (STATE) ---
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  // Stocke la capacité totale et les places prises pour le jour choisi
  const [availabilityInfo, setAvailabilityInfo] = useState({ capacity: 0, taken: {} });

  // --- ACTIONS ---

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setStep(2);
    // On remet tout à zéro quand on change de lieu
    setSelectedDate("");
    setAvailabilityInfo({ capacity: 0, taken: {} });
  };

  // Quand l'utilisateur change la date
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // On décoche l'heure précédente
    
    if (date && selectedLocation) {
      // 1. On appelle le serveur pour avoir les dispos
      const data = await getSlotAvailability(selectedLocation.id, date);
      
      // 2. On met à jour l'interface avec les nouvelles infos
      setAvailabilityInfo({ 
        capacity: data.totalCapacity, 
        taken: data.takenCounts 
      });
    }
  };

  // --- AFFICHAGE ---

  return (
    <>
      {/* Barre de progression */}
      <div className="flex justify-center mb-8 gap-2">
        <div className={`h-2 flex-1 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`h-2 flex-1 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`h-2 flex-1 rounded ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
      </div>

      {step === 1 && <LocationList locations={locations} onSelect={handleLocationSelect} />}

      {step === 2 && (
        <BookingCalendar 
          location={selectedLocation} 
          timeSlots={timeSlots} 
          selectedDate={selectedDate} 
          selectedTime={selectedTime}
          
          // On passe les infos de capacité au calendrier 👇
          capacity={availabilityInfo.capacity}
          takenCounts={availabilityInfo.taken}
          
          onDateChange={handleDateChange} 
          onTimeChange={setSelectedTime} 
          onBack={() => setStep(1)} 
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <BookingSummary 
          location={selectedLocation} date={selectedDate} time={selectedTime}
          onBack={() => setStep(2)} onConfirm={() => alert("Paiement à venir...")}
        />
      )}
    </>
  );
}
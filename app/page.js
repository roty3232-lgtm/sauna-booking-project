// Fichier : app/page.js (ACCUEIL)
import React from 'react';
// Le @ permet de trouver le fichier direct, sans se perdre avec les points
import prisma from '@/lib/prisma'; 
import { TIME_SLOTS } from '@/lib/constants';
import BookingWrapper from '@/components/BookingWrapper'; // <-- Ici on veut le BookingWrapper, pas l'Admin !

export const dynamic = "force-dynamic";

export default async function PageAccueil() {
  const locations = await prisma.location.findMany();

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800">SAUNA BOOKING</h1>
        <BookingWrapper locations={locations} timeSlots={TIME_SLOTS} />
      </div>
    </div>
  );
}
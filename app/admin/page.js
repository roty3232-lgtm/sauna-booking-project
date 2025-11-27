// Fichier : app/admin/page.js (ADMIN)
import React from 'react';
import prisma from '@/lib/prisma';
import AdminWrapper from '@/components/AdminWrapper';

export default async function PageGerant() {
  const locations = await prisma.location.findMany();
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Espace Gérant 🛠️</h1>
          <a href="/" className="text-blue-600 underline">Retour au site</a>
        </div>

        <AdminWrapper locations={locations} />

        <div className="mt-10 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 text-black">📅 Réservations reçues</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">Aucune réservation.</p>
          ) : (
            <table className="w-full text-left text-black text-sm">
              <thead className="bg-gray-50 uppercase text-xs text-gray-500">
                <tr>
                  <th className="p-3">Date / Heure</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-bold">{booking.date}</div>
                      <div className="text-blue-600">{booking.time}</div>
                    </td>
                    <td className="p-3 font-medium">
                      {booking.customerName || "Anonyme"}
                    </td>
                    <td className="p-3">
                      <div>{booking.customerEmail}</div>
                      <div className="text-gray-500">{booking.customerPhone}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
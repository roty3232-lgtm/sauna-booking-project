// Fichier : app/actions.js
"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';

// On initialise Stripe avec ta clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- 1. GESTION DES PRIX ---
export async function updatePrice(id, newPrice) {
  await prisma.location.update({
    where: { id: id },
    data: { price: Number(newPrice) },
  });
  revalidatePath('/admin');
  revalidatePath('/');
}

// --- 2. CRÉATION DE SESSION DE PAIEMENT (Nouveau !) ---
export async function createBookingSession(locationId, date, time, formData, price) {
  
  // A. On crée la réservation en "En attente" (PENDING)
  const booking = await prisma.booking.create({
    data: {
      locationId: locationId,
      date: date,
      time: time,
      customerEmail: formData.email,
      customerName: formData.name,
      customerPhone: formData.phone,
      status: 'PENDING' // Important : pas encore payé
    },
  });

  // B. On demande à Stripe de créer une page de paiement
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Réservation Sauna - ${date} à ${time}`,
          },
          unit_amount: price * 100, // Stripe compte en centimes ! (45€ = 4500)
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // Où aller si ça marche ?
    success_url: `http://localhost:3000/success`, 
    // Où aller si le client annule ?
    cancel_url: `http://localhost:3000/`,
    metadata: {
      bookingId: booking.id, // On garde une trace de l'ID pour plus tard
    },
  });

  // C. On renvoie le lien Stripe au site
  return { url: session.url };
}

// --- 3. VÉRIFICATION DES DISPONIBILITÉS ---
export async function getSlotAvailability(locationId, date) {
  const location = await prisma.location.findUnique({
    where: { id: locationId },
    select: { capacity: true }
  });
  
  if (!location) return { totalCapacity: 0, takenCounts: {} };

  const bookings = await prisma.booking.findMany({
    where: {
      locationId: locationId,
      date: date,
    },
    select: { time: true },
  });

  const availability = {};
  bookings.forEach((b) => {
    if (!availability[b.time]) availability[b.time] = 0;
    availability[b.time]++;
  });

  return {
    totalCapacity: location.capacity,
    takenCounts: availability 
  };
}
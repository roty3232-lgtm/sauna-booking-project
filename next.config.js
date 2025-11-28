// Fichier : next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Le mode 'standalone' optimise l'output pour le déploiement sur les plateformes Cloud
    output: 'standalone', 
    // On force les images si on en ajoute plus tard
    images: {
        unoptimized: true,
    }
};

module.exports = nextConfig;
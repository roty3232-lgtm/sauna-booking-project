import { NextResponse } from 'next/server';

export function middleware(request) {
  // On surveille l'entrée de l'admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    const authHeader = request.headers.get('authorization');

    if (authHeader) {
      const authValue = authHeader.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 2. On vérifie le mot de passe (admin / sauna)
      if (user === 'admin' && pwd === process.env.ADMIN_PASSWORD) { // Utilisation du .env
        return NextResponse.next(); // C'est bon, on laisse passer !
      }
    }

    // Sinon, on bloque et on demande le mot de passe
    return new NextResponse('Accès Interdit', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Espace Gerant"',
      },
    });
  }
}

// On applique ce vigile uniquement sur les pages admin
export const config = {
  matcher: '/admin/:path*',
};
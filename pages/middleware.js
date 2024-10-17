import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(req) {
  const { cookies } = req;
  const token = cookies.token || '';

  try {
    verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect('/login');
  }
}

export const config = {
  matcher: ['/timeline'],
};

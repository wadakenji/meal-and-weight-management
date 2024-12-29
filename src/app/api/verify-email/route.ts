import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { verifyInviteEmailToken } from '@/usecase/authentication';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const [email, token] = [searchParams.get('email'), searchParams.get('token')];

  if (!email || !token) return redirect('/sign-in');

  await verifyInviteEmailToken(email, token)
    .then(() => redirect('/'))
    .catch(() => redirect('/sign-in'));
}

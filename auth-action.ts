// lib/actions/auth-actions.ts
'use server';

import { signIn, signOut } from '@/auth';

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function signInAction() {
  await signIn('github');
}

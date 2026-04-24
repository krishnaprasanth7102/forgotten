
'use client';

import React from 'react';
import { initializeFirebase, FirebaseClientProvider } from '@/firebase';

const { firebaseApp, firestore, auth, storage } = initializeFirebase();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider 
      firebaseApp={firebaseApp} 
      firestore={firestore} 
      auth={auth} 
      storage={storage}
    >
      {children}
    </FirebaseClientProvider>
  );
}

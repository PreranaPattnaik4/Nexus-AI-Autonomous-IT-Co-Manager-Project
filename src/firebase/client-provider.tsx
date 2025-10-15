'use client';

import { useMemo } from 'react';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

import { firebaseConfig } from '@/firebase/config';
import { FirebaseProvider } from '@/firebase/provider';

let firebaseApp: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

function getFirebase() {
  if (firebaseApp) {
    return { firebaseApp, auth, firestore };
  }

  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);

  return { firebaseApp, auth, firestore };
}

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firebaseApp, auth, firestore } = useMemo(getFirebase, []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp!}
      auth={auth!}
      firestore={firestore!}
    >
      {children}
    </FirebaseProvider>
  );
}

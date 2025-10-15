import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { firebaseConfig } from '@/firebase/config';

let app: App;

function getFirebaseAdminApp() {
  if (getApps().length) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId;

  // Check for GOOGLE_APPLICATION_CREDENTIALS env var for server-side environments
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
     app = initializeApp({
        credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
        projectId,
     });
  } else {
    // For local development, it will use the ADC from `gcloud auth application-default login`
    app = initializeApp({ projectId });
  }
  return app;
}

getFirebaseAdminApp();

export { getFirebaseAdminApp };

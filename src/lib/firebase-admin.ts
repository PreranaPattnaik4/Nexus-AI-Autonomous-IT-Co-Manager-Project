import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

let app: App;

function getFirebaseAdminApp() {
  if (getApps().length) {
    return getApps()[0];
  }

  // Check for GOOGLE_APPLICATION_CREDENTIALS env var for server-side environments
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
     app = initializeApp({
        credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
     });
  } else {
    // For local development, it will use the ADC from `gcloud auth application-default login`
    app = initializeApp();
  }
  return app;
}

getFirebaseAdminApp();

export { getFirebaseAdminApp };

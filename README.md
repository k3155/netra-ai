# Netra AI — Starter Project

A beginner-friendly monorepo for the Netra AI website, Android app, and shared AI backend.

## Included
- `apps/web`: React + Vite website
- `apps/mobile`: Expo / React Native app (Android-ready)
- `functions`: Firebase Cloud Function for a server-side AI chat endpoint
- `firestore.rules`: starter Firestore security rules

## 1. Requirements
Install Node.js LTS, Git, Android Studio (optional with Expo Go), and Firebase CLI (`npm install -g firebase-tools`).

## 2. Website
```bash
cd apps/web
npm install
cp .env.example .env
npm run dev
```

## 3. Android app
```bash
cd apps/mobile
npm install
cp .env.example .env
npx expo start
```
Scan the QR code with Expo Go, or press `a` with an Android emulator running.

## 4. Firebase setup
1. Create a project at https://console.firebase.google.com/
2. Add a Web app and copy its config into `apps/web/.env`.
3. Fill `apps/mobile/.env` with the Firebase app values.
4. Enable Email/Password and Google Authentication providers.
5. Enable Firestore.
6. Run `firebase login` and `firebase use --add` from the project root.
7. Deploy rules with `firebase deploy --only firestore:rules`.

## 5. Secure AI API setup
Never put the OpenAI API key in website/mobile environment files or GitHub. From the project root:
```bash
cd functions
npm install
cd ..
firebase functions:secrets:set OPENAI_API_KEY
firebase deploy --only functions
```
The callable function is named `chat` and reads the key on the server.

## 6. Important notes
- This is a starter scaffold, not a finished production app.
- Authentication UI is not implemented yet. The chat backend requires a signed-in Firebase user, so chat will not work until sign-in is added.
- Paid plans, coins, creator channels, commerce, image/video generation, moderation, and payments are future work.
- Do not commit `.env` files or API keys.
- This is a public repository: anyone can view its source.

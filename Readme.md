# Expo and Firebase Integration Sample

This is a minimal example of using firebase web SDK with Expo apps. A react hook-based workflow is applied for firebase auth and realtime database.

## Custom Hooks Usage

**useFirebase**:

```javascript
// this hook must be called in App.js
const firebaseApp = useFirebase(firebaseConfig);

// firebaseApp is null when firebase is starting (important to check and avoid uninitialized firebase calls)
```

**useAuth**:

```javascript
const { user, login, logout } = useAuth();
...
user    // is the firebase user object when logged in (null/undefined otherwise)
login("user@example.com", "123456");    // using email/password strategy, automatically updates user object
logout();   // sign-out from firebase and resets user object
```

**useReference**:

```javascript
// this hook works just like useState, but using realtime database :)
// reference is a firebase realtime db ref (or path)
// defaultVal is optional, null is returned when ref is loading or not exist
const [currentVal, setCurrentVal] = useReference(reference, defaultVal);
```

**useList**:

```javascript
// this hook is a helper to manipulate lists of objects
// by default, firebase lists are key-value objects {key1:obj1, key2:obj2, ...}
// usage example:
const books = useList("books");

// to access list objects use the "data" attribute:
books.data;

// to create a new object use create. a hash key will be created automatically:
books.create(object);

// objects can be removed by key:
books.remove(key);

// objects can be updated by key an an updated value:
books.update(key, updatedObject);
```

Feel free to adapt or create new Hooks, e.g. for other authentication strategies.

## Project Strucutre

```
App.js      -> entry point, with firebase initialization
src/config  -> firebaseConfig (from your project)
src/hooks   -> custom hooks for firebase
src/pages   -> a sample page using auth and realtime db
```

## Firebase Project Configuration

1 - Access: https://console.firebase.google.com

2 - Create a new project

3 - Register a web app to your project (firebase hosting is not needed)

4 - Create a realtime database for your project

5 - Change rules to accept only authenticated users:

```
{
  "rules": {
    ".read": "auth.uid != null",
    ".write": "auth.uid != null"
  }
}
```

6 - Enable Authentication for your project

7 - Add email/password Sign-in method

8 - Create an example user for testing (I'm using user@example.com, password:123456 in this sample)

9 - Locate your project config and copy your web app's Firebase configuration (firebaseConfig object with apiKey, authDomain, ..)

## Expo Config

1 - Using this repository source code, you can find `src/config/firebaseConfig.js.example`. Rename it to `src/config/firebaseConfig.js` and replace contents with your Firebase configuration.

2 - Pay attention that `src/config/firebaseConfig.js` is ignored by .gitignore, so your credentials will not be upload to github.

3 - [Skip if you are not creating a new expo project] When using firebase in a brand new expo project you need to install firebase dependencies: `$ expo install firebase`

## Known Issues

[For now] expo firebase library is outdated and some warnings are shown. I've disabled them in `src/hooks/useFirebase.js` with LogBox. I hope these dependencies to be updated soon.

import fireabse from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyD-m5oX1n1gQ2Px8GzA1ME59uYT453qCaI",
    authDomain: "musicfy-f8690.firebaseapp.com",
    databaseURL: "https://musicfy-f8690.firebaseio.com",
    projectId: "musicfy-f8690",
    storageBucket: "musicfy-f8690.appspot.com",
    messagingSenderId: "618493859128",
    appId: "1:618493859128:web:3c180ed89236bd4a3cddcd"
};

export default fireabse.initializeApp(firebaseConfig)
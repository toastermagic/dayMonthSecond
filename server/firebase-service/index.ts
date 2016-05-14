var firebase = require('firebase');
// import * as FirebaseTokenGenerator from 'firebase-token-generator';

const firebaseUrl = 'https://blazing-heat-6719.firebaseio.com/';
console.log('firebase@', firebaseUrl);
const firebaseRef = new firebase(firebaseUrl);

export class FirebaseService {
    users() {
        console.log('getting users from firebase');
        firebaseRef.child('/users').on('value', function(snapshot) {
            console.log('got users', snapshot);
        });
    }

    // token() {
    //     var tokenGenerator = new FirebaseTokenGenerator('<YOUR_FIREBASE_SECRET>');
    //     var token = tokenGenerator.createToken(
    //         { uid: '1', some: 'arbitrary', data: 'here' },
    //         { admin: true }
    //     );

    //     return token;
    // }
};

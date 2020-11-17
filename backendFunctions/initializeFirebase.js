import * as firebase from 'firebase';

export function initializeFirebase(){
	var firebaseConfig = {

        //insert your firebase key here
  	};

 	if (!firebase.apps.length) {
  		firebase.initializeApp(firebaseConfig);
	}

}
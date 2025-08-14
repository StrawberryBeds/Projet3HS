<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inscription</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-input v-model="firstName" label="Prénom" required></ion-input>
      <ion-input v-model="lastName" label="Nom" required></ion-input>
      <ion-input v-model="email" label="Courriel" type="email" required></ion-input>
      <ion-input v-model="password" label="Mot de passe" type="password" required></ion-input>
      <ion-input v-model="passwordConfirmation" label="Confirmer mot de passe" type="password" required></ion-input>
      <ion-button expand="block" @click="inscrire">S'inscrire</ion-button>
      <ion-button expand="block" fill="clear" router-link="/login">Retour à la connexion</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from '@/services/firebaseConfig'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

async function inscrire() {
  if (!firstName.value || !lastName.value || !email.value || !password.value || !passwordConfirmation.value) {
    alert('Veuillez remplir tous les champs.')
    return
  }
  if (passwordConfirmation.value !== password.value) {
    alert('Le mot de passe et sa confirmation doivent être identiques.')
    return
  }

  const auth = getAuth(firebaseApp)
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value.trim()
    )

    const db = getFirestore(firebaseApp)
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim()
    })
    // Optionally, you can save firstName and lastName to Firestore or another database here.
    alert('Compte créé avec succès!')
    router.push('/tabs')
  } catch (error: any) {
    const errorCode = error.code
    let errorMessage = 'Une erreur est survenue.'
    if (errorCode === 'auth/email-already-in-use') {
      errorMessage = 'Un utilisateur avec ce courriel existe déjà.'
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = 'Adresse courriel invalide.'
    } else if (errorCode === 'auth/weak-password') {
      errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.'
    }
    alert(errorMessage)
  }
}
</script>

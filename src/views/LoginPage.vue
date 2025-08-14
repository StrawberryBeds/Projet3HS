<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-input v-model="email" label="Email" type="email" required></ion-input>
      <ion-input v-model="password" label="Mot de passe" type="password" required></ion-input>
      <ion-button expand="block" @click="seConnecter">Se connecter</ion-button>
      <ion-button expand="block" fill="clear" router-link="/register">Créer un compte</ion-button>
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseApp } from '@/services/firebaseConfig'

const email = ref('')
const password = ref('')
const router = useRouter()

async function seConnecter() {
  if (!email.value || !password.value) {
    alert("Veuillez remplir tous les champs.")
    return
  }

  const auth = getAuth(firebaseApp)
  try {
    await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value.trim()
    )
    alert("Connexion réussie !")
    router.push('/firebasedatastore')
  } catch (error: any) {
    const errorCode = error.code
    let errorMessage = "Email ou mot de passe incorrect."
    if (errorCode === 'auth/user-not-found') {
      errorMessage = "Aucun utilisateur trouvé avec cet email."
    } else if (errorCode === 'auth/wrong-password') {
      errorMessage = "Mot de passe incorrect."
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = "Adresse email invalide."
    }
    alert(errorMessage)
  }
}
</script>
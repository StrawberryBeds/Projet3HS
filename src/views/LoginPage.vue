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
      <ion-button expand="block" fill="clear" router-link="/forgot-password">
        Mot de passe oublié ?
      </ion-button>
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
import { ref, watch } from 'vue'
import { useAuth } from '@/components/useAuth'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseApp } from '@/services/firebaseConfig'

const email = ref('')
const password = ref('')
const { user } = useAuth()
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
    // Redirection manuelle après connexion
    router.push('/tabs')  // <-- ici on redirige directement vers /tabs
  } catch (error: any) {
    let errorMessage = "Email ou mot de passe incorrect."
    if (error.code === 'auth/user-not-found') {
      errorMessage = "Aucun utilisateur trouvé avec cet email."
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = "Mot de passe incorrect."
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Adresse email invalide."
    }
    alert(errorMessage)
  }
}
</script>

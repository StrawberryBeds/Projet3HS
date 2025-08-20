<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mot de passe oublié</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input v-model="email" placeholder="Entrez votre email" type="email"></ion-input>
      </ion-item>

      <ion-button expand="block" @click="sendResetEmail">
        Envoyer le lien de réinitialisation
      </ion-button>
      <ion-button expand="block" fill="clear" router-link="/login">
        Retour
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/vue'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { firebaseApp } from '@/services/firebaseConfig'

const email = ref('')

const auth = getAuth(firebaseApp)

async function sendResetEmail() {
  if (!email.value) {
    alert("Veuillez entrer votre email.")
    return
  }

  try {
    await sendPasswordResetEmail(auth, email.value.trim())
    alert("Un email pour réinitialiser votre mot de passe a été envoyé.")
  } catch (error: any) {
    alert("Erreur : " + error.message)
  }
}
</script>

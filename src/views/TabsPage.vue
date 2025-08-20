<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mes Tâches</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout">Logout</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-tabs>
      <!-- Outlet obligatoire pour afficher les enfants -->
      <ion-router-outlet></ion-router-outlet>

      <!-- Barre d’onglets -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button :to="{ path: '/tabs/actives' }">
          <ion-label>Actives</ion-label>
        </ion-tab-button>

        <ion-tab-button :to="{ path: '/tabs/fermees' }">
          <ion-label>Fermées</ion-label>
        </ion-tab-button>

        <ion-tab-button :to="{ path: '/tabs/archivees' }">
          <ion-label>Archivées</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/vue'
import { auth } from '@/services/firebaseConfig'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  await auth.signOut()
  router.push('/login') // redirection après logout
}
</script>

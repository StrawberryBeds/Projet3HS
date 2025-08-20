<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tâches Fermées</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="task in tasks" :key="task.taskId">
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <p>Créé par: {{ task.ownerName }}</p>
            <p>Statut: {{ task.statut }}</p>
            <p>Date: {{ task.createdAt }}</p>
          </ion-label>

          <ion-button v-if="task.ownerId === userId" color="primary" @click="reopenTask(task)">Réouvrir</ion-button>
          <ion-button v-if="task.ownerId === userId" color="warning" @click="archiveTask(task)">Archiver</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton, IonList, IonLabel } from '@ionic/vue'
import { db, auth } from '@/services/firebaseConfig'
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const tasks = ref<any[]>([])
const userId = ref<string>('')

// Récupérer l'utilisateur actuel
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid
    fetchTasks()
  }
})

// Récupérer les tâches fermées
async function fetchTasks() {
  const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  tasks.value = querySnapshot.docs
    .map(doc => ({ taskId: doc.id, ...doc.data() }))
    .filter(t => t.statut === 'fermee')
}

// Réouvrir une tâche
async function reopenTask(task: any) {
  if (task.ownerId !== userId.value) return alert("Vous ne pouvez modifier que vos propres tâches")
  await updateDoc(doc(db, 'tasks', task.taskId), { statut: 'active' })
  fetchTasks()
}

// Archiver une tâche
async function archiveTask(task: any) {
  if (task.ownerId !== userId.value) return alert("Vous ne pouvez modifier que vos propres tâches")
  await updateDoc(doc(db, 'tasks', task.taskId), { statut: 'archivee' })
  fetchTasks()
}
</script>

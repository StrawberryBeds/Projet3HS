<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tâches Archivées</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="task in tasks" :key="task.taskId">
          <ion-label>
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <p>Créé par: {{ task.ownerName }}</p>
            <p>Date: {{ task.createdAt }}</p>
            <p>Statut: {{ task.statut }}</p>
          </ion-label>

          <ion-button
            v-if="isAdmin"
            color="warning"
            @click="unarchiveTask(task)"
          >
            Réactiver
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { db, auth } from '@/services/firebaseConfig'
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const tasks = ref<any[]>([])
const userId = ref<string>('')
const isAdmin = ref(false) // à configurer selon ton système admin

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userId.value = user.uid
    // Exemple pour vérifier admin :
    // isAdmin.value = user.email === "admin@exemple.com"
    fetchTasks()
  }
})

// Récupérer les tâches archivées
async function fetchTasks() {
  const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  tasks.value = querySnapshot.docs
    .map(doc => ({ taskId: doc.id, ...doc.data() }))
    .filter(t => t.statut === 'archivee')
}

// Réactiver une tâche (admin seulement)
async function unarchiveTask(task: any) {
  if (!isAdmin.value) return alert("Seul un admin peut modifier cette tâche")
  await updateDoc(doc(db, 'tasks', task.taskId), { statut: 'fermee' })
  fetchTasks()
}
</script>

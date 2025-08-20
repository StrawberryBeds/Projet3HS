<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tâches Actives</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Formulaire création tâche -->
      <ion-item>
        <ion-input v-model="newTitle" placeholder="Titre"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input v-model="newDescription" placeholder="Description"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="createTask">Créer la tâche</ion-button>

      <ion-list>
        <ion-item v-for="task in tasks" :key="task.taskId">
          <ion-label>
            <div v-if="editingTaskId !== task.taskId">
              <h2>{{ task.title }}</h2>
              <p>{{ task.description }}</p>
              <p>Créé par: {{ task.ownerName }}</p>
              <p>Status: {{ task.status }}</p>
              <p>Date: {{ task.createdAt }}</p>
            </div>

            <!-- Edition uniquement du titre et description -->
            <div v-else>
              <ion-item>
                <ion-input v-model="editTitle" placeholder="Titre"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input v-model="editDescription" placeholder="Description"></ion-input>
              </ion-item>
              <ion-button color="primary" @click="saveTask(task)">Enregistrer</ion-button>
              <ion-button color="medium" @click="cancelEdit">Annuler</ion-button>
            </div>
          </ion-label>

          <!-- Boutons uniquement pour ses propres tâches -->
          <ion-button
            v-if="task.ownerId === userId && editingTaskId !== task.taskId"
            color="secondary"
            @click="editTask(task)"
          >
            Modifier
          </ion-button>
          <ion-button
            v-if="task.ownerId === userId && task.status === 'active' && editingTaskId !== task.taskId"
            color="success"
            @click="markAsClosed(task)"
          >
            Terminer
          </ion-button>
          <ion-button
            v-if="task.ownerId === userId && editingTaskId !== task.taskId"
            color="danger"
            @click="deleteTask(task.taskId)"
          >
            Supprimer
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList, IonLabel } from '@ionic/vue'
import { db, auth } from '@/services/firebaseConfig'
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

// Données
const newTitle = ref('')
const newDescription = ref('')
const tasks = ref<any[]>([])
const userId = ref<string>('')

// Pour l'édition
const editingTaskId = ref<string | null>(null)
const editTitle = ref('')
const editDescription = ref('')

// Récupérer l'utilisateur actuel
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid
    fetchTasks()
  }
})

// Créer une tâche
async function createTask() {
  if (!newTitle.value) return alert("Le titre est obligatoire")
  
  await addDoc(collection(db, 'tasks'), {
    ownerId: userId.value,
    ownerName: auth.currentUser?.displayName || 'Utilisateur',
    title: newTitle.value,
    description: newDescription.value,
    status: 'active',
    createdAt: new Date().toISOString()
  })

  newTitle.value = ''
  newDescription.value = ''
  fetchTasks()
}

// Récupérer les tâches actives
async function fetchTasks() {
  const q = query(
    collection(db, 'tasks'),
    orderBy('createdAt', 'desc')
  )

  const querySnapshot = await getDocs(q)
  tasks.value = querySnapshot.docs
    .map(doc => ({ taskId: doc.id, ...doc.data() }))
    .filter(t => t.status === 'active') // seulement actives
}

// Modifier une tâche (titre et description seulement)
function editTask(task: any) {
  editingTaskId.value = task.taskId
  editTitle.value = task.title
  editDescription.value = task.description
}

async function saveTask(task: any) {
  await updateDoc(doc(db, 'tasks', task.taskId), {
    title: editTitle.value,
    description: editDescription.value
  })
  editingTaskId.value = null
  fetchTasks()
}

function cancelEdit() {
  editingTaskId.value = null
}

// Marquer comme fermée
async function markAsClosed(task: any) {
  if (task.ownerId !== userId.value) return alert("Vous ne pouvez modifier que vos propres tâches")
  await updateDoc(doc(db, 'tasks', task.taskId), { status: 'fermee' })
  fetchTasks()
}

// Supprimer une tâche
async function deleteTask(taskId: string) {
  await deleteDoc(doc(db, 'tasks', taskId))
  fetchTasks()
}
</script>

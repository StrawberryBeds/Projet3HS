<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Firestore Test</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Firestore Test</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-list>
          <ion-item v-for="(doc, index) in documents" :key="index">
            <ion-label>
              <h2>{{ doc.id }}</h2>
              <p>{{ JSON.stringify(doc.data) }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '@/services/firebaseConfig';

const db = getFirestore(firebaseApp);
const documents = ref<Array<{id: string, data: any}>>([]);

async function testFirestore() {
  const querySnapshot = await getDocs(collection(db, 'testCollection'));
  documents.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }));
}

onMounted(() => {
  testFirestore();
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>

import { ref, onMounted, onUnmounted } from 'vue'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { firebaseApp } from '@/services/firebaseConfig'

export function useAuth() {
  const user = ref<User | null>(null)
  const auth = getAuth(firebaseApp)

  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
    })
    onUnmounted(() => unsubscribe())
  })

  return { user }
}

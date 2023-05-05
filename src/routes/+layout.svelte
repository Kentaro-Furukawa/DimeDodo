<script>
  import { onMount } from 'svelte'
  import { auth, db } from '../lib/firebase/firebase'
  import { doc, getDoc, setDoc } from 'firebase/firestore'
  import { authStore } from '../store/store'

  const nonAuthRountes = ['/']

  onMount(() => {
    console.log('on Mounting...')
    const unsbscribe = auth.onAuthStateChanged(async user => {
      const currentPath = window.location.pathname

      if (!user && !nonAuthRountes.includes(currentPath)) { // TODO: check if it should be || or &&
        window.location.href = '/'
        return
      }

      if (user && currentPath === '/') {
        window.location.href = '/dashboard';
        return
      }

      if (!user) {
        return
      }

      let dataToSetToStore

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        const userRef = doc(db, 'user', user.uid)
        dataToSetToStore = {
            email: user.email,
            records: [],
          }
        await setDoc(userRef, dataToSetToStore, { marge: true })
      } else {
        const userData = docSnap.data()
        dataToSetToStore = userData
      }
      authStore.update(curr => {
        return {
          ...curr,
          user,
          data: dataToSetToStore,
          loading: false
        }
      })
      
    })
  })
</script>

<div class="mainContainer">
  <slot />
</div>

<style>
  .mainContainer {
    min-height: 100vh;
    background: linear-gradient(to right, #000028, #020a50);
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
  }
</style>
<script>
  import { doc, setDoc } from 'firebase/firestore';
  import { authStore } from '../../store/store';
  import { db } from '../../lib/firebase/firebase';
  import RecordItem from '../../components/RecordItem.svelte';
  import DashboardHeader from '../../components/DashboardHeader.svelte';
  import EnterRecord from '../../components/EnterRecord.svelte';

  let recordList = [];
  let newRecord = '';
  let error = false;

  authStore.subscribe((curr) => {
    recordList = curr.records;
  });

  function addRecord() {
    error = false;
    newRecord = newRecord.trim();
    if (!newRecord) {
      return (error = true);
    }
    recordList = [...recordList, newRecord];
    newRecord = '';
  }

  function editRecord(index) {
    let newRecordList = [...recordList].filter((val, i) => {
      return i != index;
    });
    newRecord = recordList[index];
    recordList = newRecordList;
  }

  function removeRecord(index) {
    let newRecordList = [...recordList].filter((val, i) => {
      return i != index;
    });
    recordList = newRecordList;
  }

  async function saveRecord() {
    try {
      const userRef = doc(db, 'users', $authStore.user.uid);
      await setDoc(userRef, { records: recordList }, { merge: true });
    } catch (err) {
      console.error('Error: error saving records.');
    }
  }
</script>

{#if !authStore.loading}
  <div class="mainContainer">
    <DashboardHeader {saveRecord} />
    <main>
      {#if recordList.length === 0 && !recordList}
        <p>You have no record.</p>
      {:else}
        {#each recordList as record, index}
          <RecordItem {index} {record} {editRecord} {removeRecord} />
        {/each}
      {/if}
    </main>
    <EnterRecord {error} {newRecord} {addRecord} />
  </div>
{/if}

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 1.5em;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    flex: 1;
    padding: 1em;
  }
</style>

<script>
  import { doc, setDoc } from 'firebase/firestore';
  import { authStore } from '../../store/store';
  import { db } from '../../lib/firebase/firebase';
  import RecordItem from '../../components/RecordItem.svelte';
  import DashboardHeader from '../../components/DashboardHeader.svelte';
  import EnterRecord from '../../components/EnterRecord.svelte';

  
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let typeOptions = [
    {id: 1, value: 'food', text: 'Food'},
    {id: 2, value: 'inBadget', text: 'In Badget'},
    {id: 3, value: 'nonBadget', text: 'Non Badget'},
  ]
  
  let recordList = [];
  
  let newRecord = {
    date: today,
    type: typeOptions.at(0),
    label: '',
    amount: 0,
  }

  let error = false;

  authStore.subscribe((curr) => {
    recordList = curr.records;
  });

  function addRecord() {
    error = false;
    newRecord.label = newRecord.label.trim();
    console.log(newRecord);
    if (!newRecord.label || !newRecord.type) {
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
    <EnterRecord {error} {typeOptions} bind:newRecord {addRecord} />
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

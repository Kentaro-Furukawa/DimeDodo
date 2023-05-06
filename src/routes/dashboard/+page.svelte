<script>
  import { doc, setDoc } from 'firebase/firestore';
  import { authStore } from '../../store/store';
  import { db } from '../../lib/firebase/firebase';
  import RecordItem from '../../components/RecordItem.svelte';
  import DashboardHeader from '../../components/DashboardHeader.svelte';
  import EnterRecord from '../../components/EnterRecord.svelte';

  const typeOptions = [
    { id: 1, value: 'food', text: 'Food' },
    { id: 2, value: 'inBadget', text: 'In Badget' },
    { id: 3, value: 'nonBadget', text: 'Non Badget' }
  ];

  class Record {
    constructor(id) {
      this[id] = {
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        recordType: typeOptions.at(0).value,
        label: 'default label',
        amount: 1000
      };
    }

    getPropertyName() {
      return Object.keys(this)[0];
    }

    get formatDate() {
      const key = this.getPropertyName();
      const day = this[key].date.getDate();
      const month = this[key].date.getMonth() + 1;
      const year = this[key].date.getFullYear();
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
        day < 10 ? '0' + day : day
      }`;
      return formattedDate;
    }

    toPlainObject() {
      const key = this.getPropertyName();
      return {
        [key]: {
          date: this[key].date,
          recordType: this[key].recordType,
          label: this[key].label,
          amount: this[key].amount
        }
      };
    }

    static fromPlainObject(plainObject) {
      const key = Object.keys(plainObject)[0];
      const record = new Record(key);
      record[key] = {
        date: plainObject[key].date.toDate
          ? plainObject[key].date.toDate()
          : new Date(plainObject[key].date),
        recordType: plainObject[key].recordType,
        label: plainObject[key].label,
        amount: plainObject[key].amount
      };
      return record;
    }
  }

  let recordList = [];

  let newRecord = new Record(crypto.randomUUID());

  let error = false;

  authStore.subscribe((curr) => {
    recordList = curr.records.map((plainRecord) => Record.fromPlainObject(plainRecord));
  });

  function addRecord(record) {
    error = false;
    // TODO: need some more validations.
    // const keyID = record.getPropertyName();
    // record[keyID].label = record[keyID].label.trim();
    // if (!record[keyID].label || !record[keyID].label.type) {
    //   return (error = true);
    // }

    // Check if a record with the same ID already exists
    const isDuplicate = recordList.some((existingRecord) =>
      existingRecord.hasOwnProperty(record.getPropertyName())
    );

    if (isDuplicate) {
      // Set error flag to true and return
      error = true;
      return;
    }

    const duplicateRecord = recordList.find((r) => r.getPropertyName() === record.getPropertyName());
  if (duplicateRecord) {
    error = true;
    return;
  }

    recordList = [...recordList, record];
    newRecord = null;
    newRecord = new Record(crypto.randomUUID());
  }

  function editRecord(id) {
    let newRecordList = [...recordList].filter((val, i) => {
      return i != index;
    });
    newRecord = recordList[index];
    recordList = newRecordList;
  }

  function removeRecord(targetKey) {
    // const filteredRecords = [...recordList].filter(record => record.getPropertyName() != id );
    const filteredRecords = recordList.filter((record) => !record.hasOwnProperty(targetKey));

    recordList = filteredRecords;
  }

  async function saveRecord() {
    try {
      const userRef = doc(db, 'users', $authStore.user.uid);
      console.log(recordList);
      const plainRecords = recordList.map((record) => record.toPlainObject());

      await setDoc(userRef, { records: plainRecords }, { merge: true });
    } catch (err) {
      console.error('Error: error saving records.', err);
    }
  }
</script>

{#if !authStore.loading}
  <div class="dashbaordContainer">
    <DashboardHeader {saveRecord} />
    <main>
      {#if recordList.length === 0 && !recordList}
        <p>You have no record.</p>
      {:else}
        {#each recordList as record (record.getPropertyName())}
          <RecordItem {record} {editRecord} {removeRecord} />
        {/each}
      {/if}
    </main>
    <EnterRecord bind:newRecord {error} {typeOptions} {addRecord} />
  </div>
{/if}

<style>
  .dashbaordContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
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

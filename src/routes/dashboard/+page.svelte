<script>
  let recordList = ['do one thing', 'do one thing', 'do one thing'];

  let newRecord = '';
  let error = false;

  function addRecord() {
    error = false;
    newRecord = newRecord.trim()
    if (!newRecord) { return (error = true) }
    recordList = [...recordList, newRecord]
    newRecord = ''
  }

  function editRecord(index) {
    let newRecordList = [...recordList].filter((val, i) => {
      return i != index;
    })
    newRecord = recordList[index]
    recordList = newRecordList
  }

  function removeRecord(index) {
    let newRecordList = [...recordList].filter((val, i) => {
      return i != index;
    })
    recordList = newRecordList
  }

</script>

<div class="mainContainer">
  <div class="headerContainer">
    <h1>My Dime Dodo</h1>
    <div class="headerButtons">
      <button>Save</button>
      <button>Logout</button>
    </div>
  </div>
  <main>
    {#if recordList.length === 0}
    <p>You have no record.</p>
    {/if}
    {#each recordList as record, index}
      <div class="record">
        {index + 1}.{record}
        <div class="action">
          <button on:click={() => editRecord(index)}>Edit</button>
          <button on:click={() => removeRecord(index)}>Remove</button>
        </div>
      </div>
    {/each}
  </main>
  <div class={"enterRecord " + (error ? "errorBorder" : "")}>
    <input bind:value={newRecord} type="text" placeholder="Enter record" />
    <button on:click={addRecord}>ADD</button>
  </div>
</div>

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

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em 0.5em;
  }

  .headerButtons {
    display: flex;
    gap: 1em;
  }

  .headerContainer button {
    background-color: rgb(23, 95, 251);
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    padding: 0.8em 1.5em;
    cursor: pointer;
  }

  .headerContainer button:hover,
  .enterRecord button:hover {
    opacity: 0.7;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    flex: 1;
    padding: 1em;
  }

  .record {
    border-left: 1px solid cyan;
    padding: .2em .5em;
    display: flex;;
    justify-content: space-between;
  }

  .record .action {
    display: flex;
    gap: 1em;
  }

  .record .action > button {
    background-color: rgb(55, 55, 255);
    color: white;
    border: none;
    border-radius: 5px;
    padding: .5em;
    cursor: pointer;
  }

  .record .action > button:hover {
    color: coral;
    opacity: .7;
  }

  .enterRecord {
    display: flex;
    align-items: stretch;
    border: 1px solid cyan;
    padding: 0.5em 1em;
  }

  .enterRecord.errorBorder {
    border-color: coral;
  }
  .enterRecord input {
    background: transparent;
    border: none;
    padding: 0.8em;
    color: white;
    flex: 1;
  }

  .enterRecord input:focus {
    /* border: none; */
    outline: none;
  }

  .enterRecord button {
    background-color: rgb(23, 95, 251);
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    padding: 0.5em 1em;
    cursor: pointer;
  }
</style>

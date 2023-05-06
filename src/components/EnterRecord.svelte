<script>
  export let error;
  export let typeOptions;
  export let newRecord;
  export let addRecord;

  let formattedDate = newRecord.formatDate
  
  let recordKey;

  $: {
    recordKey = newRecord.getPropertyName()
    newRecord[recordKey].date = parseDate(formattedDate);
  }

  function parseDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
  }

</script>

<div class={'enterRecord ' + (error ? 'errorBorder' : '')}>
  <div>
    <input type="date" bind:value={formattedDate} required />
    <select bind:value={newRecord[recordKey].recordType} required>
      {#each typeOptions as typeOption (typeOption.id)}
        <option value={typeOption.value}>
          {typeOption.text}
        </option>
      {/each}
    </select>
  </div>
  <div>
    <input bind:value={newRecord[recordKey].label} type="text" placeholder="Enter label" required />
    <input bind:value={newRecord[recordKey].amount} type="number" placeholder="Enter amount" required />
    <button on:click={addRecord(newRecord)}>ADD</button>
  </div>
</div>

<style>
  .enterRecord {
    width: 80%;
    max-width: 620px;
    align-self: center;
    display: flex;
    gap: 1em;
    flex-direction: column;
    background: rgba(0, 0, 128, 0.889);
    border: 1px solid cyan;
    border-radius: 5px;
    padding: 0.5em 1em;
    margin: 0 0 1em;
  }

  .enterRecord.errorBorder {
    border-color: coral;
  }

  .enterRecord > div:last-of-type {
    display: flex;
    gap: .5em;
    flex-direction: column;
  }

  .enterRecord select,
  .enterRecord input {
    background: rgba(31, 71, 250, 0.326);
    border: none;
    padding: 0.8em;
    color: white;
    border-radius: 5px;
  }
  
  .enterRecord input:focus {
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

  .enterRecord button:hover {
    opacity: 0.7;
  }
</style>

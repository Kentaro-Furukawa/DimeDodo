<script>
  export let error;
  export let typeOptions;
  export let newRecord;
  export let addRecord;

  let formattedDate = formatDate(newRecord.date);

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  function parseDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
  }

  $: {
    newRecord.date = parseDate(formattedDate);
  }
</script>

<div class={'enterRecord ' + (error ? 'errorBorder' : '')}>
  <div>
    <input type="date" bind:value={formattedDate} required />
    <select bind:value={newRecord.type} required>
      {#each typeOptions as type (type.id)}
        <option value={type}>
          {type.text}
        </option>
      {/each}
    </select>
  </div>
  <div>
    <input bind:value={newRecord.label} type="text" placeholder="Enter label" required />
    <input bind:value={newRecord.amount} type="number" name="amount" required />
    <button on:click={addRecord}>ADD</button>
  </div>
</div>

<style>
  .enterRecord {
    align-self: center;
    display: flex;
    gap: 1em;
    /* align-items: stretch; */
    flex-direction: column;
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

<script>
  export let error;
  export let newRecord;
  export let addRecord;
</script>

<div class={'enterRecord ' + (error ? 'errorBorder' : '')}>
  <input bind:value={newRecord} type="text" placeholder="Enter record" />
  <button on:click={addRecord}>ADD</button>
</div>

<style>
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

  .enterRecord button:hover {
    opacity: 0.7;
  }
</style>

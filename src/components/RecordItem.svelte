<script>
  export let record;
  export let editRecord;
  export let removeRecord;

  const keyID = record.getPropertyName();
</script>

<div class="record">
  <div class="recordDetails">
    {#if record[keyID].recordType === 'food'}
      <div class="recordType bgOrange">{record[keyID].recordType}</div>
    {:else if record[keyID].recordType === 'inBadget'}
      <div class="recordType bgGreen">{record[keyID].recordType}</div>
    {:else}
      <div class="recordType bgPurple">{record[keyID].recordType}</div>
    {/if}
    <!-- {record.formatDate} -->
    <div>{record[keyID].label}</div>
  </div>
  <div>{record[keyID].amount}</div>
  <div class="action">
    <!-- <button on:click={() => editRecord(keyID)}>Edit</button> -->
    <button on:click={() => removeRecord(keyID)}>Remove</button>
  </div>
</div>

<style>
  .record {
    border-left: 1px solid cyan;
    padding: 0.2em 0.5em;
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: space-between;
  }

  .recordDetails {
    flex: 1;
    display: flex;
    gap: 1em;
  }

  .recordType {
    text-transform: uppercase;
    font-size: 0.7em;
    padding: 0.2em 0.4em;
    border-radius: 5px;
  }
  .bgOrange {
    background: rgba(255, 166, 0, 0.395);
  }
  .bgGreen {
    background: rgba(16, 239, 0, 0.395);
  }
  .bgPurple {
    background: rgba(174, 0, 255, 0.395);
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
    padding: 0.5em;
    cursor: pointer;
  }

  .record .action > button:hover {
    color: coral;
    opacity: 0.7;
  }
</style>

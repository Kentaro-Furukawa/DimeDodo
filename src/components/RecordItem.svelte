<script>
export let index
export let record
export let editRecord
export let removeRecord

</script>

<div class="record">
  {index + 1}.{record}
  <div class="action">
    <button on:click={() => editRecord(index)}>Edit</button>
    <button on:click={() => removeRecord(index)}>Remove</button>
  </div>
</div>

<style>
  .record {
    border-left: 1px solid cyan;
    padding: 0.2em 0.5em;
    display: flex;
    align-items: center;
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
    padding: 0.5em;
    cursor: pointer;
  }

  .record .action > button:hover {
    color: coral;
    opacity: 0.7;
  }
</style>
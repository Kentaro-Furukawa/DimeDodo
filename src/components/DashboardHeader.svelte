<script>
  import { authHandlers } from '../store/store';

  export let saveRecord;
</script>

<div class="headerContainer">
  <h1>My Dime Dodo</h1>
  <div class="headerButtons">
    <button on:click={saveRecord}>Save</button>
    <button on:click={authHandlers.logOut}>Logout</button>
  </div>
</div>

<style>
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

  .headerContainer button:hover {
    opacity: 0.7;
  }
</style>

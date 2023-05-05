<script>
  import { authHandlers } from '../store/store';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = false;
  let register = false;
  let authenticating = false;

  async function handleAuthenticate() {
    if (authenticating) {
      return;
    }

    if (!email || !password || (register && !confirmPassword)) {
      error = true;
      retun;
    }

    if (register && !(password === confirmPassword)) {
      error = true;
      return;
    }

    authenticating = true;

    try {
      if (!register) {
        await authHandlers.logIn(email, password);
      } else {
        await authHandlers.signUp(email, password);
      }
    } catch (err) {
      console.log('Error: ', err);
      error = true;
    } finally {
      authenticating = false;
    }
  }

  function handleReginter() {
    register = !register;
    error = false;
  }
</script>

<div class="authContainer">
  <form method="" action="">
    <h1>{register ? 'Register' : 'Login'}</h1>
    {#if error}
      <p class="error">Information you have entered is not correct. 😟</p>
    {/if}
    <label for="email">
      <p class={email ? ' above' : ' center'}>Email</p>
      <input
        bind:value={email}
        type="email"
        name="email"
        id="email"
        placeholder="example@mail.com"
      />
    </label>
    <label for="password">
      <p class={password ? ' above' : ' center'}>Password</p>
      <input
        bind:value={password}
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
    </label>
    {#if register}
      <label for="confirmPassword">
        <p class={confirmPassword ? ' above' : ' center'}>Confirm Password</p>
        <input
          bind:value={confirmPassword}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
        />
      </label>
    {/if}
    <button on:click={handleAuthenticate} type="submit">
      {#if authenticating}
        <span class="spin">🧐</span>
      {:else}
        Submit
      {/if}
    </button>
  </form>
  <div class="options">
    <p>Or</p>
    {#if register}
      <div>
        <p>Already have account?</p>
        <p on:click={handleReginter} on:keydown={() => {}}>Login</p>
      </div>
    {:else}
      <div>
        <p>Don't have account?</p>
        <p on:click={handleReginter} on:keydown={() => {}}>Register</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .authContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 1em;
  }

  h1 {
    text-align: center;
    font-size: 3em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  form,
  .options {
    width: 24rem;
    max-width: 100%;
    margin: 0 auto;
  }

  form label {
    position: relative;
    border: 1px solid navy;
    border-radius: 5px;
  }

  form input {
    width: 100%;
    border: none;
    background-color: transparent;
    color: white;
    padding: 0.5em 1em;
  }

  form input:focus {
    border: none;
    outline: none;
  }

  form button[type='submit'] {
    border: none;
    background-color: rgb(20, 20, 255);
    border-radius: 5px;
    color: white;
    font-weight: bold;
    padding: 0.5em 1em;
  }

  form button[type='submit']:hover {
    background-color: rgb(45, 45, 255);
  }

  .above,
  .center {
    position: absolute;
    transform: translateY(-50%);
    pointer-events: none;
    color: white;
    border-radius: 4px;
    padding: 0.1em 0.3em;
    font-size: 0.8em;
  }

  .above {
    top: -0.3em;
    left: 1em;
    background-color: rgb(20, 20, 255);
    border: rgb(45, 45, 255);
    font-size: 0.6em;
  }

  .center {
    top: 50%;
    left: 0.3em;
    border: 1px solid transparent;
    opacity: 0;
  }

  .error {
    text-align: center;
    color: rgb(253, 203, 196);
    font-size: 0.8em;
  }

  .options {
    padding: 0.8em 0;
    overflow: hidden;
    font-size: 0.9em;
  }

  .options > p {
    position: relative;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    padding: 0.5em;
  }

  .options > p::before,
  .options > p::after {
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    width: 100vw;
    height: 1.5px;
    background-color: white;
  }

  .options > p::before {
    left: 100%;
  }

  .options > p::after {
    right: 100%;
  }

  .options div {
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }

  .options div p:last-of-type {
    color: cyan;
    cursor: pointer;
  }

  .options div p:last-of-type:hover {
    filter: hue-rotate(10deg);
  }

  .spin {
    display: inline-block;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

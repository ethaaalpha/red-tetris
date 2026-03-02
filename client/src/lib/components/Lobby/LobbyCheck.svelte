<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  import { roomState } from "$lib/state/room.svelte";

  // internal state
  let roomError = $state<string>();
  let userError = $state<string>();
  let unusualError = $state<string>();
  let redirectCountdown = $state(5);

  let errors = $derived([roomError, userError, unusualError].filter((e) => e));

  export function startCountdown(error: { room?: string; username?: string }) {
    roomError = error.room;
    userError = error.username;
    if (!userError && !roomError) unusualError = "Failed to join room";

    const interval = setInterval(() => {
      redirectCountdown--;
      if (redirectCountdown <= 0) {
        clearInterval(interval);
        goto(resolve("/"));
      }
    }, 1000);
  }
</script>

<div class="bg-dark-secondary px-8 py-4 ring-border ring">
  <div class="text-center">
    {#if errors.length > 0}
      {#if roomError}
        <p class="text-red-400 text-xl mb-2">
          <span class="font-semibold">Room:</span>
          {roomError}
        </p>
      {/if}
      {#if userError}
        <p class="text-red-400 text-xl mb-2">
          <span class="font-semibold">Username:</span>
          {userError}
        </p>
      {/if}
      {#if unusualError}
        <p class="text-red-400 text-xl mb-2">{unusualError}</p>
      {/if}
      <p>Redirecting in {redirectCountdown} second{redirectCountdown !== 1 ? "s" : ""}...</p>
    {:else}
      <p class="text-xl">Joining room "{roomState.room}" as "{roomState.username}"...</p>
    {/if}
  </div>
</div>

<script lang="ts">
  import { fade } from "svelte/transition";
  import { GamepadDirectional, RotateCcw } from "@lucide/svelte";

  import type { PieceColor } from "@app/shared";

  import Piece from "$lib/components/Piece.svelte";

  import { roomState } from "$lib/state/room.svelte";

  let {
    game,
    warmUp,
    userColor,
    userHexColor,
    startWarmUp
  }: {
    game: boolean;
    warmUp: boolean;
    userColor: PieceColor;
    userHexColor: string;
    startWarmUp: () => void;
  } = $props();
</script>

{#if !game}
  <button
    in:fade={{ duration: 200 }}
    onclick={(e) => {
      e.currentTarget.blur();
      startWarmUp();
    }}
    class="btn btn-primary px-4 py-2 text-xl absolute right-1/2 translate-x-1/2 -bottom-20 flex items-center gap-2"
  >
    {#if warmUp}
      <RotateCcw />
      restart
    {:else}
      <GamepadDirectional />
      warmup
    {/if}
  </button>
{:else}
  <span
    class="absolute right-1/2 translate-x-1/2 -bottom-12 text-nowrap flex gap-2 items-center text-lg"
  >
    <Piece color={userColor} size={20} />
    <span style="color: {userHexColor}">
      {roomState.username}
    </span>
  </span>
{/if}

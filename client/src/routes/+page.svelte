<script lang="ts">
  import Piece from "$lib/components/Piece.svelte";
  import TextInput from "$lib/components/TextInput.svelte";
  import { USERNAME_MAX_LENGTH, ROOM_NAME_MAX_LENGTH } from "$lib/constants";

  let username = $state("");
  let roomName = $state("");
</script>

<div class="flex h-dvh">
  <div class="m-auto flex flex-col">
    <h1
      class="text-7xl text-red-primary text-shadow-red-secondary text-shadow-[8px_6px_0px] text-center mb-32 relative"
    >
      RED TETRIS
      <div class="absolute top-1/2 -translate-y-1/2 -left-24">
        <Piece color="red" size={64} />
      </div>
      <div class="absolute top-1/2 -translate-y-1/2 -right-24">
        <Piece color="red" size={64} />
      </div>
    </h1>
    <div
      class="bg-dark-primary ring-2 ring-inset ring-border p-8 flex flex-col items-center relative mb-24"
    >
      <div class="space-y-4">
        <TextInput bind:value={username} maxlength={USERNAME_MAX_LENGTH} placeholder="Username" />
        <TextInput bind:value={roomName} maxlength={ROOM_NAME_MAX_LENGTH} placeholder="Room Name" />
      </div>
      <div class="pt-8 flex flex-col space-y-6 w-xs">
        <button
          class="bg-red-primary w-full px-2 py-4 text-4xl shadow-[0_6px_0_var(--color-red-secondary)]
          not-disabled:active:translate-y-1.5 not-disabled:active:shadow-none duration-75
          disabled:bg-dark-accent disabled:shadow-[0_6px_0_var(--color-dark-secondary)]"
          >JOIN GAME</button
        >
        <button
          class="hover:bg-dark-secondary w-fit mx-auto px-4 py-2 text-white/75 not-disabled:active:scale-95 duration-75 disabled:text-white/50"
          >Show existing room(s)</button
        >
      </div>
      <div class="absolute grid grid-cols-2 -left-32 top-0">
        <Piece color="yellow" size={64} />
        <Piece color="yellow" size={64} />
        <Piece color="yellow" size={64} />
        <Piece color="yellow" size={64} />
      </div>

      <div class="absolute flex -top-16 -left-16">
        <Piece color="cyan" size={64} />
        <Piece color="cyan" size={64} />
        <Piece color="cyan" size={64} />
        <Piece color="cyan" size={64} />
      </div>

      <div class="absolute -top-16 -right-16 flex">
        <div>
          <Piece color="orange" size={64} />
        </div>
        <div>
          <Piece color="orange" size={64} />
          <Piece color="orange" size={64} />
          <Piece color="orange" size={64} />
        </div>
      </div>

      <div class="absolute -bottom-16 -right-32 flex">
        <Piece color="purple" size={64} />
        <Piece color="purple" size={64} />
        <Piece color="purple" size={64} />
      </div>
      <div class="absolute bottom-0 -right-16 flex">
        <Piece color="purple" size={64} />
      </div>

      <div class="absolute -bottom-16 -left-16 flex flex-col">
        <Piece color="green" size={64} />
        <Piece color="green" size={64} />
      </div>
      <div class="absolute -bottom-32 left-0 flex flex-col">
        <Piece color="green" size={64} />
        <Piece color="green" size={64} />
      </div>
    </div>
  </div>
</div>

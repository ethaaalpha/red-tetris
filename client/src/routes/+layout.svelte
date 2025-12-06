<script lang="ts">
  import "./layout.css";
  import bgTile from "$lib/assets/empty_piece.jpg";
  import redPiece from "$lib/assets/red_piece.jpg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={redPiece} />
</svelte:head>

<div class="app text-white/90" style="background-image: url({bgTile});">
  {@render children()}
</div>

<style>
  .app {
    min-height: 100vh;
    background-repeat: repeat;
  }
</style>

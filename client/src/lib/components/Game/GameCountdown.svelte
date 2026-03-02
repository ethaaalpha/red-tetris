<script lang="ts">
  import type { Snippet } from "svelte";

  type CountdownAnimation = "go" | "pop";

  let {
    animate,
    children
  }: {
    animate?: CountdownAnimation;
    children: Snippet;
  } = $props();
</script>

<div
  class="{animate === 'go'
    ? 'countdown-go'
    : animate === 'pop'
      ? 'countdown-pop'
      : ''} absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-7xl"
>
  {@render children()}
</div>

<style>
  @keyframes countdown-pop {
    0% {
      transform: scale(2.42);
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  .countdown-pop {
    animation: countdown-pop 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes countdown-go {
    0% {
      transform: scale(2.42);
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  .countdown-go {
    animation: countdown-go 0.64s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
</style>

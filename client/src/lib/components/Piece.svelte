<script lang="ts">
  import type { Piece } from "@app/shared";
  import { pieceColors } from "@app/shared";

  let { size, color, inline = false }: Piece & { inline?: boolean } = $props();

  const pieceColor = $derived(pieceColors[color]);
  const sizeValue = $derived(typeof size === "number" ? `${size}px` : size);
  const borderWidth = $derived(
    typeof size === "number" ? `${size * 0.125}px` : `calc(${size} * 0.125)`
  );

  const style = $derived(`
		width: ${sizeValue};
		height: ${sizeValue};
		background-color: ${pieceColor.main};
		border-width: ${borderWidth};
		border-style: solid;
		border-left-color: ${pieceColor.light};
		border-top-color: ${pieceColor.light};
		border-right-color: ${pieceColor.dark};
		border-bottom-color: ${pieceColor.dark};
		box-sizing: border-box;
		${inline ? "display: inline-block; vertical-align: text-top;" : ""}
	`);
</script>

{#if inline}
  <span {style}></span>
{:else}
  <div {style}></div>
{/if}

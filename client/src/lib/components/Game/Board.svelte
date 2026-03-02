<script lang="ts">
  import type { GameData } from "@app/shared";
  import { PIECE_COLORS, PieceColor } from "@app/shared";

  import Piece from "$lib/components/Piece.svelte";

  let {
    gameData
  }: {
    gameData?: GameData;
  } = $props();

  function isShadowCell(data: GameData, rowIndex: number, cellIndex: number): boolean {
    const { blocks } = data.shadowPiece;

    for (const block of blocks) {
      if (block[0] === rowIndex && block[1] === cellIndex) {
        return true;
      }
    }
    return false;
  }
</script>

{#if gameData}
  {#each gameData.matrix as row, index_row (index_row)}
    <div class="flex">
      {#each row as cell, index_cell (index_cell)}
        {#if cell !== PieceColor.EMPTY}
          <Piece color={cell} size={32} />
        {:else if isShadowCell(gameData, index_row, index_cell)}
          <!-- Shadow piece preview -->
          <div class="relative">
            <Piece color={PieceColor.EMPTY} size={32} />
            <div
              class="absolute inset-0.5 border-2 rounded-xs opacity-75"
              style="border-color: {PIECE_COLORS[gameData.shadowPiece.color].light};"
            ></div>
          </div>
        {:else}
          <Piece color={cell} size={32} />
        {/if}
      {/each}
    </div>
  {/each}
{:else}
  {#each { length: 20 }, index_row (index_row)}
    <div class="flex">
      {#each { length: 10 }, index_cell (index_cell)}
        <Piece color={PieceColor.EMPTY} size={32} />
      {/each}
    </div>
  {/each}
{/if}

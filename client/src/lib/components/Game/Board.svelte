<script lang="ts">
  import type { GameData } from "@app/shared";
  import { BOARD_HEIGHT, BOARD_WIDTH, PIECE_COLORS, PieceColor } from "@app/shared";

  import Piece from "$lib/components/Piece.svelte";

  let {
    matrix,
    shadowPiece,
    pieceSize = 32
  }: {
    matrix?: GameData["matrix"];
    shadowPiece?: GameData["shadowPiece"];
    pieceSize?: number;
  } = $props();

  function isShadowCell(
    shadowPiece: GameData["shadowPiece"],
    rowIndex: number,
    cellIndex: number
  ): boolean {
    const { blocks } = shadowPiece;

    for (const block of blocks) {
      if (block[0] === rowIndex && block[1] === cellIndex) {
        return true;
      }
    }
    return false;
  }
</script>

{#if matrix}
  {#each matrix as row, index_row (index_row)}
    <div class="flex">
      {#each row as cell, index_cell (index_cell)}
        {#if cell !== PieceColor.EMPTY}
          <Piece color={cell} size={pieceSize} />
        {:else if shadowPiece && isShadowCell(shadowPiece, index_row, index_cell)}
          <!-- Shadow piece preview -->
          <div class="relative">
            <Piece color={PieceColor.EMPTY} size={pieceSize} />
            <div
              class="absolute inset-0.5 border-2 rounded-xs opacity-75"
              style="border-color: {PIECE_COLORS[shadowPiece.color].light};"
            ></div>
          </div>
        {:else}
          <Piece color={cell} size={pieceSize} />
        {/if}
      {/each}
    </div>
  {/each}
{:else}
  {#each { length: BOARD_HEIGHT }, index_row (index_row)}
    <div class="flex">
      {#each { length: BOARD_WIDTH }, index_cell (index_cell)}
        <Piece color={PieceColor.EMPTY} size={pieceSize} />
      {/each}
    </div>
  {/each}
{/if}

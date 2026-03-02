<script lang="ts">
  import { Send } from "@lucide/svelte";

  import type { EventMessageData } from "@app/shared";
  import { MESSAGE_MAX_LENGTH, PIECE_COLORS, REGEX_MESSAGE_SANITIZE } from "@app/shared";

  import Piece from "$lib/components/Piece.svelte";
  import TextInput from "$lib/components/TextInput.svelte";

  import { isCurrentUser } from "$lib/utils/isCurrentUser";

  let {
    messages,
    message = $bindable(""),
    messageInputFocused = $bindable(false),
    sendMessage
  }: {
    messages: Array<EventMessageData>;
    message: string;
    messageInputFocused: boolean;
    sendMessage: () => void;
  } = $props();

  let messagesContainer = $state<HTMLDivElement>();

  $effect(() => {
    if (messages.length && messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
</script>

<div
  class="bg-dark-secondary border-t border-b border-r border-border flex flex-col h-[640px] w-96"
>
  <div bind:this={messagesContainer} class="flex-1 flex flex-col overflow-y-auto py-1 gap-3">
    {#each messages as m, index (index)}
      <div class="space-y-1 flex flex-col">
        <div
          class="flex items-center gap-2
            {isCurrentUser(m.from) ? 'ml-auto pr-2' : 'pl-2'}"
          style="color: {isCurrentUser(m.from) ? PIECE_COLORS[m.color].light : ''}"
        >
          <Piece color={m.color} size={16} />
          {m.from}
        </div>

        <div
          class="p-2 wrap-break-word w-fit max-w-64 text-white text-sm
            {isCurrentUser(m.from) ? 'ml-auto' : ' bg-dark-accent'}"
          style="background-color: {isCurrentUser(m.from) ? PIECE_COLORS[m.color].dark : ''}"
        >
          {m.message}
        </div>
      </div>
    {/each}
  </div>
  <div class="h-10 border-t border-border mt-auto flex">
    <TextInput
      bind:value={message}
      bind:focused={messageInputFocused}
      maxlength={MESSAGE_MAX_LENGTH}
      placeholder="Type your message..."
      border={false}
      fontSize="sm"
      fill={true}
      outline={false}
      onEnter={sendMessage}
      regex={REGEX_MESSAGE_SANITIZE}
      bright
    />
    <button
      onclick={sendMessage}
      class="btn btn-primary w-12 flex items-center justify-center ml-auto"
      style="--btn-depth: 0px;"
    >
      <Send />
    </button>
  </div>
</div>

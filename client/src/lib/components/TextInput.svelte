<script lang="ts">
  let {
    value = $bindable(""),
    maxlength,
    placeholder = ""
  }: {
    value: string;
    maxlength: number;
    placeholder?: string;
  } = $props();

  let isFocused = $state(false);
</script>

<div class="relative w-xs">
  <input
    bind:value
    onfocus={() => (isFocused = true)}
    onblur={() => (isFocused = false)}
    class="w-full outline-red-primary focus:outline-2 py-2 px-4 pr-16 border-border border bg-dark-secondary"
    {maxlength}
    type="text"
    {placeholder}
  />
  {#if isFocused}
    <span
      class="absolute right-4 top-1/2 -translate-y-1/2 text-sm {value.length >= maxlength
        ? 'text-red-400'
        : 'text-white/50'}"
    >
      {value.length}/{maxlength}
    </span>
  {/if}
</div>

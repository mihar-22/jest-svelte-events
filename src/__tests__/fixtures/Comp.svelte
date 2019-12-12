<button on:click="{() => dispatch('e1')}">e1</button>
<button on:click="{() => dispatch('e2', 50)}">e2</button>
<button on:click="{() => dispatch('e3', 100)}">e3</button>
<button on:click="{() => dispatch('e4', { a: 1, b: 2 })}">e4</button>

<script>
  import { createEventDispatcher } from 'svelte'
  
  const dispatch = createEventDispatcher()
</script>
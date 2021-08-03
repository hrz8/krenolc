<script>
  import Tree from '../../components/editor/tree.svelte'

  const trees = [
    {
      label   : 'conversation',
      children: [
        {
          label: 'start'
        },
        {
          label: 'end'
        },
        {
          label: 'California'
        },
        {
          label: 'San Francisco'
        },
        {
          label: 'Los Angeles'
        },
        {
          label: 'Sacramento'
        }
      ]
    },
    {
      label: 'handover'
    }
  ]
</script>

<svelte:head>
  <title>Editor</title>
</svelte:head>

{#each trees as tree}
  <Tree {tree} />
{/each}

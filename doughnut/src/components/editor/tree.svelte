<script context="module">
	const _expansionState = {}
</script>
<script>
	import { slide } from 'svelte/transition'
	export let tree
	const { label, children } = tree

	let expanded = _expansionState[label] || false
	const toggleExpansion = () => {
	  expanded = _expansionState[label] = !expanded
	}
	$: arrowDown = expanded
</script>

<ul transition:slide>
	<li>
		{#if children}
			<span on:click={toggleExpansion} style="cursor: pointer;">
				<span class="arrow" class:arrowDown style="color: #a9a9a9">&#x25b6</span>
				{label}
			</span>
			{#if expanded}
				{#each children as child}
					<svelte:self tree={child} />
				{/each}
			{/if}
		{:else}
			<span style="cursor: pointer;">
				<span class="no-arrow"/>
				{label}
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem; 
		user-select: none;
	}
	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		cursor: pointer;
		display: inline-block;
		transition: transform 200ms;
	}
	.arrowDown { transform: rotate(90deg); }
</style>

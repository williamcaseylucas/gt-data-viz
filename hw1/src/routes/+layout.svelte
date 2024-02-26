<script lang="ts">
	import '../global.css';
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>CS 7450</title>
</svelte:head>

<div class="main">
	<Header />
	<slot />
</div>

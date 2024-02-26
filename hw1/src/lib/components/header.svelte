<script lang="ts">
	import logo from '$lib/images/gt_logo.png';
	import { navbar_elments } from '$lib';

	navbar_elments.forEach((el) => {
		console.log(el.toLowerCase().replace(' ', '-'));
	});
</script>

<div class="wrapper">
	<div class="navbar">
		<div class="logo">
			<a href="#syllabus">
				<img src={logo} alt="" />
			</a>
			<h6>CS 7450 - Information Visualization</h6>
		</div>

		<ul class="links">
			{#each navbar_elments as el}
				<a href={'#' + el.toLowerCase().replace(' ', '-')}>
					<li>
						{el}
					</li>
				</a>
			{/each}
		</ul>
	</div>
</div>

<style>
	.wrapper {
		position: sticky;
		top: 0;
		background: var(--gradient-7);
		z-index: 1;
	}
	.navbar {
		height: var(--nav-height);
		width: 1768px;
		/* Only for position: fixed */
		/* left: 50%;
		transform: translate(-50%, 0); */
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 25px;
		width: var(--container);
		margin-inline: auto;
		/* padding: 10px 15px; */
	}

	.navbar .logo {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.navbar .logo img {
		width: 10rem;
		background-color: #f4f4f4;
		border: 5px solid #b2a268;
		border-radius: 25px;
		margin-right: 10px;
	}

	ul.links {
		display: flex;
		gap: 1rem;
		list-style: none;
		cursor: pointer;
	}
	ul li {
		background-color: #f4f4f4;
		border: 5px solid #b2a268;
		border-radius: 25px;
		padding: 5px 15px;
		font-size: medium;
	}

	ul a {
		color: var(--stone-7);
		text-decoration: none;
	}

	ul a:hover {
		color: var(--orange-7);
	}
</style>

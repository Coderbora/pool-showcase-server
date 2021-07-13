<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div class="branding">
		<h1>Mappool Showcase Server</h1>
	</div>
	<div class="container">
		<div class="card">
			<div class="card-header">
				Welcome
			</div>
			<div class="card-body">
				<p class="card-text">Welcome to the Mappool Showcase Server! This project's aim is to create an overlay for OBS, which will help streaming mappool showcase with mappool details and replay data.</p>
				<a href="#" class="btn btn-primary">Get Started</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <individual :data="$store.state.projects[2]" />
</template>

<!-- JAVASCRIPT -->
<script>
import Individual from '~/components/Projects/Individual';
export default {

  components: {
    Individual,
  },

}
</script>
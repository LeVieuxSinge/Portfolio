<template>
  <individual :data="$store.state.projects[1]" />
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
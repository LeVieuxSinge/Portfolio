<template>
  <individual :data="$store.state.projects[4]" />
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
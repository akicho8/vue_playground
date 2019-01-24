<template lang="pug">
  router-link.navbar-item(:to="{name: name}") {{$router.resolve({name: name}).route.meta.title}}
</template>

<script>
export default {
  name: "MenuElement",
  props: [ "name", ],
}
</script>

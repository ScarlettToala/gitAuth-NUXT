<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
  <UCard>
    <div v-if="loggedIn">

      Hola {{ user?.login }}
      <UButton @click="clear"> LogOut</UButton>
    </div>
    <div v-else>
      <UButton @click="openInPopup('/auth/github')"> Login with github</UButton>
    </div>
  </UCard>
</template>
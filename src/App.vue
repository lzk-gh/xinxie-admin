<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme.ts";

const { initTheme } = useTheme();
initTheme();
</script>


<script setup lang="ts">
import { SidebarProvider, SidebarInset, SidebarTrigger } from '~/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <div class="h-4 w-px bg-border" />
        <NuxtLink to="/" class="font-semibold">
          Mini-Internet
        </NuxtLink>
      </header>

      <main class="flex-1 p-4">
        <slot />
      </main>

      <footer class="border-t">
        <div class="p-4 text-center text-sm text-muted-foreground">
          Open Educational Resource
        </div>
      </footer>
    </SidebarInset>
  </SidebarProvider>
</template>

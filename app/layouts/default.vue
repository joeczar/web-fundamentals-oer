<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold">
          Mini-Internet
        </NuxtLink>
<MainNav />
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t">
      <div class="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
        Open Educational Resource
      </div>
    </footer>
  </div>
</template>

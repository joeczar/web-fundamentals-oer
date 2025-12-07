<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu'

const { data: pages } = await useAsyncData('navigation', () =>
  queryCollection('content').all()
)

const topLevelPages = computed(() => {
  if (!pages.value) return []
  return pages.value.filter(page => {
    const pathParts = page.path.split('/').filter(Boolean)
    return pathParts.length <= 1 && page.path !== '/'
  })
})

const sections = computed(() => {
  if (!pages.value) return []

  const sectionMap = new Map<string, { name: string; path: string; pages: typeof pages.value }>()

  pages.value.forEach(page => {
    const pathParts = page.path.split('/').filter(Boolean)
    if (pathParts.length > 1) {
      const sectionSlug = pathParts[0]
      if (!sectionMap.has(sectionSlug)) {
        sectionMap.set(sectionSlug, {
          name: sectionSlug.charAt(0).toUpperCase() + sectionSlug.slice(1),
          path: `/${sectionSlug}`,
          pages: []
        })
      }
      sectionMap.get(sectionSlug)!.pages.push(page)
    }
  })

  return Array.from(sectionMap.values())
})
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NuxtLink to="/" :class="navigationMenuTriggerStyle()">
          Home
        </NuxtLink>
      </NavigationMenuItem>

      <NavigationMenuItem v-for="page in topLevelPages" :key="page.path">
        <NuxtLink :to="page.path" :class="navigationMenuTriggerStyle()">
          {{ page.title || page.path.slice(1) }}
        </NuxtLink>
      </NavigationMenuItem>

      <NavigationMenuItem v-for="section in sections" :key="section.path">
        <NavigationMenuTrigger>{{ section.name }}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
            <li v-for="page in section.pages" :key="page.path">
              <NavigationMenuLink as-child>
                <NuxtLink
                  :to="page.path"
                  class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div class="text-sm font-medium leading-none">
                    {{ page.title || page.path.split('/').pop() }}
                  </div>
                  <p v-if="page.description" class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {{ page.description }}
                  </p>
                </NuxtLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

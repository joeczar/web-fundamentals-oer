<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '~/components/ui/sidebar'
import { Home, Globe, FileText } from 'lucide-vue-next'

const { data: pages } = await useAsyncData('navigation', () =>
  queryCollection('content').all()
)

const { toggleSidebar } = useSidebar()

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

const route = useRoute()

function closeSidebarOnMobile() {
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    toggleSidebar()
  }
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/" @click="closeSidebarOnMobile">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Globe class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">Mini-Internet</span>
                <span class="text-xs text-muted-foreground">OER</span>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <!-- Main navigation -->
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child :is-active="route.path === '/'">
                <NuxtLink to="/" @click="closeSidebarOnMobile">
                  <Home class="size-4" />
                  <span>Home</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem v-for="page in topLevelPages" :key="page.path">
              <SidebarMenuButton as-child :is-active="route.path === page.path">
                <NuxtLink :to="page.path" @click="closeSidebarOnMobile">
                  <FileText class="size-4" />
                  <span>{{ page.title || page.path.slice(1) }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Section groups -->
      <SidebarGroup v-for="section in sections" :key="section.path">
        <SidebarGroupLabel>{{ section.name }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="page in section.pages" :key="page.path">
              <SidebarMenuButton as-child :is-active="route.path === page.path">
                <NuxtLink :to="page.path" @click="closeSidebarOnMobile">
                  <span>{{ page.title || page.path.split('/').pop() }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <ThemeSwitcher />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

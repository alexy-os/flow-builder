export type AppRoutes = {
  home: '/'
  flow: '/flow'
}

export type RouteParams = {
  home: undefined
  flow: { id?: string }
}

export type RoutePath = keyof AppRoutes 
import createView from '../utils/view'

export function createViewer (views) {
  const viewer = {}
  views.forEach(({ ComponentsByName,
    name,
    options
  }) => {
    viewer[`${name}ComponentsByName`] = createView(name, ComponentsByName, options)
  })
  return (state=viewer, action) => state
}

export function getViewerCategory (state, categoryName) {
  return state.viewer[`${categoryName}ComponentsByName`]
}

export function getViewerComponent (state, categoryName, name) {
  const category = getViewerCategory(state, categoryName)
  return category && category[name]
}

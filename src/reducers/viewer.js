import createView from '../utils/view'

export function createViewer (views, config) {
  const viewer = {}
  views.forEach(view => {
    const { categoryName, ComponentsByName } = view
    viewer[`${categoryName}ComponentsByName`] = createView(categoryName,
      ComponentsByName, Object.assign({}, config, view.config))
  })
  return (state=viewer, action) => state
}

export function getViewerCategory (state, categoryName) {
  return state.viewer[`${categoryName}ComponentsByName`]
}

export function getViewerComponent (state, categoryName, contentName) {
  const category = getViewerCategory(state, categoryName)
  return category && category[contentName]
}

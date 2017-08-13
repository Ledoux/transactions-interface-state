export const IS_WEB = !IS_NODE && typeof document !== 'undefined'
export const IS_NODE = process && !process.browser
export const IS_DEVELOPMENT = IS_NODE ? process.env.NODE_ENV === 'development' : /^(localhost|0\.0|192\.)/.test(window.location.hostname)
export const IS_PRODUCTION = IS_NODE ? process.env.NODE_ENV === 'production' : !IS_DEVELOPMENT
export const IS_STAGING = process.env.TYPE === 'staging'
export const BASE_NAME = IS_DEVELOPMENT ? '/' : '/'
export const IS_UNDER_CONSTRUCTION = false
export const IS_FIREFOX = typeof InstallTrigger !== 'undefined'

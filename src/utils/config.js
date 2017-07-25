export const IS_WEB = !IS_NODE && typeof document !== 'undefined'
export const IS_NODE = process && !process.browser
export const IS_DEV = IS_NODE ? process.env.NODE_ENV === 'development' : /^(localhost|0\.0|192\.)/.test(window.location.hostname)
export const IS_PROD = IS_NODE ? process.env.NODE_ENV === 'production' : !IS_DEV
export const IS_STG = process.env.TYPE === 'staging'
export const BASE_NAME = IS_DEV ? '/' : '/'
export const IS_UNDER_CONSTRUCTION = false
export const IS_FIREFOX = typeof InstallTrigger !== 'undefined'

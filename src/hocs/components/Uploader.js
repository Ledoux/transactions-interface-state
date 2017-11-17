import React, { Component } from 'react'
import { connect } from 'react-redux'

export const Uploader = WrappedComponent => {
  class _Uploader extends Component {
    constructor () {
      super()
      this.handleDropUpload = this._handleDropUpload.bind(this)
    }
    async _handleDropUpload (files) {
      // unpack
      const { fetch,
        fileName,
        IS_DEVELOPMENT,
        isOverride,
        isWithDate,
        onUpload,
        revokeObjectURL,
        uploadPath
      } = this.props
      const uploadedFile = files[0]
      // init
      const localFormData = new FormData()
      // append
      localFormData.append('uploader', uploadedFile)
      // url
      let urlFileName
      if (IS_DEVELOPMENT) {
        urlFileName = 'test'
        console.warn('Uploader in DEVELOPMENT: it is normal that you sse MY picture uploaded...')
      } else {
        urlFileName = fileName || uploadedFile.name
      }
      let url = `${uploadPath}/${urlFileName}`
      if (isWithDate) {
        const date = Date.now()
        url = `${url}-${date}`
      }
      if (isOverride) {
        url = `${url}?isOverride=true`
      }
      // fetch
      const result = await fetch(url, {
        body: localFormData,
        method: 'POST'
      })
      const json = await result.json()
      // hook
      if (onUpload) {
        onUpload(json)
      }
      revokeObjectURL(uploadedFile.preview)
    }
    render () {
      return <WrappedComponent {...this.props}
          handleDropUpload={this.handleDropUpload} />
    }
  }
  return connect(({ setup: { api: { uploadPath },
    context: { IS_DEVELOPMENT } } }) =>
    ({ IS_DEVELOPMENT, uploadPath }))(_Uploader)
}

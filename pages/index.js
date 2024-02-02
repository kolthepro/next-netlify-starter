<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scratch 3.0 is here!</title>
    <script type="text/javascript">
      window.errors = []
      if (window.addEventListener) {
        window.addEventListener(
          'error',
          function (e) {
            if (e.message) {
              if (e.error && e.error.stack) {
                if (e.message.indexOf('Uncaught SyntaxError') === 0) {
                  window.errors.push(
                    e.message +
                      ' at ' +
                      e.filename +
                      ':' +
                      e.lineno +
                      ':' +
                      e.colno
                  )
                } else {
                  window.errors.push(e.error.stack)
                }
                if (window.onNewError) window.onNewError()
              }
            } else {
              window.errors.push(
                'Problem loading ' + (e.target.src || e.target.href)
              )
              if (window.onNewError) window.onNewError()
            }
            window.onerror = null
          },
          true
        ) // true so that errors bubble up to window
        window.addEventListener(
          'unhandledrejection',
          function (e) {
            window.errors.push(
              e.reason && (e.reason.stack || e.reason.message || e.reason)
            )
            if (window.onNewError) window.onNewError()
          },
          false
        )
      }
      window.onerror = function (message, source, lineno, colno, error) {
        if (colno) {
          lineno += ':' + colno
        }
        if (error && error.stack) {
          window.errors.push(error.stack)
        } else {
          window.errors.push(message + ' at ' + source + ':' + lineno)
        }
        if (window.onNewError) window.onNewError()
      }
    </script>
     <style>
html,
body {
  height: 100%;
}
body,
::backdrop {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  font-size: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}
#wrapper {
  display: block;
  position: relative;
}
.no-cursor #wrapper {
  cursor: none;
}
.loading #wrapper {
  visibility: hidden;
}
.stretch-stage #wrapper {
  width: 100vw;
  height: 100vh;
}
/* CSS for proportional wrapper scaling is added dynamically by htmlifier.ts */
#monitors {
  position: absolute;
  top: 0;
  left: 0;
}
#stage {
  width: 100%;
  height: 100%;
}
#loading-progress {
  display: none;
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  border-radius: 20px;
  --progress: 0%;
  z-index: 100;
}
.show-loading-progress #loading-progress {
  display: block;
}
#loading-progress::before {
  content: attr(data-progress);
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 15px;
}
#loading-progress::after {
  content: '';
  display: block;
  height: 16px;
  border-radius: 20px;
  width: var(--progress);
}
#loading-image {
  position: fixed;
  max-width: 100%;
  max-height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.stretch-loading-image #loading-image {
  width: 100%;
  height: 100%;
}
.buttons {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 12px;
}
.buttons .button,
.buttons button {
  display: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px;
}
.buttons button:disabled,
#add-sprite-file:disabled + #add-sprite-btn {
  cursor: auto;
  opacity: 0.5;
}
#start-btn {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"%3E%3Cpath d="M8 5v14l11-7z" fill="%23fff"/%3E%3C/svg%3E%0A');
}
.running #start-btn {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"%3E%3Cpath d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="%23fff"/%3E%3C/svg%3E');
}
#stop-btn {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"%3E%3Cpath d="M6 6h12v12H6z" fill="%23fff"/%3E%3C/svg%3E%0A');
}
#fullscreen-btn {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Cpath d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4H10v10zm24 14h-6v4h10V28h-4v6zm-6-24v4h6v6h4V10H28z" fill="%23fff"/%3E%3C/svg%3E');
}
.fullscreen #fullscreen-btn {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Cpath d="M10 32h6v6h4V28H10v4zm6-16h-6v4h10V10h-4v6zm12 22h4v-6h6v-4H28v10zm4-22v-6h-4v10h10v-4h-6z" fill="%23fff"/%3E%3C/svg%3E');
}
#download-btn {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z'/%3E%3C/svg%3E");
}
#add-sprite-btn {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'/%3E%3C/svg%3E");
}
#add-sprite-file {
  display: none;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.show-start-stop-btns #start-btn,
.show-start-stop-btns #stop-btn,
.show-fullscreen-btn #fullscreen-btn,
.show-download-btn #download-btn,
.show-add-sprite-btn #add-sprite-btn,
.show-add-sprite-btn #add-sprite-file {
  display: inline-block;
}
.monitor {
  position: absolute;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  overflow: hidden;
  padding: 3px;
  white-space: pre;
}
.show-monitor-box .monitor {
  border-color: rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.3);
}
.monitor-label {
  margin: 0 5px;
  font-weight: bold;
}
.monitor-value {
  display: inline-block;
  vertical-align: top;
  min-width: 34px;
  text-align: center;
  border-radius: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: text;
  transform: translateZ(0);
}
.default .monitor-value,
.slider .monitor-value {
  margin: 0 5px;
  padding: 1px 3px;
}
.show-monitor-box .default .monitor-value,
.show-monitor-box .slider .monitor-value {
  background-color: rgba(0, 0, 0, 0.5);
}
.large {
  padding: 0.1rem 0.25rem;
  min-width: 3rem;
}
.show-monitor-box .large {
  background-color: rgba(0, 0, 0, 0.6);
}
.large .monitor-label {
  display: none;
}
.large .monitor-value {
  font-size: 1rem;
  width: 100%;
}
.list {
  padding: 0;
  overflow: auto;
  overflow-x: hidden;
}
.list .monitor-label {
  text-align: center;
  padding: 3px;
  width: 100%;
  display: block;
  margin: 0;
  box-sizing: border-box;
  white-space: pre-wrap;
}
.list .monitor-value {
  display: block;
}
.row {
  display: flex;
  align-items: center;
  padding: 2px;
  height: 24px;
  box-sizing: border-box;
  transform: translateZ(0);
}
.index {
  font-weight: bold;
  margin: 0 3px;
  flex: none;
}
.row-value {
  flex: auto;
  margin: 0 3px;
  text-align: left;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  height: 22px;
  padding: 3px 5px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
}
.show-monitor-box .row-value {
  border-color: rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.5);
}
.slider input {
  display: block;
  width: 100%;
  transform: translateZ(0);
}
#asking-box {
  display: none;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(33, 33, 33, 0.7);
}
.asking #asking-box {
  display: block;
}
#question {
  display: block;
  margin: 0 10px;
  margin-top: 10px;
  font-size: 12px;
  color: white;
}
#answer {
  border: none;
  background: none;
  width: 100%;
  font: inherit;
  font-size: 16px;
  color: white;
  padding: 10px;
  box-sizing: border-box;
}
#answer:focus {
  outline: none;
}
#errors {
  -webkit-appearance: none;
  border: none;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: none;
}

</style> <style>
#wrapper { width: 100vw; height: 75vw; }
@media (min-aspect-ratio: 480/360) {
#wrapper { height: 100vh; width: 133.33333333333331vh; }
}
#loading-progress {
border: 1px solid #00ffff;
}
#loading-progress::before {
color: #00ffff;
}
#loading-progress::after {
background-color: #00ffff;
}
.monitor {
color: #ffffff;
}
</style>
  </head>
  <body class="loading show-loading-progress show-fullscreen-btn show-monitor-box">
    <div id="wrapper">
      <canvas id="stage"></canvas>
      <div id="monitors"></div>
      <div id="asking-box">
        <label id="question" for="answer">Question</label>
        <input type="text" id="answer" />
      </div>
    </div>
    <div id="loading-progress" data-progress="0%"></div>
     
    <div class="buttons">
      <!--
        Only support sprite files (no images) for now. See
        https://github.com/SheepTester/htmlifier/issues/67#issuecomment-894746718
      -->
      <input
        type="file"
        id="add-sprite-file"
        accept=".sprite2, .sprite3"
        aria-label="Select a Scratch sprite to add"
        multiple
      />
      <label
        class="button"
        id="add-sprite-btn"
        for="add-sprite-file"
        title="Add Scratch sprite to project"
      ></label>
      <button id="download-btn" aria-label="Download Scratch project"></button>
      <button id="start-btn" aria-label="Start"></button>
      <button id="stop-btn" aria-label="Stop" disabled></button>
      <button id="fullscreen-btn" aria-label="Enter/exit fullscreen"></button>
    </div>
    <textarea id="errors" readonly></textarea>
    <script src="./vm.js"></script> <script>
const noop = () => null

window.Scratch = {
  get vm () {
    return window.vm
  },
  get renderer () {
    return window.vm.runtime.renderer
  },
  get audioEngine () {
    return window.vm.runtime.audioEngine
  },
  get bitmapAdapter () {
    return window.vm.runtime.v2BitmapAdapter
  },
  get videoProvider () {
    return window.vm.runtime.ioDevices.video.provider
  }
}

const CLOUD_PREFIX = '\u2601 '
window.setCloud = (name, value) => {
  vm.postIOData('cloud', {
    varUpdate: {
      name: CLOUD_PREFIX + name,
      value
    }
  })
}
function postError (err) {
  setCloud('eval error', err.toString())
}

class CloudProvider {
  constructor (options) {
    this._serverUrl = options.cloud.serverUrl
    this._specialBehaviours = options.cloud.specialBehaviours
    this._options = options

    this._ws = null

    this.createVariable = noop
    this.renameVariable = noop
    this.deleteVariable = noop

    this._handleMessage = event => {
      event.data.split('\n').forEach(message => {
        if (message) {
          const { name, value } = JSON.parse(message)
          vm.postIOData('cloud', {
            varUpdate: { name, value }
          })
        }
      })
    }
    this._handleOpen = () => {
      this._sendData({ method: 'handshake' })
    }
    this._handleClose = () => {
      setTimeout(() => this._openConnection(), 500)
    }

    this.handleUrlChange = () => {
      setCloud('url', window.location.href)
    }
    if (this._specialBehaviours) {
      window.addEventListener('hashchange', this.handleUrlChange)
      window.addEventListener('popstate', this.handleUrlChange)
      // Paste output
      window.addEventListener('paste', event => {
        setCloud(
          'pasted',
          (event.clipboardData || window.clipboardData).getData('text')
        )
      })
    }

    if (this._serverUrl) {
      this._openConnection()
    }
  }

  _openConnection () {
    try {
      this._ws = new WebSocket(this._serverUrl)
    } catch (error) {
      console.warn(error)
      return
    }
    this._ws.onmessage = this._handleMessage
    this._ws.onopen = this._handleOpen
    this._ws.onclose = this._handleClose
  }

  _sendData (data) {
    data.user = this._options.username
    data.project_id = this._options.cloud.projectId
    this._ws.send(JSON.stringify(data) + '\n')
  }

  updateVariable (name, value) {
    if (this._specialBehaviours) {
      let matched = true
      if (name === CLOUD_PREFIX + 'eval') {
        try {
          Promise.resolve(eval(value))
            .then(output => {
              setCloud('eval output', output)
            })
            .catch(postError)
        } catch (error) {
          postError(error)
        }
      } else if (name === CLOUD_PREFIX + 'open link') {
        try {
          window.open(value, '_blank')
        } catch (error) {
          postError(error)
        }
      } else if (name === CLOUD_PREFIX + 'redirect') {
        window.location = value
      } else if (name === CLOUD_PREFIX + 'set clipboard') {
        try {
          navigator.clipboard.writeText(value).catch(postError)
        } catch (error) {
          postError(error)
        }
      } else if (name === CLOUD_PREFIX + 'set server ip') {
        this._cloudHost = value
        if (this._ws) {
          this._ws.onclose = noop
          this._ws.close()
        }
        this._openConnection()
      } else if (name === CLOUD_PREFIX + 'username') {
        this._options.username = value
        vm.postIOData('userData', { username: value })
      } else {
        matched = false
      }
      if (matched) {
        return
      }
    }
    if (
      !this._serverUrl ||
      (this._specialBehaviours &&
        name.startsWith(CLOUD_PREFIX + 'local storage'))
    ) {
      try {
        localStorage.setItem('[s3] ' + name, value)
      } catch (error) {
        postError(error)
      }
    } else {
      this._sendData({ method: 'set', name, value })
    }
  }

  requestCloseConnection () {
    if (
      this._ws &&
      this._ws.readyState !== WebSocket.CLOSING &&
      this._ws.readyState !== WebSocket.CLOSED
    ) {
      this._ws.onclose = noop
      this._ws.close()
    }
  }
}

// Based on
// https://github.com/LLK/scratch-gui/blob/7b658c60c7c04055e575601a861195fe6c9933f3/src/lib/video/camera.js
// https://github.com/LLK/scratch-gui/blob/7b658c60c7c04055e575601a861195fe6c9933f3/src/lib/video/video-provider.js
class VideoProvider {
  constructor (width, height) {
    this._dimensions = [width, height]
    this.mirror = true
    this._frameCacheTimeout = 16
    this._video = null
    this._track = null
    this._workspace = []
  }

  get video () {
    return this._video
  }

  enableVideo () {
    this.enabled = true
    return this._setupVideo()
  }

  disableVideo () {
    this.enabled = false
    if (this._singleSetup) {
      this._singleSetup
        .then(this._teardown.bind(this))
        .catch(err => this.onError(err))
    }
  }

  _teardown () {
    if (this.enabled === false) {
      requestStack.pop()
      const disableTrack = requestStack.length === 0
      this._singleSetup = null
      this._video = null
      if (this._track && disableTrack) {
        this._track.stop()
      }
      this._track = null
    }
  }

  getFrame ({
    dimensions = this._dimensions,
    mirror = this.mirror,
    format = 'image-data',
    cacheTimeout = this._frameCacheTimeout
  }) {
    if (!this.videoReady) {
      return null
    }
    const [width, height] = dimensions
    const workspace = this._getWorkspace({
      dimensions,
      mirror: Boolean(mirror)
    })
    const { videoWidth, videoHeight } = this._video
    const { canvas, context, lastUpdate, cacheData } = workspace
    const now = Date.now()

    if (lastUpdate + cacheTimeout < now) {
      if (mirror) {
        context.scale(-1, 1)
        context.translate(width * -1, 0)
      }

      context.drawImage(
        this._video,
        0,
        0,
        videoWidth,
        videoHeight,
        0,
        0,
        width,
        height
      )

      context.setTransform(1, 0, 0, 1, 0, 0)
      workspace.lastUpdate = now
    }

    if (!cacheData[format]) {
      cacheData[format] = { lastUpdate: 0 }
    }
    const formatCache = cacheData[format]

    if (formatCache.lastUpdate + cacheTimeout < now) {
      if (format === 'image-data') {
        formatCache.lastData = context.getImageData(0, 0, width, height)
      } else if (format === 'canvas') {
        formatCache.lastUpdate = Infinity
        formatCache.lastData = canvas
      } else {
        console.error(`video io error - unimplemented format ${format}`)
        formatCache.lastUpdate = Infinity
        formatCache.lastData = null
      }

      formatCache.lastUpdate = Math.max(
        workspace.lastUpdate,
        formatCache.lastUpdate
      )
    }

    return formatCache.lastData
  }

  onError (error) {
    console.error('Unhandled video io device error', error)
  }

  _setupVideo () {
    if (this._singleSetup) {
      return this._singleSetup
    }

    if (requestStack.length === 0) {
      this._singleSetup = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { min: width, ideal: (480 * width) / height },
          height: { min: height, ideal: 480 }
        }
      })
      requestStack.push(streamPromise)
    } else if (requestStack.length > 0) {
      this._singleSetup = requestStack[0]
      requestStack.push(true)
    }
    this._singleSetup
      .then(stream => {
        this._video = document.createElement('video')

        try {
          this._video.srcObject = stream
        } catch (_error) {
          this._video.src = window.URL.createObjectURL(stream)
        }
        this._video.play()
        this._track = stream.getTracks()[0]
        return this
      })
      .catch(error => {
        this._singleSetup = null
        this.onError(error)
      })

    return this._singleSetup
  }

  get videoReady () {
    if (!this.enabled || !this._video || !this._track) {
      return false
    }
    const { videoWidth, videoHeight } = this._video
    return (
      typeof videoWidth === 'number' &&
      typeof videoHeight === 'number' &&
      videoWidth > 0 &&
      videoHeight > 0
    )
  }

  _getWorkspace ({ dimensions, mirror }) {
    let workspace = this._workspace.find(
      space =>
        space.dimensions.join('-') === dimensions.join('-') &&
        space.mirror === mirror
    )
    if (!workspace) {
      workspace = {
        dimensions,
        mirror,
        canvas: document.createElement('canvas'),
        lastUpdate: 0,
        cacheData: {}
      }
      workspace.canvas.width = dimensions[0]
      workspace.canvas.height = dimensions[1]
      workspace.context = workspace.canvas.getContext('2d')
      this._workspace.push(workspace)
    }
    return workspace
  }
}

const fullscreenBtn = document.getElementById('fullscreen-btn')
const exitFullscreen =
  document.exitFullscreen ||
  document.msExitFullscreen ||
  document.mozCancelFullScreen ||
  document.webkitExitFullscreen
const requestFullscreen =
  document.body.requestFullscreen ||
  document.body.msRequestFullscreen ||
  document.body.mozRequestFullScreen ||
  document.body.webkitRequestFullscreen
function isFullscreen () {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  )
}
function toggleFullscreen () {
  if (isFullscreen()) {
    exitFullscreen.call(document)
  } else {
    requestFullscreen.call(document.body)
  }
}
fullscreenBtn.addE

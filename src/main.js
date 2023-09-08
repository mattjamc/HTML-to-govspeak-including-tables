import htmlToGovspeak from './html-to-govspeak'
import insertTextAtCursor from 'insert-text-at-cursor'
import legacyHtmlFromPaste from './legacy-html-from-paste'

function htmlFromPasteEvent (event) {
  // Modern browsers
  if (event.clipboardData) {
    console.log('We got this from the clipboard:')
    console.log(event.clipboardData.getData('text/html'))
    return event.clipboardData.getData('text/html')
  } else {
    // IE doesn't support event.clipboardData, whereas it's supported by most
    // other major browsers
    console.log('Doing the legacy way - clipboardData not supported')
    return legacyHtmlFromPaste()
  }
}

function textFromPasteEvent (event) {
  if (event.clipboardData) {
    return event.clipboardData.getData('text/plain')
  } else if (window.clipboardData) {
    return window.clipboardData.getData('Text')
  }
}

function triggerPasteEvent (element, eventName, detail) {
  const params = { bubbles: false, cancelable: false, detail: detail || null }
  let event

  if (typeof window.CustomEvent === 'function') {
    event = new window.CustomEvent(eventName, params)
  } else {
    event = document.createEvent('CustomEvent')
    event.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail)
  }

  element.dispatchEvent(event)
}

function pasteListener (event) {
  const element = event.target

  const html = htmlFromPasteEvent(event)
  console.log(html)
  triggerPasteEvent(element, 'htmlpaste', html)

  const text = textFromPasteEvent(event)
  triggerPasteEvent(element, 'textpaste', text)

  if (html && html.length) {
    const govspeak = htmlToGovspeak(html)
    triggerPasteEvent(element, 'govspeak', govspeak)

    insertTextAtCursor(element, govspeak)
    event.preventDefault()
  }
}

export { pasteListener, htmlToGovspeak }

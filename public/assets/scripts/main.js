import formGenerator from './formGenerator.js'
import formController from './formController.js'

const $ = selector => {
  const element = document.querySelectorAll(selector)
  return element.length > 1 ? element : element[0]
}

const startListeners = () => {
  $('[data-form-field]').forEach(el => el.addEventListener('blur', formController.validateField))
  $('[data-form-button]').addEventListener('click', formController.validateFields)
}

window.document.onload = formGenerator.generateForm()

document.addEventListener('form.ready', startListeners)

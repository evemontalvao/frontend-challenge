import config from './config.js'

const formReady = new Event('form.ready')

const switchcase = cases => defaultCase => key => cases.hasOwnProperty(key.type) ? cases[key.type](key) : defaultCase(key)

const isRequired = field => field.required ? '<span class="Form_required-span">Este campo é requerido</span>' : ''

const getInput = attrs => (
  `<input type='${attrs.type}' data-form-field class='Form_input' placeholder='${attrs.placeholder}' required='${attrs.required}' />`
)

const getTextarea = attrs => (
  `<textarea data-form-field class='Form_input' placeholder='${attrs.placeholder}'></textarea>`
)

const getSelect = (attrs) => {
  const { values } = attrs

  const selected = attrs.mask ? `<option selected disabled value='invalid'>${attrs.mask}</option>` : ''

  const options = Object.keys(values).map(opt => (
    `<option value='${values[opt]}'>${opt}</option>`
  ))

  return `<select data-form-field class='Form_input' required='${attrs.required}'>${selected + options}</select>`
}

const getLabelAndWrapper = (element, field) => (
  `<fieldset class='Form_fieldset'><label class='Form_label'>${field.label}</label>${element}${isRequired(field)}</fieldset>`
)

const handleField = field => {
  const switchOptions = {
    enumerable: getSelect,
    small_text: getInput,
    big_text: getTextarea
  }

  const defaultCase = getInput

  let element = switchcase(switchOptions)(defaultCase)(field)
  element = getLabelAndWrapper(element, field)
  return element
}

const getAndAppendElements = (field, i) => (
  document.querySelector(`[data-step='${i}']`)
    .insertAdjacentHTML('beforeend', handleField(field))
)

const getStepButtons = (step, i) => {
  const isActive = i => i === 0 ? 'Step_button--active' : ''
  return `<div class='Step_button ${isActive(i)}' data-step-button='${i}'>${step}</div>`
}

const generateForm = async () => {
  try {
    const response = await fetch(config.fieldsUri)
    const { _embedded } = await response.json()
    Object.keys(_embedded).map((step, i) => {
      _embedded[step].map(field => getAndAppendElements(field, i))
      document.dispatchEvent(formReady)
    })
  } catch (err) {
    console.log(err)
  }
}

export default {
  generateForm,
  getStepButtons,
  getAndAppendElements,
  handleField,
  getLabelAndWrapper,
  getSelect,
  getTextarea,
  getInput,
  switchcase,
  isRequired
}

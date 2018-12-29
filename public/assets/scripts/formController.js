const $ = selector => {
  const element = document.querySelectorAll(selector)
  return element.length > 1 ? element : element[0]
}

const validateField = event => {
  const field = event.target
  const parentIsActive = field.closest('.Form_step--active')
  const isRequired = JSON.parse(field.getAttribute('required'))
  const isInvalid = field.value === 'invalid' || !field.value.length

  if (!isRequired || !parentIsActive) return true

  if (!isInvalid) {
    toggleClass(field, 'Form_input--required', 'remove')
    toggleClass(field.nextSibling, 'Form_required-span--active', 'remove')
    return true
  }

  toggleClass(field, 'Form_input--required', 'add')
  toggleClass(field.nextSibling, 'Form_required-span--active', 'add')
  return false
}

const stepControl = value => {
  const stepsLength = $('.Form_step').length
  const currentStep = $('.Form_step--active').getAttribute('data-step')
  const nextStep = parseInt(currentStep) + value
  const isGreaterThanCurrentStep = (nextStep) > (stepsLength - 1)
  if (isGreaterThanCurrentStep) return

  toggleClass($(`[data-step='${currentStep}']`), 'Form_step--active', 'remove')
  toggleClass($(`[data-step='${nextStep}']`), 'Form_step--active', 'add')
  toggleClass($(`[data-step-button='${currentStep}']`), 'Step_button--active', 'remove')
  toggleClass($(`[data-step-button='${nextStep}']`), 'Step_button--active', 'add')
}

const validateFields = event => {
  const fields = $('[data-form-field]')
  let isValid = []

  fields.forEach(field => {
    isValid.push(validateField({ target: field }))
  })

  if (!isValid.includes(false)) stepControl(1)
}

const toggleClass = (element, className, action) => {
  const hasClass = element.classList.contains(className)

  if (hasClass) {
    return element.classList[action](className)
  }

  return element.classList[action](className)
}

export default {
  validateField,
  validateFields,
  stepControl,
  toggleClass,
  $
}

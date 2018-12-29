/* eslint-env jest */

import formController from './formController.js'

describe('$ should:', () => {
  test('work like jQuery selector, returning a Nodelist', () => {
    document.body.innerHTML = `<div data-step='0'></div><div data-step='1'></div>`

    const expected = document.querySelectorAll('[data-step]')
    expect(formController.$('[data-step]')).toBe(expected)
  })

  test('work like jQuery selector, but return a single Node if only one element is found', () => {
    document.body.innerHTML = `<div data-step="0"></div>`
    const expected = document.querySelector('[data-step]')
    expect(formController.$('[data-step]')).toBe(expected)
  })
})

describe('toggleClass should:', () => {
  test('Add class from given element', () => {
    document.body.innerHTML = `<div data-step="0"></div>`
    const element = document.querySelector('[data-step]')
    const classList = element.classList
    formController.toggleClass(element, 'addClass', 'add')
    expect(classList).toContain('addClass')
  })

  test('Remove class from given element', () => {
    document.body.innerHTML = `<div class='removeClass' data-step="0"></div>`
    const element = document.querySelector('[data-step]')
    const classList = element.classList
    formController.toggleClass(element, 'removeClass', 'remove')
    expect(classList).not.toContain('removeClass')
  })
})

describe.skip('validateField should:', () => {
  test('return true if field is valid', () => {
    document.body.innerHTML = `<div class="Form_step--active data-step="0"><input value="Value"/></div>`
    const parentIsActive = true

    expect(formController.validateField(event)).toBeTruthy()
  })
})

describe('stepControl should:', () => {
  test('activate next step', () => {
    document.body.innerHTML = `<div id="form"><div class="Form_step Form_step--active" data-step="0"></div><div class="Form_step" data-step="1"></div></div><input type="button" data-form-button class="Form_button" value="Buscar Profissionais"></div><div class="Step_buttons"><div class="Step_button Step_button--active" data-step-button="0">1. Seu pedido</div><div class="Step_button"  data-step-button="1">2. Seus dados</div></div>`

    const $ = formController.$
    const step = num => document.querySelector(`[data-step="${num}"]`)
    const buttonStep = num => document.querySelector(`[data-step-button="${num}"]`)
    formController.stepControl(+1)
    expect(step(1).classList).toContain('Form_step--active')
    expect(buttonStep(1).classList).toContain('Step_button--active')
    expect(step(0).classList).not.toContain('Form_step--active')
    expect(buttonStep(0).classList).not.toContain('Step_button--active')
  })
})

/* eslint-env jest */

import formGenerator from './formGenerator.js'

describe('generateForm should:', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('call fields api and retrieve a JSON', () => {
    fetch.mockResponseOnce(JSON.stringify({ fields: ['field1', 'field2'] }))
    formGenerator.generateForm()
    expect(fetch).toHaveBeenCalledWith('http://localhost:2107/api/fields')
  })
})

describe('getStepButtons should:', () => {
  test('return step button element', () => {
    const expected = '<div class=\'Step_button \' data-step-button=\'1\'>Texto do botão</div>'
    expect(formGenerator.getStepButtons('Texto do botão', 1)).toBe(expected)
  })

  test('return active step button element', () => {
    const expected = '<div class=\'Step_button Step_button--active\' data-step-button=\'0\'>Texto do botão</div>'
    expect(formGenerator.getStepButtons('Texto do botão', 0)).toBe(expected)
  })
})

describe('getAndAppendElements should:', () => {
  test('should insert html into DOM', () => {
    const handleField = jest.fn(() => (
      `<fieldset class='Form_fieldset'><label class='Form_label'>Informações Adicionais</label><textarea data-form-field class='Form_input' placeholder='Descreva o que você precisa'></textarea></fieldset>`
    ))

    const field = {
      'name': 'Informações Adicionais',
      'label': 'Informações Adicionais',
      'type': 'big_text',
      'placeholder': 'Descreva o que você precisa',
      'required': false
    }

    const expected = `<fieldset class=\"Form_fieldset\"><label class=\"Form_label\">Informações Adicionais</label><textarea data-form-field=\"\" class=\"Form_input\" placeholder=\"Descreva o que você precisa\"></textarea></fieldset>`

    document.body.innerHTML = `<div data-step='0'></div>`

    formGenerator.getAndAppendElements(field, 0)

    expect(document.querySelector('[data-step="0"]').innerHTML).toBe(expected)
  })
})

describe('handleField should:', () => {
  test('return filled element', () => {
    const switchcase = formGenerator.switchcase
    const getLabelAndWrapper = formGenerator.getLabelAndWrapper
    const expected = `<fieldset class='Form_fieldset'><label class='Form_label'>Informações Adicionais</label><textarea data-form-field class='Form_input' placeholder='Descreva o que você precisa'></textarea></fieldset>`

    const field = {
      'name': 'Informações Adicionais',
      'label': 'Informações Adicionais',
      'type': 'big_text',
      'placeholder': 'Descreva o que você precisa',
      'required': false
    }

    expect(formGenerator.handleField(field)).toBe(expected)
  })
})

describe('getLabelAndWrapper should:', () => {
  test('return filled label and wrapper containing current element', () => {
    const expected = `<fieldset class='Form_fieldset'><label class='Form_label'>Informações Adicionais</label><textarea data-form-field class='Form_input' placeholder='Descreva o que você precisa'></textarea></fieldset>`
    const element = `<textarea data-form-field class='Form_input' placeholder='Descreva o que você precisa'></textarea>`
    const field = {
      'name': 'Informações Adicionais',
      'label': 'Informações Adicionais',
      'type': 'big_text',
      'placeholder': 'Descreva o que você precisa',
      'required': false
    }

    expect(formGenerator.getLabelAndWrapper(element, field)).toBe(expected)
  })
})

describe('getSelect should:', () => {
  test('return select and options', () => {
    const expected = `<select data-form-field class='Form_input' required='false'><option selected disabled value='invalid'>indique o número de pessoas</option><option value='1'>1</option>,<option value='2'>2</option>,<option value='Mais de 3'>Mais de 3</option></select>`
    const field = {
      'name': 'O serviço será para quantas pessoas?',
      'label': 'O serviço será para quantas pessoas?',
      'placeholder': 'O serviço será para quantas pessoas?',
      'mask': 'indique o número de pessoas',
      'type': 'enumerable',
      'required': false,
      'values': {
        '1': '1',
        '2': '2',
        'Mais de 3': 'Mais de 3'
      }
    }

    expect(formGenerator.getSelect(field)).toBe(expected)
  })
})

describe('getTextarea should:', () => {
  test('return textarea', () => {
    const expected = `<textarea data-form-field class='Form_input' placeholder='Descreva o que você precisa'></textarea>`
    const field = {
      'name': 'Informações Adicionais',
      'label': 'Informações Adicionais',
      'type': 'big_text',
      'placeholder': 'Descreva o que você precisa',
      'required': false
    }

    expect(formGenerator.getTextarea(field)).toBe(expected)
  })
})

describe('getInput should:', () => {
  test('return input', () => {
    const expected = `<input type='cep' data-form-field class='Form_input' placeholder='' required='true' />`
    const field = {
      'name': 'cep',
      'label': 'CEP',
      'type': 'cep',
      'placeholder': '',
      'required': true
    }

    expect(formGenerator.getInput(field)).toBe(expected)
  })
})

describe('isRequired should:', () => {
  test('check if current field is required, if so, return a span', () => {
    const field = {
      'name': 'cep',
      'label': 'CEP',
      'type': 'cep',
      'placeholder': '',
      'required': true
    }

    const expected = '<span class="Form_required-span">Este campo é requerido</span>'

    expect(formGenerator.isRequired(field)).toBe(expected)
  })

  test('check if current field is required, if isn\'t, return a empty string', () => {
    const field = {
      'name': 'cep',
      'label': 'CEP',
      'type': 'cep',
      'placeholder': '',
      'required': false
    }

    expect(formGenerator.isRequired(field)).toBe('')
  })
})

describe('switchcase should:', () => {
  test('behave like a default switch/case passing through each option until find a truthy one', () => {
    const field = {
      'name': 'Informações Adicionais',
      'label': 'Informações Adicionais',
      'type': 'big_text',
      'placeholder': 'Descreva o que você precisa',
      'required': false
    }

    const mockFn = jest.fn(() => {})
    const defaultCase = mockFn
    const switchOptions = {
      enumerable: mockFn
    }

    formGenerator.switchcase(switchOptions)(defaultCase)(field)

    expect(mockFn).toHaveBeenCalledWith(field)
  })

  test('call default option if no truthy option is found', () => {
    const field = {
      'name': 'cep',
      'label': 'CEP',
      'type': 'cep',
      'placeholder': '',
      'required': false
    }

    const mockFn = jest.fn()
    const defaultCase = mockFn

    const switchOptions = {
      enumerable: mockFn
    }

    formGenerator.switchcase(switchOptions)(defaultCase)(field)

    expect(defaultCase).toHaveBeenCalledWith(field)
  })
})

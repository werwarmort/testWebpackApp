import {classNames} from "./classNames";


describe('classNames', () => {
  test('test', () => {
    const expected = 'someClass someClass1 someClass2'
    expect(classNames('someClass',{}, ['someClass1', 'someClass2'])).toBe(expected);
  })

  test('with mods', () => {
    const expected = 'someClass someClass1 someClass2 hovered scrollable'
    expect(classNames('someClass',{hovered: true, scrollable: true}, ['someClass1', 'someClass2'])).toBe(expected);
  })

  test('with false mode', () => {
    const expected = 'someClass someClass1 someClass2 hovered'
    expect(classNames('someClass',{hovered: true, scrollable: false}, ['someClass1', 'someClass2'])).toBe(expected);
  })

  test('with undefined mode', () => {
    const expected = 'someClass someClass1 someClass2 hovered'
    expect(classNames('someClass',{hovered: true, scrollable: undefined}, ['someClass1', 'someClass2'])).toBe(expected);
  })
})
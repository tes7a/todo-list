import {mult, sum, div, sub, multiTasker} from "./Tasks";

test('sum of number', () =>{
    const a = 10;
    const b = 33;

    const result = sum(a,b)

    expect(result).toBe(43)
})

test('mult of number', () =>{
    const result = mult(5,5)

    expect(result).toBe(25)
})

test('div of number', () =>{

    const result = div(6,3)

    expect(result).toBe(2)
})

test('sub of number', () =>{
    expect(sub(10,5)).toBe(5)
})

test('multiTasker func sum', () =>{
    expect(multiTasker(5, {type: "sum", number: 5})).toBe(10)
    expect(multiTasker(5, {type: "div", number: 5})).toBe(1)
    expect(multiTasker(5, {type: "sub", number: 5})).toBe(0)
    expect(multiTasker(5, {type: "mult", number: 5})).toBe(25)
})


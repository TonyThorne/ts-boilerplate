import { fn } from './exampleTypescript'
import { filter1, filter2 } from './exampleTypescript'

const list1 = [{
    "id": 735523,
    "surname": "SMITH",
    "forename": "Paul"
},
{
    "id": 743645,
    "surname": "JONES-SMITH",
    "forename": "Carl"
},
{
    "id": 123456,
    "surname": "THORNE",
    "forename": "Tony"
},]
const list2 = [{
    "id": 735523,
    "surname": "SMITH",
    "forename": "Paul"
},
{
    "id": 743645,
    "surname": "JONES",
    "forename": "Carl"
}, {
    "id": 123456,
    "surname": "THORNE",
    "forename": "Tony"
},]


describe('Check basic Tests are working', () => {
    it('should test return, this is a test', () => {
        expect(fn()).toEqual('This is a test')
    })
})

describe('Filter tests', () => {
    it('should return an array of objects that are different in the two input arrays', () => {
        const results = filter1()
        expect(results).toBeDefined
        expect(results.length).toBe(4)
    })
    it('should return the difference in both files', () => {
        const result2 = filter2(list1, list2)
        console.log(result2);

        expect(result2).toBeDefined
        expect(result2.length).toBe(2)
    })
})

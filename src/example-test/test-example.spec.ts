import { fn } from './exampleTypescript'

describe('Check basic Tests are working', () => {
    it('should test return, this is a test', () => {
        expect(fn()).toEqual('This is a test')
    })
})

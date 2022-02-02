import { loadJSON } from './test-json-import'

describe('Example loading a JSON file into Typescript', () => {
    it('should load a JSON file into typescript file', () => {
        expect(loadJSON()).toEqual({ example: 'object' })
    })
})

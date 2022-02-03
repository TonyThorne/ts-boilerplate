import { loadJSON } from './test-json-import'

describe('Example loading a JSON file into Typescript', () => {
    it('should load a JSON file into typescript file', () => {
        const data = loadJSON()
        expect(data.forename).toBeDefined()
        expect(data).toHaveProperty('forename')

        expect(data.surname).toEqual('Doe')
        // expect(new Set(data )).toContain('John')
    })
})

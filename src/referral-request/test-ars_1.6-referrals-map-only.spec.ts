/* Example script for testing a mapping */
import { VON } from '../../dto/von.dto'
// import { validate } from 'jsonschema';
import * as testModule from './map'
import * as schema from './referral-schema.json'
import { von } from '../example-test/patientSamanthaTransfer'
import { VonCodedItem } from '../referral-request/types'
import { codedOutput } from './utilityFn'

// Set the consultion id
const consultId = '19024021-a8d9-47ae-8021-add3527cd89c'
// let von: VON
let outputFragment: any
let ubrnNumber = 'initial value'

// Set the ubrn number from the test
const ubrnFn = (ubrnString: string) => {
    von.clinicalHistory[consultId].ubrn = ubrnString
    // Pick out the specific consultation from the test data
    const item = von.clinicalHistory[consultId]
    // Setup an empty array
    outputFragment = { entry: [] }
    // Run the mapping
    const mapped = testModule.map(outputFragment, item, von, 1)
    console.log(mapped, JSON.stringify(outputFragment, null, 2))
}

beforeAll(async () => {
    ubrnFn('initial value')
})

describe('Utility functions', () => {
    it('Should return a CodeableConcept structure from any coded concept', () => {
        const exampleCodedInput: VonCodedItem = {
            readCode: '168..00',
            snomedConceptId: 267031002,
            sctMapIsAssured: true,
            sctMapIsIndicative: false,
            sctMapType: 4,
            sctMapVersion: 20130925,
            term: 'Tiredness symptom',
        }

        // console.log(codedOutput(exampleCodedInput))

        const expectedCodedOutput = {
            coding: [
                {
                    system: 'http://snomed.info/sct',
                    code: '267031002',
                    display: 'Tiredness symptom',
                },
                {
                    system: 'http://read.info/readv2',
                    code: '168..00',
                    display: 'Tiredness symptom',
                },
            ],
            text: 'Tiredness symptom',
        }

        expect(codedOutput(exampleCodedInput)).toEqual(expectedCodedOutput)
    })
    it.todo('Should return ubrn number based on what passed in')
    it.todo('Run the mapping function')
})

describe('Mapping VON to referrals', () => {
    let basePath
    beforeEach(() => {
        basePath = outputFragment?.entry?.[0]?.resource
    })

    it('should have a resource type of Referral', () => {
        // console.log('David HERE', basePath)
        expect(outputFragment).toBeDefined()
        expect(basePath.resourceType).toEqual('Referral')
    })
    it('should return the unique ID of the referral entity_id, entity_ty', () => {
        expect(basePath.id).toEqual('19024021-a8d9-47ae-8021-add3527cd89c')
    })
    it('should return the meta.profile, HARDWIRED', () => {
        expect(basePath.meta.profile).toEqual([
            'https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-GPC-ReferralRequest-1',
        ])
    })

    it('should return the referral ubrn', () => {
        ubrnNumber = 'A made up UBRN number'
        const t = ubrnFn(ubrnNumber)
        expect(outputFragment.entry[0].resource.identifier).toEqual([
            {
                system: 'https://visionhealth.co.uk/identifier',
                value: 'B154D1A3-D631-49BD-8B67-2F76D7D85865',
            },
            {
                system: 'https://fhir.nhs.uk/Id/ubr-number',
                value: 'A made up UBRN number',
            },
        ])
    })
    it('should return the referral a different ubrn', () => {
        ubrnNumber = '123456-78910'
        const t = ubrnFn(ubrnNumber)
        expect(outputFragment.entry[0].resource.identifier).toEqual([
            {
                system: 'https://visionhealth.co.uk/identifier',
                value: 'B154D1A3-D631-49BD-8B67-2F76D7D85865',
            },
            {
                system: 'https://fhir.nhs.uk/Id/ubr-number',
                value: '123456-78910',
            },
        ])
    })
    it('should no ubrn number', () => {
        ubrnNumber = ''
        const t = ubrnFn(ubrnNumber)
        expect(outputFragment.entry[0].resource.identifier).toEqual([
            {
                system: 'https://visionhealth.co.uk/identifier',
                value: 'B154D1A3-D631-49BD-8B67-2F76D7D85865',
            },
            {
                system: 'https://fhir.nhs.uk/Id/ubr-number',
                value: '',
            },
        ])
    })

    // Optional fields that we don't support should not be in the output
    it('not have a reference to the "basedOn field"', () => {
        expect(basePath).not.toHaveProperty('basedOn')
    })
    // Is this correct 'unknown'
    it('should return a status code of unknown', () => {
        expect(basePath.status).toEqual('unknown')
    })
    it('should return a intent code of order', () => {
        expect(basePath.intent).toEqual('order')
    })
    it('should return a priority of Routine', () => {
        // switch to a switch statement
        // ToDO pass this id in to the test

        if (von.clinicalHistory[consultId].urgency.code === 'URG002') {
            expect(basePath.priority).toEqual('routine')
        } else if (von.clinicalHistory[consultId].urgency.code === 'URG001') {
            expect(basePath.priority).toEqual('asap')
        } else {
            expect(basePath.priority).toEqual('urgent')
        }
    })
    it('should return an empty serviceRequested, as we do not support this field', () => {
        expect(basePath).not.toHaveProperty('serviceRequested')
    })
    it('should return the patients ID based on masterId', () => {
        expect(basePath.subject).toEqual({
            reference: 'Patient/4567219325',
        })
    })
    it('should return the context, Vision encounter (consult_id)', () => {
        expect(basePath.context).toEqual({
            reference: '2038337',
        })
    })
    it('should return the event date in "authoredOn" field', () => {
        expect(basePath.authoredOn).toEqual('2006-04-26')
    })
    it('should return the source if "source" is "GP Referral" (SOU001) and If a clinician is available', () => {
        if (von.clinicalHistory[consultId].source.code === 'SOU001') {
            expect(outputFragment.entry[0].resource).toHaveProperty('requester')
            expect(
                outputFragment.entry[0].resource.requester.agent
            ).toHaveProperty('reference', '292')
            expect(
                outputFragment.entry[0].resource.requester
            ).not.toHaveProperty('onBehalfOf')
        } else {
            expect(outputFragment.entry[0].resource).not.toHaveProperty(
                'requester'
            )
        }
    })
    it('should return an empty "specialty" as we don\'t support it', () => {
        expect(outputFragment.entry[0].resource.specialty).toEqual('')
    })
    it('should return an array or objects with the person, organisation and department', () => {
        expect(basePath.recipient).toEqual([
            { reference: 'Practitioner/207' },
            { reference: 'Organization/128' },
            { reference: 'Department/127' },
        ])
    })
    it('should return reasonCode, sct_code & read_code', () => {
        const expectedOutput = {
            coding: [
                {
                    system: 'http://snomed.info/sct',
                    code: '267031002',
                    display: 'Tiredness symptom',
                },
                {
                    system: 'http://read.info/readv2',
                    code: '168..00',
                    display: 'Tiredness symptom',
                },
            ],
            text: 'Tiredness symptom',
        }

        expect(basePath.reasonCode).toEqual(expectedOutput)
    })

    it('should return a description (text in Vision)', () => {
        expect(basePath.description).toEqual(
            'Outpatient, This is the referral and following text which wraps a bit'
        )
    })
    it('should return supporting info (the document reference', () => {
        expect(basePath.supportingInfo).toEqual({
            reference: 'Document/535-39',
        })
    })
    it('should return a note, which includes Vision fields not in the above spec', () => {
        expect(basePath.note).toEqual([
            {
                text: 'Source:GP Referral',
            },
            {
                text: 'Referral Type:Day Case',
            },
            {
                text: 'Attendance Type:Subsequent visit',
            },
            {
                text: 'Contract Status:Extra contractural referral',
            },
            {
                text: 'Status:Subsequent visit',
            },
            {
                text: 'NHS Speciality:General Surgery',
            },
            {
                text: ' TP Speciality:General Surgical',
            },
            {
                text: 'actiondate:2006-05-17',
            },
        ])
    })
})

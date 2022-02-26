/* Example script for testing a mapping */
import { VON } from '../../dto/von.dto'
// import { validate } from 'jsonschema';
import * as testModule from './map'
import * as schema from './referral-schema.json'
import { von } from '../example-test/patientSamanthaTransfer'

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
    it.todo(
        'Should return a CodeableConcept structure from any coded concept',
        () => {
            /* 
        Examples of a CodeableConcept include:

        The code for a problem (called a condition in FHIR)
            The medication code in a prescription
            The patients gender
            Symptoms observed during an adverse reaction
            ...
        It is actually a combination datatype:
            a text property of type string
            0 or more coding properties of type coding
        Code Type
            {
                "system" : "<uri>", // Identity of the terminology system
                "version" : "<string>", // Version of the system - if relevant
                "code" : "<code>", // Symbol in syntax defined by the system
                "display" : "<string>", // Representation defined by the system
                "userSelected" : <boolean> // If this coding was chosen directly by the user
            }
        Example lab test result
        "valueCodeableConcept": {
            "coding": [
                {
                    "system": "http://snomed.info/sct",
                    "code": "260385009",
                    "display": "Negative"
                }, {
                    "system": "https://acme.lab/resultcodes",
                    "code": "NEG",
                    "display": "Negative"
                }
            ],
            "text": "Negative for Chlamydia Trachomatis rRNA"
        }
        I DON'T LIKE THE ABOVE EXAMPLE AS THE TEXT, ENTERED BY THE USER, HAS LITTLE TO-DO WITH THE CODE
        THIS WAS TAKEN FROM THE FHIR WEB SITE

        The codeableConcept is far more flexible than coding
        {
            "coding" : [{ Coding }], // Code defined by a terminology system
            "text" : "<string>" // Plain text representation of the concept
        }
        
            */
            /*
           QUESTIONS about codeable concept
           1. Why don't we include the terminology version?
           2. 
           */
        }
    )
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

        // const t = { ...von, ubrn: 'Tony' }
        // console.log(
        //     't',
        //     t.clinicalHistory['19024021-a8d9-47ae-8021-add3527cd89c'].ubrn
        // )
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
        expect(outputFragment.entry[0].resource.recipient).toEqual([
            { reference: 'Practitioner/207' },
            { reference: 'Organization/128' },
            { reference: 'Department/127' },
        ])
    })
    // it.todo('should return reasonCode, sct_code & read_code')

    // it('should return a description (text in Vision)', () => {
    //     expect(outputFragment.entry[0].resource.description).toEqual(
    //         'Outpatient, This is the referral and following text which wraps a bit'
    //     )
    // })
    // it('should return supporting info (the document reference', () => {
    //     expect(outputFragment.entry[0].resource.supportingInfo).toEqual({
    //         reference: 'Document/535-39',
    //     })
    // })
    // it.todo('should return a note, which includes Vision fields not in the above spec', () => {
    //     expect(outputFragment.entry[0].resource.note).toEqual([
    //         {
    //             "text":"Source:GP Referral"
    //          },
    //          {
    //             "text":"Referral Type:Out Patient"
    //          },
    //          {
    //             "text":"Attendance Type:First Visit"
    //          },
    //          {
    //             "text":"Contract Status:GP Fund Holding Contract"
    //          },
    //          {
    //             "text":"Status:Referred"
    //          },
    //          {
    //             "text":"NHS Speciality:ENT"
    //          },
    //          {
    //             "text":" TP Speciality:Ear,Nose and Throat"
    //          },
    //          {
    //             "text":"actiondate:20200523"
    //          }
    //     ])
    // })
})

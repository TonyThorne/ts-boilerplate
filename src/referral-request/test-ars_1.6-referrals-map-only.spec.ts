/* Example script for testing a mapping */
import { VON } from '../../dto/von.dto'
// import { validate } from 'jsonschema';
import * as testModule from './map'
import * as schema from './referral-schema.json'

let von: VON
let outputFragment: any

beforeAll(async () => {
    try {
        // Simulate a bundle
        outputFragment = { entry: [] }
        // outputFragment = { entry: [] };

        // Simulate a test patient record

        von = {
            _metadata: {},
            patient: {
                uuid: 'to-be-defined',
                title: 'MR',
                surname: 'TRANSFER',
                forenames: ['GPTOGP'],
                sex: {
                    code: 'SEX001',
                    text: 'Male',
                },
                dateOfBirth: '1900-01-01',
                identifiers: {
                    nhs: '4567219325',
                    chi: '',
                },
                telephone: {
                    type: {
                        code: 'PICKLIST',
                        text: 'Home',
                    },
                    number: '01454587554',
                },
                address: {
                    category: {
                        code: 'XYZ001',
                        text: 'Home',
                    },
                    houseName: null,
                    houseNo: null,
                    road: null,
                    localName: null,
                    town: null,
                    county: null,
                    country: null,
                    postcode: null,
                },
                registration: {
                    status: {
                        code: 'REG002',
                        text: 'Permanent',
                    },
                    start: '1962-07-13T00:00:00+00:00',
                    end: null,
                },
                registeredGp: 'uuid of GP',
                registeredPractice: 'uuid of Practice',
            },
            clinicalHistory: {
                'f30c82b0-7acb-4349-b36e-1b49ae643c7a': {
                    _metadata: {
                        entityName: 'referral',
                        entityTypeId: 59,
                        careRecordGroup: 'referral',
                        entityId: '80338',
                        globalSequence: 830773641,
                        auditApplication: 0,
                        auditDate: '2020-01-23 15:05:42.14',
                        audited: false,
                        auditFlag: '1',
                        auditSequence: '830773641',
                        uuid: '1fe395ad-c2df-426e-bb74-571659533801',
                    },
                    baseType: {
                        code: 'RFL001',
                        text: 'Problems based referral',
                    },
                    category: {
                        code: 'SED004',
                        text: 'Intervention',
                    },
                    clinician: {
                        referenceType: 'staff',
                        uuid: '315',
                    },
                    consultation: {
                        referenceType: 'consultation',
                        uuid: '2038566',
                    },
                    referralDepartment: {
                        referenceType: 'UNKNOWN REFERENCE TYPE',
                        uuid: '0',
                    },
                    eventDate: '2007-05-08',
                    inactive: false,
                    inPractice: false,
                    iosClaim: false,
                    masterId: '14856',
                    inputOperator: '1',
                    organisation: {
                        referenceType: 'organisation',
                        uuid: '130',
                    },
                    personReference: {
                        referenceType: 'UNKNOWN REFERENCE TYPE',
                        uuid: '228',
                    },
                    private: false,
                    readCode: '8H...00',
                    authoriser: {
                        referenceType: 'staff',
                        uuid: '0',
                    },
                    snomedConceptId: 183444007,
                    sctMapIsAssured: true,
                    sctMapIsIndicative: false,
                    sctMapType: 4,
                    sctMapVersion: 20130925,
                    term: 'Referral for further care',
                    freeText:
                        'Outpatient, This is the referral and following text which wraps a bit',
                    topic: 1,
                    urgency: {
                        code: 'URG002',
                        text: 'Routine',
                    },
                },
            },
            references: {},
        }

        // Simulate a single entity to map - Nth item

        const item = von.clinicalHistory[Object.keys(von.clinicalHistory)[0]]

        // console.log(
        //   'ORIGINAL VON VERSION - DEBUG USE =================================================================',
        // );
        // console.log(item);

        // call function to test
        const mapped = testModule.map(outputFragment, item, von, 1)
        // console.log('this is mapped', mapped);

        // DEBUG only
        console.log(
            'MAPPED VERSION - DEBUG USE ================================================================='
        )
        console.log(mapped, JSON.stringify(outputFragment, null, 2))

        console.log('All PRE-test items loaded for referrals')
    } catch (e) {
        console.error(e)
        throw e
    }
})

describe('Mapping VON to referrals', () => {
    it('should have a resource type of Referral', () => {
        expect(outputFragment).toBeDefined()
        expect(outputFragment.entry[0].resource.resourceType).toEqual(
            'Referral'
        )
    })
    it('should return patient ID to-be-defined', () => {
        expect(outputFragment.entry[0].resource.id).toEqual('to-be-defined')
    })
    it('should meta.profile', () => {
        expect(outputFragment.entry[0].meta.profile).toEqual('Tony')
        //         '["https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-GPC-ReferralRequest-1"]'
        //     )
    })
})

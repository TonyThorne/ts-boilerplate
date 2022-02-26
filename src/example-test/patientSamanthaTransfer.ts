export const von = {
    _metadata: {
        producedDate: '2021-12-22T08:56:36Z',
        highTideMarker: 830776516,
        patientId: 14856,
    },
    patient: {
        uuid: '1dbe932d-8eba-4311-aa8c-0aa5d2e435eb',
        title: 'MR',
        surname: 'TRANSFER',
        forenames: ['SAMANTHA', 'ELIZABETH'],
        sex: {
            code: 'SEX001',
            text: 'Male',
        },
        dateOfBirth: '1900-01-01',
        identifiers: {
            nhs: '4567219325',
            chi: '',
        },
        telephone: [
            {
                type: {
                    code: 'COM001',
                    text: 'Telephone - home',
                },
                number: '01454000001',
            },
            {
                type: {
                    code: 'COM002',
                    text: 'Fax',
                },
                number: '0145400002',
            },
        ],
        address: [
            {
                category: {
                    code: 'ADD001',
                    text: 'Main address',
                },
                houseName: 'FLAT 2',
                houseNumber: '11A',
                road: 'LLEWELYN AVENUE',
                localName: 'LLANDUDNO',
                town: 'LLANDUDNO',
                county: 'CONWY',
                country: 'WALES',
                postcode: 'LL30 2ER',
            },
            {
                category: {
                    code: 'ADD011',
                    text: 'Correspondence address',
                },
                houseName: '',
                houseNumber: '5',
                road: 'KING STREET',
                localName: '',
                town: '',
                county: 'YORK',
                country: 'ENGLAND',
                postcode: 'YO19SP',
            },
        ],
        email: [
            {
                type: {
                    code: 'COM016',
                    text: 'Business Email',
                },
                number: 'john.doe@example.com',
            },
            {
                type: {
                    code: 'COM007',
                    text: 'Email',
                },
                number: 'john.doe2@example.com',
            },
        ],
        registration: {
            status: {
                code: 'REG002',
                text: 'Permanent',
            },
            start: '1962-07-13',
            end: null,
        },
        registeredGp: '415a9253-2433-4092-b7bd-a2d139c44deb',
        registeredPractice: 'c4b9c8fb-617d-4418-9e0f-73e06d5a0ec0',
    },
    clinicalHistory: {
        '19024021-a8d9-47ae-8021-add3527cd89c': {
            _metadata: {
                entityName: 'referral',
                entityTypeId: 59,
                careRecordGroup: 'referral',
                entityId: '80328',
                globalSequence: 830769881,
                auditApplication: 0,
                lastUpdateDateTime: '2020-01-23 14:43:07.951',
                audited: false,
                auditFlag: '1',
                auditSequence: 830769881,
                uuid: '19024021-a8d9-47ae-8021-add3527cd89c',
            },
            dateActionToBeTaken: '2006-05-17',
            attendance: {
                code: 'ATT002',
                text: 'Subsequent visit',
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
                uuid: '292',
            },
            consultation: {
                referenceType: 'consultation',
                uuid: '2038337',
            },
            contract: {
                code: 'FCG003',
                text: 'Extra contractural referral',
            },
            referralDepartment: {
                referenceType: 'UNKNOWN REFERENCE TYPE',
                uuid: '127',
            },
            eventDate: '2006-04-26',
            fhsaSpecialties: {
                code: 'SPE001',
                text: 'General Surgical',
            },
            inactive: false,
            referralType: {
                code: 'RFT002',
                text: 'Day Case',
            },
            inPractice: false,
            iosClaim: false,
            masterId: '14856',
            nhsSpecialties: {
                code: 'DEP001',
                text: 'General Surgery',
            },
            inputOperator: '1',
            organisation: {
                referenceType: 'organisation',
                uuid: '128',
            },
            personReference: {
                referenceType: 'UNKNOWN REFERENCE TYPE',
                uuid: '207',
            },
            private: false,
            readCode: '168..00',
            authoriser: {
                referenceType: 'staff',
                uuid: '0',
            },
            snomedConceptId: 267031002,
            sctMapIsAssured: true,
            sctMapIsIndicative: false,
            sctMapType: 4,
            sctMapVersion: 20130925,
            source: {
                code: 'SOU001',
                text: 'GP Referral',
            },
            status: {
                code: 'RFS001',
                text: 'Referred',
            },
            term: 'Tiredness symptom',
            topic: 1,
            urgency: {
                code: 'URG002',
                text: 'Routine',
            },
            ubrn: 'placeholder',
            // ubrn: 'A made up UBRN number',
            document: {
                code: '535-39',
                text: 'some word file.docx',
            },
            // freeText added by Tony, based on the VON definition on confluence
            freeText:
                'Outpatient, This is the referral and following text which wraps a bit',
        },
    },
    references: {},
}

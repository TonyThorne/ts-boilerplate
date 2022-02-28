import { VonCodedItem, CodeableConcept } from './types'

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

export const codedOutput = (obj: VonCodedItem): CodeableConcept => {
    return {
        coding: [
            {
                system: 'http://snomed.info/sct',
                code: obj.snomedConceptId?.toString(),
                display: obj.term,
            },
            {
                system: 'http://read.info/readv2',
                code: obj.readCode?.toString(),
                display: obj.term,
            },
        ],
        text: obj.term,
    }
}

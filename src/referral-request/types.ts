// TYPES - move to external file
export type CodeableConcept = {
    coding: Coding[]
    text: string
}
export type Coding = {
    system: string // Identity of the terminology system
    version?: string // Version of the system - if relevant
    code: string // Symbol in syntax defined by the system
    display: string // Representation defined by the system
    userSelected?: boolean // If this coding was chosen directly by the user
}

export type VonCodedItem = {
    readCode?: string
    snomedConceptId: number
    sctMapIsAssured?: boolean
    sctMapIsIndicative?: boolean
    sctMapType?: number
    sctMapVersion: number
    term: string
}

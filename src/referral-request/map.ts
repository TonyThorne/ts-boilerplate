import { VON, json } from '../../dto/von.dto'

// Each new allergy must be added to a list of allergies
// If this is the first one, the list must be created
// If this is NOT the first one, the list is simply appended

export const priority = 0

//======================================================================================================
// Main Mapping function - exported for use by server
//======================================================================================================
export const map = (
    output: json,
    item: any, //called once per clinical item - one of the clincial history items
    von: VON,
    itemNumber: number
): boolean => {
    if (!(item._metadata.entityTypeId === 59)) {
        return false
    }
    console.log('Referral', item._metadata.entityId)
    try {
        const template: any = {}
        template.resource = {}

        const resource = template.resource

        // resource Type
        resource.resourceType = 'Referral'
        resource.id = Object.keys(von.clinicalHistory)[0]
        resource.meta = {}
        resource.meta.profile = []
        resource.meta.profile.push(
            'https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-GPC-ReferralRequest-1'
        )
        resource.identifier = []
        resource.identifier.push(
            {
                system: 'https://fhir.nhs.uk/Id/cross-care-setting-identifier',
                value: 'B154D1A3-D631-49BD-8B67-2F76D7D85865',
            },
            {
                system: 'https://fhir.nhs.uk/Id/ubr-number',
                value: 'bb2378b6-dde2-11e9-9d36-2a2ae2dbcce4',
            }
        )
        resource.basedOn = ''
        resource.status = 'unkown'
        resource.intent = 'order'
        resource.priority = ''
        resource.serviceRequested = ''
        resource.subject = von.patient.uuid
        // Final output goes into the resource part

        output.entry.push(template)

        return true
    } catch (error) {
        console.log('Context for error:', item)
        console.error(error)
        // throw new UnprocessableEntityException(error);
    }
}

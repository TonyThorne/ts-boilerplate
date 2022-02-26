import { VON, json } from '../../dto/von.dto'
import {
    CodeableConcept,
    Coding,
    VonCodedItem,
} from '../referral-request/types'
import { codedOutput } from './utilityFn'
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
    // console.log('Referral', item._metadata.entityId)
    try {
        const template: any = {}
        template.resource = {}

        const resource = template.resource

        // resource Type
        resource.resourceType = 'Referral'
        resource.id = item._metadata.uuid
        resource.meta = {}
        resource.meta.profile = []
        resource.meta.profile.push(
            'https://fhir.nhs.uk/STU3/StructureDefinition/CareConnect-GPC-ReferralRequest-1'
        )
        resource.identifier = []
        resource.identifier.push(
            {
                system: 'https://visionhealth.co.uk/identifier',
                value: 'B154D1A3-D631-49BD-8B67-2F76D7D85865',
            },
            {
                system: 'https://fhir.nhs.uk/Id/ubr-number',
                value: item?.ubrn,
            }
        )
        // basedON is not supported by Vision and optional, so not included
        // resource.basedOn = ''
        resource.status = 'unknown'
        resource.intent = 'order'
        // ToDo create a function to test each one
        if (item.urgency.code === 'URG001') {
            resource.priority = 'asap'
        } else if (item.urgency.code === 'URG002') {
            resource.priority = 'routine'
        } else if (item.urgency.code === 'URG003') {
            resource.priority = 'urgent'
        } else if (item.urgency.code === 'URG004') {
            resource.priority = 'urgent'
        } else if (item.urgency.code === 'URG005') {
            resource.priority = 'urgent'
        } else if (item.urgency.code === 'URG006') {
            resource.priority = 'urgent'
        } else {
            resource.priority = 'not known'
        }
        // serviceRequested is not supported and optional, this should not be in the payload
        // resource.serviceRequested = ''
        resource.subject = {
            reference: `Patient/${von.patient.identifiers.nhs}`,
        }
        resource.context = {}
        resource.context.reference = item.consultation.uuid
        resource.authoredOn = item.eventDate
        // Only populated if "source" is "GP Referral" (SOU001) and If a clinician is available
        if (item.source.code === 'SOU001') {
            resource.requester = {}
            resource.requester.agent = {}
            resource.requester.agent.reference = item.clinician.uuid
        }

        // requester.onBehalfOf
        // This MUST be populated if the requester.agent is a practitioner and the
        // Organization associated with the referenced Practitioner is not the GP
        // practice responsible for the referral.
        // This element SHOULD be absent if the requester.agent is not a practitioner
        // ** Not supported. **
        // GPs only refer the patient on their own recommendation and for their own practice so there will never be another Organisation to refer to for this field.
        // resource.requester.onBehalfOf = ''
        resource.specialty = ''
        resource.recipient = []
        resource.recipient.push(
            { reference: `Practitioner/${item.personReference.uuid}` },
            { reference: `Organization/${item.organisation.uuid}` },
            { reference: `Department/${item.referralDepartment.uuid}` }
        )
        // reasonCode - codable item, waiting on utility function
        const vonInput = {
            readCode: item.readCode,
            snomedConceptId: item.snomedConceptId,
            sctMapIsAssured: item.sctMapIsAssured,
            sctMapIsIndicative: item.sctMapIsIndicative,
            sctMapType: item.sctMapType,
            sctMapVersion: item.sctMapVersion,
            term: item.term,
        }

        resource.reasonCode = codedOutput(vonInput)

        resource.description = item.freeText
        resource.supportingInfo = {
            reference: `Document/${item.document.code}`,
        }

        // console.log(resource.recipient)

        // Final output goes into the resource part

        output.entry.push(template)

        return true
    } catch (error) {
        console.log('Context for error:', item)
        console.error(error)
        // throw new UnprocessableEntityException(error);
    }
}

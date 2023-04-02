import * as data from '../data/rbac-job-roles-baseline.json'
import * as rbacActivities from '../data/rbac-active-activities.json'

// The purpose of this function is to consolidate the activities into a single array
// It removes any of the columns (validPrefixes) that are not used


type InputObject = {
    [key: string]: string | null | undefined;
};

type ResultObject = InputObject & { activities: string[]; associatedActivities?: ActivityObject[] };


const validPrefixes = [
    "D0002", "D0003", "D0004", "D0006", "D0010", "D0001", "D0009", "D0012", "D0013",
    "D8002", "D8003", "D8004", "D8005", "D8006", "D8001", "D0008", "D0011",
    "T0850", "T1580", "T1670", "T2200", "T6080", "T6090", "T6092", "T1590", "T2250", "T6091",
];

// This function is used to determine if the key starts with any of the valid prefixes
function startsWithValidPrefix(key: string): boolean {
    return validPrefixes.some((prefix) => key.startsWith(prefix));
}

// This function is used to consolidate the activities into a single array
function consolidateActivities(obj: InputObject): any {
    const result: any = {};

    for (const key in obj) {
        if (startsWithValidPrefix(key) && obj[key]) {
            if (!result.activities) {
                result.activities = [];
            }
            const activityStrings = (obj[key] as string).split(' ');
            result.activities.push(...activityStrings);
            delete result[key];
        } else {
            if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
                delete result[key];
            } else {
                result[key] = obj[key];

            }
        }
    }

    return result as ResultObject;
}

// Enumerated set of types. "Job Role Code", "Staff Sub Group Code", "Staff Group Code"
type SearchKey = "Job Role Code" | "Staff Sub Group Code" | "Staff Group Code";

// Search Job Roles
function searchRolesByKey(key: SearchKey, value: string): InputObject[] {
    if (!key || !value) {
        throw new Error('Invalid key or value provided.');
    }
    if (key !== "Job Role Code" && key !== "Staff Sub Group Code" && key !== "Staff Group Code") {
        throw new Error('Invalid key provided.');
    }
    return data.filter((role) => role[key].toLowerCase() === value.toLowerCase());
}

// Example usage
const inputArray: InputObject[] = data


const consolidatedObjects: ResultObject[] = inputArray.map(consolidateActivities);
// console.log(consolidatedObjects.length);

// Search for a particular Job Role (by any key), then consolidate the activities so only include the included activities
// const t: ResultObject[] = searchRolesByKey("Staff Group Code", "S0080").map(consolidateActivities);
// const t: ResultObject[] = searchRolesByKey("Staff Sub Group Code", "G0450").map(consolidateActivities);
// const t: ResultObject[] = searchRolesByKey("Job Role Code", "R5105").map(consolidateActivities);
// console.log(JSON.stringify(t));

// TO-DO These needs to be imported from types file
type ActivityObject = {
    "Activity Group Name": string;
    "Activity Group Code": string;
    "Activity Sub Group Name": string;
    "Activity Sub Group Code": string;
    "Activity Name": string;
    "Activity Code": string;
    "Includes": string;
    "Activity Description": string;
    "Restricted": string;
    "Rationalisation Status": string;
};




type ResultWithActivities = ResultObject & { associatedActivities: ActivityObject[] };

function findAssociatedActivities(consolidatedObj: Partial<ResultWithActivities>, activities: ActivityObject[]): ResultWithActivities {
    const associatedActivities = (consolidatedObj.activities as string[]).map((activityCode) => {
        const activity = activities.find((activity) => activity["Activity Code"] === activityCode);
        if (!activity) {
            // console.error(`Activity not found for code: ${activityCode}`);
            return null;
        }
        return activity;
    }).filter((activity) => activity !== null) as ActivityObject[];

    return {
        ...consolidatedObj,
        associatedActivities,
    } as ResultWithActivities;
}

// const t: ResultObject[] = searchRolesByKey("Job Role Code", "R8000").map(consolidateActivities);
// const t: ResultObject[] = searchRolesByKey("Staff Sub Group Code", "G0450").map(consolidateActivities);
// const t: ResultObject[] = searchRolesByKey("Staff Group Code", "S0080").map(consolidateActivities);

// const associatedActivitiesArray: ResultWithActivities[] = t.map((consolidatedObj) => findAssociatedActivities(consolidatedObj, rbacActivities));

// Example output
// console.log(JSON.stringify(associatedActivitiesArray))
try {
    const t: ResultObject[] = searchRolesByKey("Staff Sub Group Code", "G0450").map(consolidateActivities);
    const associatedActivitiesArray: ResultWithActivities[] = t.map((consolidatedObj) => findAssociatedActivities(consolidatedObj, rbacActivities));
    console.log(JSON.stringify(associatedActivitiesArray));
} catch (error) {
    console.error('An error occurred:', error.message);
}

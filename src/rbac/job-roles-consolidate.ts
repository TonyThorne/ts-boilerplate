import * as data from '../data/rbac-job-roles-baseline.json';

type InputObject = {
    [key: string]: string | null | undefined;
};

type ResultObject = InputObject & { activities: string[] };

const validPrefixes = [
    "D0002", "D0003", "D0004", "D0006", "D0010", "D0001", "D0009", "D0012", "D0013",
    "D8002", "D8003", "D8004", "D8005", "D8006", "D8001", "D0008", "D0011",
    "T0850", "T1580", "T1670", "T2200", "T6080", "T6090", "T6092", "T1590", "T2250", "T6091",
];

function startsWithValidPrefix(key: string): boolean {
    return validPrefixes.some((prefix) => key.startsWith(prefix));
}

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

// Example usage
const inputArray: InputObject[] = data

// const inputArray: InputObject[] = [
//     {
//         Type: "NWD",
//         "Staff Group": "M&D",
//         "Staff Group Code": "S0010",
//         "D0002 Primary Care": "",
//         "D0003 Prescribing and Pharmacy Related": "",
//         "D0004 Secondary Care": "B0021 B0028 B0031 B0051 B0275 B0640 B0680 B0710 B0740 B0780 B0805 B0870 B0915 B0940 B0960 B1035",
//         "T0850 Imaging AoW": "B0035",
//         "T1580 Primary Care AoW": "",
//     },
//     // ... other objects
// ];

const consolidatedObjects: ResultObject[] = inputArray.map(consolidateActivities);
console.log(consolidatedObjects);


// import * as data from '../data/rbac-job-roles-baseline.json';

// type InputObject = {
//     [key: string]: string | null | undefined;
// };

// type ResultObject = InputObject & { activities: string[] };

// const validPrefixes = [
//     "D0002", "D0003", "D0004", "D0006", "D0010", "D0001", "D0009", "D0012", "D0013",
//     "D8002", "D8003", "D8004", "D8005", "D8006", "D8001", "D0008", "D0011",
//     "T0850", "T1580", "T1670", "T2200", "T6080", "T6090", "T6092", "T1590", "T2250", "T6091",
// ];

// function startsWithValidPrefix(key: string): boolean {
//     return validPrefixes.some((prefix) => key.startsWith(prefix));
// }

// function consolidateActivities(obj: InputObject): any {
//     const result: any = { ...obj, activities: [] };

//     for (const key in obj) {
//         if (startsWithValidPrefix(key) && obj[key] !== null && obj[key] !== undefined) {
//             const activityList = (obj[key] as string).split(' ').filter(item => item !== '');
//             result.activities.push(...activityList);
//             delete result[key];
//         }
//     }

//     return result;
// }

// // Example usage
// // const input: InputObject = data
// const input: InputObject = {
//     "Type": "NWD",
//     "Staff Group": "M&D",
//     "Staff Group Code": "S0010",
//     "Staff Sub Group": "Management - M&D",
//     "Staff Sub Group Code": "G0010",
//     "Job Role": "Medical Director",
//     "Job Role Code": "R0010",
//     "Job Role Description": "",
//     "Restricted": "",
//     "Rationalisation Status": "Withdrawn - when not supported use: R8000 Clinical Practitioner Access Role",
//     "D0002 Primary Care": "",
//     "D0003 Prescribing and Pharmacy Related": "",
//     "D0004 Secondary Care": "B0021 B0028 B0031 B0051 B0275 B0640 B0680 B0710 B0740 B0780 B0805 B0870 B0915 B0940 B0960 B1035",
//     "D0006 Information Governance": "",
//     "D0010 Patient Demographics": "",
//     "D0001 Primary and Secondary Care": "",
//     "D0009 Orders & Results": "B0026 B0052 B1615 B1656 B1657 B1660 B1661 B1662 B1665 B1666 B1667",
//     "D0012 Child Health": "",
//     "D0013 Health Records": "",
//     "D8002 Patient Records": "B0620 B0825",
//     "D8003 Patient Administration": "B0600",
//     "D8004 Tests/Investigations": "",
//     "D8005 Prescribing and Pharmacy": "",
//     "D8006 Management": "B0862",
//     "D8001 Reports": "",
//     "D0008 Miscellaneous": "",
//     "D0011 Diagnostic Imaging": "B0034 B0040",
//     "T0850 Imaging AoW": "B0035",
//     "T1580 Primary Care AoW": "",
//     "T1670 General Practice AoW": "",
//     "T2200 Pharmacy AoW": "",
//     "T6080 Mental Health AoW": "",
//     "T6090 PCT Admin AoW": "",
//     "T6092 Secondary Care AoW": "",
//     "T1590 Community Health AoW": "",
//     "T2250 Accident & Emergency AoW": "",
//     "T6091 National Back Office AoW": "",
//     "": "",
//     "(more Areas of Work may be added as required - first five letters of this row must be AoW Tertiary Code followed by space)\r": "\r"
// };

// const consolidatedObject: ResultObject = consolidateActivities(input);
// console.log(consolidatedObject);

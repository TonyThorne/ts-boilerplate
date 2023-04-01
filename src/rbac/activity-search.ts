import * as data from '../data/rbac-active-activities.json'

type Activity = {
    "Activity Group Name": string,
    "Activity Group Code": string,
    "Activity Sub Group Name": string,
    "Activity Sub Group Code": string,
    "Activity Name": string,
    "Activity Code": string,
    "Includes": string,
    "Activity Description": string,
    "Restricted": string,
    "Rationalisation Status": string
};




function searchActivities(keyword: string): Activity[] {
    return data.filter((activity) => {
        return Object.values(activity).some((value) => value.toLowerCase().includes(keyword.toLowerCase()));
    });
}

function searchActivitiesByCode(activityCode: string): Activity[] {
    return data.filter((activity) => activity["Activity Code"].toLowerCase() === activityCode.toLowerCase());
}

// search by any key
function searchActivitiesByKey(key: keyof Activity, value: string): Activity[] {
    return data.filter((activity) => activity[key].toLowerCase() === value.toLowerCase());
}

// limit which fields are returned
function filterFields<T>(items: T[], fields: (keyof T)[]): Partial<T>[] {
    return items.map((item) => {
        const filteredItem: Partial<T> = {};
        fields.forEach((field) => {
            filteredItem[field] = item[field];
        });
        return filteredItem;
    });
}

//Activity Sub Group Code": "C0079",
// "Activity Group Code": "D8002",
// Example usage:
const objectKey: keyof Activity = "Activity Description";
const searchValue = 'B0428';
const fieldsToInclude: (keyof Activity)[] = ["Activity Name", "Activity Code"];
const searchResults = searchActivitiesByKey(objectKey, searchValue);
const filteredResults = filterFields(searchResults, fieldsToInclude);
// console.log(searchResults);
console.log(JSON.stringify(filteredResults));
// Example usage:
// const keyword = 'D8002';
// const results = searchActivities(keyword);
// console.log(results);

// const keyword = 'B0093';
// const results = searchActivitiesByCode(keyword);
// console.log(results);

// const objectKey: keyof Activity = "Activity Sub Group Code";
// const searchValue = 'C0079';
// const results = searchActivitiesByKey(objectKey, searchValue);
// console.log(results);
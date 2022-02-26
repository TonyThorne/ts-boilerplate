# Referrals

-   [Mapping file on confluence](https://inpsjira.atlassian.net/wiki/download/attachments/3170172955/GPC_FullStructured_Referral_Mapping.xlsx?api=v2)
-   [GPC web site details](https://developer.nhs.uk/apis/gpconnect-1-6-0/accessrecord_structured_development_referralrequest_guidance.html#what-is-an-outbound-referral)

-   [VON field mapping](https://inpsjira.atlassian.net/wiki/spaces/GC/pages/3573383448/Naming+conventions+for+JSON+attributes+VON)

---

-   Spent .5 hour trying to work out what it is doing and how. Getting a lot of
    console logs, but no clue what is generating it
-   When running test againgst referrals only why to I get the following ouput?

```ARS@1.6 {
      setup: [AsyncFunction: setup],
      produceOutput: [Function: produceOutput],
      maps: [
        { priority: 0, map: [Function: map], name: 'allergies' },
        { priority: 1, map: [Function: map], name: 'no-known-allergies' }
      ]
    }
```

-   Wasn't rxpecting to see NEst in the mapping files
    `import { UnprocessableEntityException } from '@nestjs/common';`
-   Spent another hour trying to work out how to read the FHIR output so I could
    start the mapping. Didn't kno where to start.

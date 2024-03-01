För betyg G:

    1. Webbanrop görs och information från webbtjänster visas: Detta krav uppfylls av komponenten CountryList.vue, där webbanrop görs för att hämta listan över tillgängliga länder från https://date.nager.at/api/v3/AvailableCountries.

    2. Textinterpolering används: Textinterpolering används i flera komponenter, till exempel About.vue och HolidayDetails.vue.

    3. Attributinterpolering används: Attributinterpolering används bland annat i komponenten CountryList.vue, där :src-attributet på <img>-elementet sätts dynamiskt baserat på data från API-anropet.

    4. Villkorlig rendering används: Villkorlig rendering används i flera komponenter, till exempel SearchHoliday.vue och HolidayList.vue, där vissa delar av komponenten renderas baserat på olika villkor.

    5. Listrendering används: Listrendering används i komponenterna CountryList.vue och HolidayList.vue, där en lista över länder och helgdagar renderas med v-for.

    6. Händelser används: Händelser används i komponenten ScrollToTopButton.vue, där en händelse lyssnas på för att detektera när användaren scrollar på sidan, och en händelse hanteras när användaren klickar på knappen för att scrolla tillbaka till toppen.

    7. v-model används: v-model används i komponenten SearchHoliday.vue, där det används för att binda värdet av ett input-fält till data i komponenten.

För betyg VG:

    1. Använda något annat än fetch för webbanrop: Detta krav uppfylls av användningen av Axios för att göra webbanrop i flera komponenter, till exempel CountryList.vue och HolidayDetails.vue.

    2. Minst en beräknad egenskap används: Beräknade egenskaper används inte direkt i dina komponenter.

    3. Minst en bevakare används: En bevakare används i komponenten HolidayDetails.vue för att övervaka förändringar i countryCode och date, och för att hämta nya helgdagar vid förändringar.

    4. Alla props är typsäkra: Alla props är typsäkra och datatyper anges för props i komponenten HolidayDetails.vue.

    5. Minst ett custom event används:
    Koden använder ett custom event. I komponenten SearchHoliday.vue har man implementerat en metod emitCustomEvent(extraInformation) som utlöser ett custom event med namnet "customEventName" och skickar med extra information som en parameter.

    6. Router-adressparametervärde: Adressparametervärden används för att dirigera användare till specifika sidor baserat på parametrar i URL:en, vilket uppfyller kravet. Exempelvis används detta i HolidayDetails.vue för att visa detaljer om en specifik helgdag.

# ml224cv-examination
Examination assignment for Malin Lorch, WP2016

Applikationen kan besökas här: https://www.dashboard1dv612.cf

## Arkitektur

#### övergripande arkitektur
![system-overview](https://github.com/1dv612/ml224cv-examination/blob/master/public/images/system-overview-updated.jpg)

Applikationen bygger på en lagrad arkitektur, där klienten endast renderar vyer och kommunicerar med servern som sköter kommunikation mot databas och github API. 
Genom att kommunicera med databas och API genom servern blir det enklare att hantera säkerhet vad gäller API-nycklar och data hantering.

För att hantera push-notifikationer använder jag mig av Firebase FCM. När github skickar push-notifikationer uppdateras även databasen
som lagrar notifikationer. Detta har jag missat att få med i bilden ovan. 


#### Server
Serverns arkitektur ingår i den övergripande arkitekturen och förklaras till stor del ovan. Jag valde att använda ramverket Express i kombination 
med MongoDB, detta för att jag är bekant med ramverket sedan tidigare kurser och för att spara tid då react applikationen beräknades ta 
lång tid att få i ordning. Jag hade från början tänkt att sköta direktkommunikation med api och databas genom klienten, men ångrade mig då
det verkade svårt att hantera säkerheten korrekt via klienten. Jag hade visserligen kunnat använda mig av någon form av service till backend, 
men var somsagt osäker på hur lång tid det skulle ta och bedömde att användningen av React och Redux var utmanande nog inom den utsatta tiden
för projektet. 

#### Klient-arkitektur - react & redux
![client-architecture](https://github.com/1dv612/ml224cv-examination/blob/master/public/images/client-updated.jpg)

Arkitekturen i klienten landade också i lagrad arkitektur, där redux agerar controller och kommunicerar med servern. Redux uppdaterar därefter
state vilket i sin tur uppdaterar de vyer som är beroende det state. 
Då komponenterna agerar efter händelser i state så är det också en eventdriven arkitektur. 

Jag försökte separera de olika funktionaliteterna i olika komponenter, det vill säga inte bara vyerna utan all funktionalitet därtill, som tillexempel
actions och reducers. Detta för att uppnå "separation of concern" och optimera återanvändbarhet. Dock tyckte jag att det blev rörigt att 
importera actions och reducers från olika komponenter.




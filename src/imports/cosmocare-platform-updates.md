Update and extend the existing Cosmocare Healthcare Platform prototype. Do not redesign the whole product. Maintain the same color scheme, UI style, layout, and component system already used in the current prototype. Only add new features and screens.

1. AI Prescription Reader (AI Health Assistant)

Add a new section inside the user profile called “AI Health Assistant”.

Features:

* Button: Upload Prescription
* Allow users to upload a prescription image from camera or gallery.
* The AI assistant should analyze doctor handwriting and convert it into readable digital text.
* Display extracted information in a structured format such as:

  * Medicine Name
  * Dosage
  * Instructions
  * Doctor Notes
* Show an AI processing screen while the text is being extracted.
* Add a “Save as Document” or “Save to Medical Records” button.

Saved prescriptions must appear inside a new section in the profile called “Medical Records”.

Screen flow:
Profile → AI Health Assistant → Upload Prescription → AI Processing → Prescription Result → Save to Records.

The AI assistant should appear visually as a chatbot helper inside the profile section.

2. Map-Based Healthcare Services (Live Location)

Add a services map similar to Google Maps.

Features:

* Detect the user's current location automatically.
* Display nearby hospitals, clinics, pharmacies, and ambulance services as map markers.
* When a user selects a provider, show:

  * Distance from the user
  * Estimated driving time
  * Estimated walking time
* Show navigation route from user location to the selected provider.
* Allow switching travel mode between Driving and Walking.

Screens to include:
Services Map → Provider Marker → Provider Details → Navigation Route.

3. Service Sorting and Provider Ratings

On the services search page add a sorting dropdown.

Sorting options:

* Sort by Distance
* Sort by Rating
* Sort by Availability

Each service provider card must display:

* Provider Name
* Distance from user
* Star rating
* Number of reviews
* Type of services offered

Example layout:

Provider Name
⭐ 4.6 (218 reviews)
2.3 km away
Emergency • Cardiology • ICU

4. Real-Time Data System for Service Providers

Add a real-time system where hospitals, clinics, pharmacies, diagnostic centers, and ambulance providers can register on the platform.

Provider registration flow:
Service Provider → Create Account → Enter Details (location, services, contact information, availability).

Platform behavior:

* When a new provider registers, it should automatically appear in the services search results and map listings for patients.
* The system should update in real time across patient accounts.

Ambulance feature:

* Patients should be able to search “Ambulance Near Me”.
* Nearby ambulances registered on the platform should appear instantly on the map.
* Ambulance availability should be shown as Available / Busy.

Add a provider dashboard that includes:

* Provider profile
* Services offered
* Ratings and reviews
* Availability status.

5. Trusted Cosmocare User Rating System

Implement a verified rating system so only registered Cosmocare users can submit ratings and reviews.

Rules:

* Only logged-in Cosmocare users can rate or review a provider.
* Each user can submit only one rating per provider.
* Ratings must be calculated using only verified user reviews.

When the rating button is pressed:

* Show a popup with:

  * Star rating selector (1 to 5 stars)
  * Optional text review
  * Submit button.

Provider cards must display ratings like this:

Provider Name
⭐ 4.7 (Based on 218 Trusted Cosmocare Users)

Add a badge next to ratings that says:
“Verified by Cosmocare Users”.

Provider dashboards should display:

* Average rating
* Total number of ratings
* Recent user reviews.

Patients can view reviews but only verified Cosmocare users can submit ratings.

6. Main Platform Modules

Ensure the prototype clearly includes these modules:

* AI Health Assistant
* Medical Records
* Map-Based Healthcare Services
* Real-Time Ambulance Search
* Service Provider Registration
* Provider Dashboard
* Ratings and Reviews System.

Design style:
Use a modern healthcare mobile app interface with clean cards, map integration, intuitive navigation, and consistent UI elements with the existing Cosmocare prototype.
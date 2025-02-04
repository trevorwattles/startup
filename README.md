# Gigglr

Gigglr is a random joke generator which is a fun and interactive web application designed to provide users with a continuous stream of random jokes. Users can log in to save their favorite jokes for future laughs and view them in a personalized list. The app fetches jokes from a third-party API, ensuring a wide variety of humor. Additionally, it updates saved jokes in real-time, allowing users to share their favorites with friends instantly. With a clean and responsive design, the application is easy to use and guarantees a lighthearted experience for all.

## 🚀 Specification Deliverable


For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Need a good laugh? The Random Joke Generator delivers endless fun by fetching random jokes tailored to your mood. Save your favorites, revisit them anytime, and share the joy with friends in real time. With a clean and intuitive design, this app ensures you never miss a punchline!

### Design
![image0 (6)](https://github.com/user-attachments/assets/fd824a43-965c-4660-949a-42073ab0a92a)

The design of the Random Joke Generator revolves around simplicity and user interactivity, as illustrated in the sequence diagram. The application begins with the user fetching a random joke, which the backend retrieves from an external API and delivers to the user interface. A "Save to Favorites" button allows users to save a joke they enjoy, sending a request to the backend to store the joke in a database tied to their account. Once saved, the server confirms the action and broadcasts the updated favorite list to all connected clients in real time using WebSocket technology. This ensures that the user's saved jokes are accessible across devices and visible to others instantly. The design incorporates separate pages for login, joke display, and favorites, leveraging React components and routing to create a dynamic and responsive user experience.

```mermaid
sequenceDiagram
    actor User
    participant Server
    participant JokeAPI
    participant WebSocket Clients

    User->>Server: Login with credentials
    Server-->>User: Authentication success/failure
    User->>Server: Fetch random joke
    Server->>JokeAPI: Request random joke
    JokeAPI-->>Server: Joke response
    Server-->>User: Deliver joke
    User->>Server: Save joke to favorites
    Server-->>User: Save confirmation
    Server-->>WebSocket Clients: Broadcast "User saved a joke: [Joke text]"
```

### Key features

- Secure user login.
- Display random jokes fetched from an external API.
- Save favorite jokes for later viewing.
- View and manage a list of saved jokes.
- Realtime updates when a joke is saved.
- Responsive and engaging design.
- 
## Technologies Used

### HTML
- Basic structure for the app:
  - **Login Page**: Allow users to log in or sign up.
  - **Joke Display Page**: Show a random joke fetched from the server.
  - **Favorites Page**: Display and manage saved jokes.

### CSS
- **Styling Features**:
  - Clean and responsive UI for seamless user experience on any device.
  - Animated joke cards for visual appeal.
  - A color scheme that enhances readability and maintains a playful vibe.

### React
- **Componentized Structure**:
  - **Login Form**: Handles user authentication.
  - **Joke Display**: Fetches and shows random jokes dynamically.
  - **Favorites List**: Displays saved jokes for logged-in users.
- **Routing**: Utilizes React Router for smooth navigation between pages.

### Service
- **Backend Endpoints**:
  - Fetching random jokes from a third-party API.
  - User login and authentication.
  - Saving and retrieving favorite jokes for each user.

### DB/Login
- **MongoDB**:
  - Stores user credentials securely with hashing.
  - Keeps a record of user-specific saved jokes.
- **Access Restrictions**:
  - Only logged-in users can save and retrieve jokes.

### WebSocket
- **Real-Time Updates**:
  - Broadcasts notifications to all users when a new joke is added to the shared favorites list.
  - Ensures real-time interactivity across connected clients.


## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://trevorscs260.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - index.html, generateJokes.html, savedJokes.html, and about.html
- [x] **Proper HTML element usage** - ✔ Proper Semantic Elements (header, nav, main, footer, etc)
✔ Correct Use of Forms & Inputs (email, password, submit buttons)
✔ JavaScript Enhancements (dynamically updating username & jokes)
✔ Navigation & Accessibility (structured menu & screen reader-friendly)
✔ Data Persistence via URL Parameters (preserves login details)
- [x] **Links** - Included links for each html page and links to generate jokes page from the login.  Also included link to github on each page.
- [x] **Text** - text in the about page and text for the jokes generated/saved
- [x] **3rd party API placeholder** - Inluded a generate button that will pull jokes from a 3rd party.
- [x] **Images** - created a favicon.ico for the icon in the top and also added an image in the about section.
- [x] **Login placeholder** - Username and password that then takes you to the generate jokes page.
- [x] **DB data placeholder** - Added a html page that displays all of the users saved jokes.
- [x] **WebSocket placeholder** - added a placeholder that shows all of the recently saved jokes by users. 

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I made the header and footer full-width with a dark background, fixed the header at the top with a shadow, and centered the main content vertically with padding to avoid overlap with the fixed header.
- [x] **Navigation elements** - I styled the navigation elements by using a `<menu>` inside `<nav>`, making it a flex container centered with evenly spaced items, and giving the links a bold, yellow color that changes to orange with an underline on hover. However, note that `<menu>` is not the typical element used for navigation; `<ul>` is more common.

- [x] **Responsive to window resizing** - The header and footer span the full width of the viewport, while the main content remains centered using display: flex and min-height: 80vh to adjust with varying screen heights. The form and input fields use max-width: 400px and width: 100%, making them responsive while maintaining a structured layout. Additionally, using gap and padding for spacing ensures elements remain visually balanced across different screen sizes.
- [x] **Application elements** - I designed interactive components like a joke generator with dynamically updating text, a save joke button that appears conditionally, and a personalized welcome message extracted from the URL parameters. Additionally, the navigation menu, notifications, and structured layout ensure a user-friendly experience, while smooth animations and transitions enhance interactivity and responsiveness.
- [x] **Application text content** - I used application text content dynamically by displaying a personalized welcome message based on the URL parameters and updating the joke text upon button clicks. Additionally, you included pre-saved jokes from other users as part of the UI, reinforcing user interaction and engagement with meaningful and context-aware content.
- [x] **Application images** - I incorporated application images by including a favicon (favicon.ico) in the `<head>` section, which helps with branding and recognition in browser tabs. I also included an image in the about section with a feded gray border, the overall design relies on structured text and styled elements to create a visually engaging experience without requiring additional graphics.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.

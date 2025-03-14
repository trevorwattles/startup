# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

### My server http://54.197.191.110 or *.trevorscs260.click
When setting up a web server, using a cloud provider like AWS is more practical and secure than hosting it on your personal computer. AWS allows you to create a virtual server instance in a data center located in regions such as Virginia or Tokyo. To set up your server, log into the AWS console, navigate to the EC2 service, and ensure your region is set to US East (N. Virginia). Use the provided AMI ID (ami-018f3a022e128a6b2) to access a pre-configured image with Ubuntu, Node.js, NVM, Caddy Server, and PM2. Choose an instance type like t3.nano, t3.micro, or t2.micro depending on your needs and budget. Set up security by creating a key pair for SSH access and configuring security group rules to allow SSH, HTTP, and HTTPS traffic.

After launching the instance, copy its public IP address to access the server in your browser. To maintain consistent access, assign an Elastic IP address, ensuring it doesn’t change even if the server is stopped. Note that Elastic IP addresses are free while the associated server is running but incur minimal charges when the server is stopped. For SSH access, use your key pair and IP address. AWS allows you to scale your server's resources, so start with the t3.nano size for basic tasks and upgrade if necessary. Keep the server running for uninterrupted access, but you can stop it to save costs when not in use. Elastic IP ensures reliability and flexibility for your server’s configuration.

### Creating a domain
To make your web server accessible via a memorable and secure domain name, use AWS Route 53 to purchase and manage a domain. After registering a domain (e.g., mysite.click), create DNS records to map the domain and its subdomains (using a wildcard * record) to your server’s public IP address. This allows users to access your site via URLs like mysite.click or app.mysite.click. Ensure you verify your contact email during registration to prevent domain loss. AWS automatically creates critical NS and SOA records to ensure your DNS records are secure and authorized. Once configured, your domain will direct users to your server, though initial connections will lack HTTPS security, which can be resolved in future steps.

## HTML Notes

To deploy the **Simon HTML** project, use a **POSIX-compliant console** (not PowerShell or CMD) and run `deployFiles.sh` from the project directory. The script performs three key tasks: **deleting any previous deployment**, **uploading all project files**, and **ensuring Caddy hosts the site** under the `simon` subdomain (e.g., `simon.yourdomain.click`). To execute the deployment, use the command `./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon`, replacing the placeholders with your actual key and domain. For example, a typical deployment command might be `./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon`. After deployment, verify that your project is accessible online and update `notes.md` with any relevant observations.

# CSS Notes

## Overview
CSS (Cascading Style Sheets) enhances HTML by providing styling, responsiveness, and dynamic rendering capabilities. It allows developers to animate elements, apply custom fonts, and adapt layouts to different devices.

## CSS Rules  
CSS rules consist of selectors that target elements and declarations that define properties like color, font, and spacing. Styles can be applied in three ways:  
1. **Inline** - using the `style` attribute within an element.  
2. **Internal** - using a `<style>` tag inside the HTML document.  
3. **External** - linking to a separate `.css` file via the `<link>` element (preferred method).  

## The CSS Cascade  
The cascade determines how styles are applied based on inheritance and specificity, with lower-level rules overriding higher-level ones. Developers can inspect styles in a browser’s developer tools to understand how rules are applied.

## The Box Model  
The box model defines an element’s structure using four layers:  
- **Content** – The actual text or image inside an element.  
- **Padding** – Space between the content and the border, inheriting background styles.  
- **Border** – The outline surrounding the padding and content.  
- **Margin** – Space outside the border, affecting layout and spacing.  
The `box-sizing` property determines whether width and height include padding and border (`border-box`) or only content (`content-box`).

## CSS Versions  
CSS has evolved through different versions:  
- **CSS1 (1996)** – Introduced basic selectors, fonts, colors, margins, and borders.  
- **CSS2 (1998)** – Added positioning, `z-index`, bidirectional text, and shadows.  
- **CSS2.1 (2011)** – Removed incompatible features from CSS2.  
- **CSS3 (1999–present)** – Modularized enhancements for media queries, box layouts, multi-columns, and advanced selectors.  

CSS continues to evolve, with improvements in layout techniques, animations, and responsive design.

# CSS Selectors

## Overview  
CSS selectors define how styles apply to elements in an HTML document. There are multiple types of selectors, including element selectors (e.g., `body {}`), class selectors (e.g., `.summary {}`), and ID selectors (e.g., `#physics {}`), each used to target elements based on different criteria.

## Combinators  
Combinators specify relationships between elements, such as descendant selectors (`section h2 {}`), child selectors (`section > p {}`), and sibling selectors (`h2 ~ p {}`), allowing for more precise styling.

## Attribute & Pseudo Selectors  
Attribute selectors target elements based on attributes (e.g., `p[class='summary'] {}`), while pseudo selectors apply styles based on state or position (e.g., `section:hover {}` changes styling when hovered over).

## Example  
To highlight a section only on hover, use:  
```css
section:hover {
  border-left: solid 1em purple;
}
```


## first instruction notes

git clone "url" will put the repository into your working directory
git add --all will add the files ready to commit
git commit -am "your notes" will commit your changes
git push will push it all to your github

# Simon React Phase 2: Reactivity - Notes

## Component Reactivity
- Converted static JSX components into dynamic, interactive ones using `useState` and `useEffect`.
- Example: The `About` component now initializes state variables for an image and a quote, making it ready for future API integration.

## Play Component Structure
- Organized using parent-child components:
  - `Play` → `Players` (handles WebSocket messages) and `SimonGame` (handles game logic)
  - `SimonGame` → `SimonButton` (individual game buttons)
- Introduced `gameNotifier.js` to simulate incoming player scores.

## Game Logic Implementation
- **Key state variables:**
  - `allowPlayer`: Controls user interaction.
  - `sequence`: Stores the correct order of button presses.
  - `playbackPos`: Tracks the user’s progress in matching the sequence.
- Game rules enforced via `onPressed()` function, which checks button presses, updates progress, and handles mistakes.

## Scores Component
- Retrieves and displays saved scores from local storage.
- Uses JSX to dynamically generate a leaderboard table.

## Login & Authentication
- Implemented authentication state (`authState`) in `App.jsx`, affecting navigation menu visibility.
- Used state lifting to manage login/logout transitions between `Login`, `Authenticated`, and `Unauthenticated` components.
- **Future improvement:** Store authentication tokens instead of local username.

## Development & Deployment
- Cloned and explored the repository, debugging frontend and backend.
- Vite serves frontend dynamically (`npm run dev`); avoid using `live server`.
- Used `deployReact.sh` for production deployment, which bundles React files using Vite before uploading to the server.

## Next Steps
- Future enhancements include integrating real-time WebSockets for multiplayer interaction and fetching live quotes/images in `About`.
- Need to refine the login system with actual authentication and authorization mechanisms.

By implementing reactivity, we now have a functional, interactive Simon game ready for further enhancements.

# Simon Service Notes

-This project integrates a backend web service using Node.js and Express to serve the Simon frontend, manage authentication, and store high scores in memory. The service provides endpoints for user authentication (/api/auth/create, /api/auth/login, /api/auth/logout) and score management (/api/scores, /api/score), using JSON-based communication. Authentication relies on cookies, and password security is enhanced with bcrypt for hashing. A key part of the setup is middleware authentication (verifyAuth), which restricts access to certain endpoints, ensuring that only logged-in users can submit or retrieve scores. The service also dynamically fetches third-party content, such as inspirational quotes and random images, using external APIs.

-For development, Vite is configured to proxy API requests to the backend while serving the React frontend separately. The deployment process requires bundling the React app and copying it to the backend’s public directory so the service can serve it in production. The provided deployService.sh script automates this process, ensuring the correct port configurations for deployment. Debugging tools like VS Code’s debugger and browser dev tools help test and refine both backend and frontend functionalities. Understanding this structure is crucial for expanding the service, such as integrating persistent storage or adding new endpoints.


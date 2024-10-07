# Bocchi - Full Stack Anime Streaming Site

Bocchi is a modern, full-stack anime streaming platform that leverages the power of Next.js for server-side rendering and performance, and integrates with the [@consumet](https://www.npmjs.com/package/@consumet) API for retrieving anime data. Designed to deliver a seamless, immersive user experience, Bocchi is also installable as a Progressive Web App (PWA), allowing users to access the platform offline with mobile app-like functionality.

## Features

- **Anime Catalog:** Browse through a vast collection of anime titles powered by @consumet API.
- **Streaming Support:** Stream episodes directly within the app with a smooth user interface.
- **Next.js Framework:** Server-side rendering for optimal performance and SEO.
- **Progressive Web App (PWA):** Installable for offline usage with native-like app experience.
- **Responsive Design:** Tailored for both desktop and mobile devices using Tailwind CSS.
- **Efficient Data Fetching:** RTK Query for efficient and smooth client-side data fetching.

## Demo

Check out the live version of Bocchi: [Bocchi Demo](#)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sunder-kirei/bocchi_next.git
   cd bocchi_next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   API_URL="<hosted_ip | localhost:3000>/api"
   NEXT_PUBLIC_API_URL="<hosted_ip | localhost:3000>/api"
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## Technologies Used

- ### Frontend:

  - **Next.js** - React framework for server-side rendering and static site generation.
  - **Tailwind CSS** - Utility-first CSS framework for styling.

- ### Backend:

  - **@consumet** - API for fetching anime data.

## Contributing

Contributions are welcome! If you'd like to help improve Bocchi, feel free to fork the repository and submit a pull request.

1. Fork the repository
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request

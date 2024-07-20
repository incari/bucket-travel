# React + TypeScript Technical Test

Thank you for taking the time to review this project. I'm excited to share my work with you and look forward to your feedback.

## Demo

Visit the deployed application: [Bucket Travel](https://bucket-travel.vercel.app/)

## Installation

To set up this project locally, follow these steps:

1. **Clone the Repository**

   First, clone the project repository to your local machine using Git:

   ```bash
   git clone https://github.com/incari/bucket-travel
   cd  bucket-travel

   ```

2. **Install**

   ```bash
   npm install  or yarn install

   ```

3. **Run the App**

   ```bash
   npm run dev  or yarn dev
   
   ```


## Tech Stack

- Typescript.
- Tailwind Css.
- Next.js 14
- SWR (stale-while-revalidate) by Next.js
- React-hook-form
- Tamstack Query
- Axios

## Comments and Considerations  


As I mentioned in the email, I really like the idea of this product. I believe it has the potential to be a successful micro SaaS, helping people travel more comfortably.

### Issues and Solutions
I encountered a few issues during development. Firstly, the endpoint was unclear about which fields were required. The task description and designs included an "Introduction" field intended to be the main content of the card, but the endpoint did not return a value for it. I opted to use the "Description" field instead, limiting it to three lines as per the design. For new cards, if the user provides an Introduction value, it is displayed on the card; if it's empty, the Description is shown.

Another problem with the endpoint was that ID 5 was duplicated. This caused issues when trying to edit or delete the card. To avoid warnings and issues with having duplicate keys in a map function, I used the combination of the title and ID as a key.

### Data Fetching
I initially wanted to use Server-Side Rendering (SSR) for the first page when fetching data. However, I was using TanStack Query (React Query), and each time a user made a change, the UI reflected it, but the new data was fetched and overwritten again, causing problems. I removed SSR due to these issues. With more time, or an endpoint where I can modify the data directly, this would work nicely.

As an alternative, I could use SWR (stale-while-revalidate) by Next.js, but I am more comfortable with TanStack Query, especially under time constraints.

### Modals
I decided to use useSearchParams to open the modal. This way, you can copy a link and share it with another user, who can then see the card on the same page. If the URL contains an ID (/?modal=edit&id=1), the modal will try to find the data in the cache and, if not found, request the data from the endpoint, filling the form with the values.

I'm reusing the same modal for both edit and create actions. The header in all the modals is the same, and I added a small helper function to close it by hitting the ESCAPE key for better UX.

The save button closes the modal, but because it waits for a response, there is a slight delay. I could have added a loading state and disabled the button to show the user that the request is being processed.

### Filter Search and Tabs
The filter search bar works for the main content, Title, Introduction, and Description fields, and updates the data only when clicking the search button. Because of this, I added some useState to keep track of the search and filter state. I prefer the new approach of filtering on key-down, as it makes the app feel quicker and more responsive while requiring fewer internal states. The tab filter also works.

### Tests
I added tests for the main components: Card, Modal, and Tab buttons. The main features and actions are tested, but I can improve with more time by adding end-to-end (E2E) tests, especially for the hooks and modal form.



## Final Thoughts
I really enjoyed working on this project.

Thank you again for taking the time to review this project. 

Best, Martín.













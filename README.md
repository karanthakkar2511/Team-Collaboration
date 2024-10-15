# Team Collaboration Hub

This project is a user-friendly and responsive interface for the Team Collaboration Hub, allowing users to interact with tasks and a real-time messaging feature.

## Features

- User Authentication (Login and Registration)
- Dashboard with task management and recent activities
- Admin Dashboard for user management and task oversight
- Task Management with CRUD operations
- Real-time Chat using Socket.IO
- Responsive design using Tailwind CSS

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/devang/team-collaboration-hub.git
   cd team-collaboration-hub
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to view the application.

## Deployment

This project is deployed on Vercel. You can view the live version at: [Live URL]

## Technologies Used

- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Socket.IO (for real-time chat)
- Lucide React (for icons)

## Project Structure

- `/src`: Contains the source code for the application
  - `/components`: React components organized by feature
  - `/slices`: Redux slices for state management
  - `/store.ts`: Redux store configuration
  - `App.tsx`: Main application component
  - `index.css`: Global styles and Tailwind CSS imports

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


# Rcciit Coverage Team - Admin Panel & CRUD Application

A comprehensive admin panel and CRUD application for managing events, time periods, and resource links for Rcciit Coverage Team. Built with React, TypeScript, and Supabase for authentication and database management.

## Features

- 🔐 **Secure Authentication**: Login system with Supabase authentication
- 👨‍💼 **Admin Panel**: Protected admin interface for managing content
- 📅 **Time Period Management**: Create and manage academic periods
- 🎉 **Event Management**: Full CRUD operations for events
- 🔗 **Resource Links**: Manage and organize resource links for events
- 📊 **Dashboard**: Real-time statistics and activity overview
- 🎨 **Modern UI**: Beautiful interface built with shadcn/ui and Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Authentication & Database**: Supabase
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd rcciit-chronos-vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md)
   - Create a `.env` file with your Supabase credentials

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:5173
   - Navigate to `/login` to access the admin panel

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   └── ui/             # shadcn/ui components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and configurations
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   ├── auth/           # Authentication pages
│   └── public/         # Public pages
├── routes/             # Routing configuration
└── services/           # API service layer
```

## API Integration

The application uses Supabase for all data operations:

- **Authentication**: Email/password login with role-based access
- **Events**: Create, read, update, delete events with period associations
- **Periods**: Manage time periods with active/inactive status
- **Resource Links**: Organize links with event associations
- **Dashboard**: Real-time statistics and activity tracking

## Admin Features

### Dashboard
- Overview of system statistics
- Recent activity feed
- Quick action buttons
- System status monitoring

### Event Management
- Create new events with descriptions
- Associate events with time periods
- Edit and delete existing events
- View event details and associated resources

### Period Management
- Create academic time periods
- Set start and end dates
- Mark periods as active/inactive
- Manage period lifecycle

### Resource Link Management
- Add resource links to events
- URL validation and domain extraction
- Copy links to clipboard
- Organize resources by event

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control (admin/user roles)
- Protected routes for admin functionality
- Secure authentication with Supabase

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For setup assistance, refer to the [Supabase Setup Guide](./SUPABASE_SETUP.md).

## License

This project is licensed under the MIT License.

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6bf3926f-4da5-4a51-8591-2d8f3faa98f2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6bf3926f-4da5-4a51-8591-2d8f3faa98f2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

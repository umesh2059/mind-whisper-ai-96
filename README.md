    # AI Mental Healthcare Platform

    A modern, AI-powered web application designed to support mental health and wellness. This platform provides personalized mood tracking, AI-driven chat support, mental health assessments, and curated resources—all in one accessible interface.

    ## 🌟 Features

    ### 📊 Dashboard
    - **Mood Tracking Visualization**: Interactive charts displaying your mood trends over time
    - **Wellness Metrics**: View your current streak, average mood score, and chat session history
    - **Personalized Suggestions**: Get recommended wellness activities including breathing exercises, journaling, and calming playlists
    - **Quick Access**: Navigate to key features directly from your dashboard

    ### 💬 AI Chatbot
    - **Intelligent Conversations**: Powered by Groq AI for responsive, empathetic support
    - **Crisis Detection**: Automatic alerts with emergency resources if crisis keywords are detected
    - **Emergency Support**: Direct access to crisis hotlines (988 Suicide & Crisis Lifeline)
    - **Chat History**: Persistent conversation records for continuity of care

    ### 🎯 Assessments
    - **Mental Health Evaluations**: Structured questionnaires to assess your mental wellbeing
    - **Personalized Insights**: Get meaningful analysis based on your responses

    ### 📈 Mood Tracker
    - **Daily Mood Logging**: Simple interface to record your daily mood
    - **Trend Analysis**: Visualize patterns and correlations over time
    - **Streak Tracking**: Stay motivated with streak counters

    ### 📚 Resources
    - **Curated Information**: Access mental health tips, coping strategies, and wellness content
    - **External Links**: Connect to verified mental health organizations and support networks

    ### 🔐 Authentication
    - **Secure Sign-In**: User accounts powered by Supabase
    - **Data Privacy**: Your data is encrypted and protected
    - **Personalized Experience**: All features adapt to your profile

    ## 🛠️ Tech Stack

    ### Frontend
    - **React 18** - UI library with hooks
    - **TypeScript** - Static typing for robustness
    - **Vite** - Lightning-fast build tool and dev server
    - **TailwindCSS** - Utility-first CSS framework
    - **shadcn/ui** - High-quality, accessible React components
    - **Framer Motion** - Smooth animations and transitions
    - **React Router** - Client-side routing
    - **React Hook Form** - Efficient form management
    - **Recharts** - Beautiful, responsive charts

    ### Backend & Services
    - **Supabase** - Backend-as-a-service (authentication, database)
    - **Groq API** - Fast AI inference for chatbot responses

    ### Development Tools
    - **ESLint** - Code quality and linting
    - **Vitest** - Unit testing framework
    - **PostCSS** - CSS processing

    ## 🚀 Getting Started

    ### Prerequisites
    - Node.js (v16 or higher)
    - Bun or npm package manager

    ### Installation

    1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd AI_mentalHealthcare
    ```

    2. **Install dependencies**
    ```bash
    bun install
    # or
    npm install
    ```

    3. **Set up environment variables**
    Create a `.env.local` file in the root directory:
    ```
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_GROQ_API_KEY=your_groq_api_key
    ```

    4. **Start the development server**
    ```bash
    bun run dev
    # or
    npm run dev
    ```
    The application will be available at `http://localhost:5173`

    ## 📦 Available Scripts

    - `bun run dev` - Start development server
    - `bun run build` - Build for production
    - `bun run build:dev` - Build in development mode
    - `bun run lint` - Run ESLint code quality checks
    - `bun run preview` - Preview production build locally
    - `bun run test` - Run tests once
    - `bun run test:watch` - Run tests in watch mode

    ## 📁 Project Structure

    ```
    src/
    ├── components/          # Reusable UI components
    │   ├── Navbar.tsx
    │   └── ui/             # shadcn/ui component library
    ├── contexts/           # React Context API (Auth)
    ├── pages/              # Page components for each route
    │   ├── Index.tsx       # Landing page
    │   ├── Login.tsx       # Authentication
    │   ├── Dashboard.tsx   # Main dashboard
    │   ├── Chatbot.tsx     # AI chat interface
    │   ├── Assessment.tsx  # Mental health assessment
    │   ├── MoodTracker.tsx # Mood tracking
    │   ├── Resources.tsx   # Resources and information
    │   └── NotFound.tsx    # 404 page
    ├── hooks/              # Custom React hooks
    ├── lib/                # Utility functions
    ├── integrations/       # External API integrations
    │   ├── groq/          # Groq AI client
    │   └── supabase/      # Supabase client & types
    ├── App.tsx            # Main App component with routing
    └── main.tsx           # Entry point
    ```

    ## 🔐 Security & Crisis Support

    This app includes automatic crisis detection:
    - **Keywords Monitored**: Detects mentions of self-harm, suicide, or crisis situations
    - **Immediate Resources**: When detected, provides emergency hotline information
    - **988 Lifeline**: Direct integration with the National Suicide Prevention Lifeline

    ⚠️ **Important**: While this app provides support, it is not a replacement for professional mental health care. Always seek help from licensed professionals if you're in crisis.

    ## 👤 Authentication Flow

    1. Users land on the **Index/Landing** page
    2. Click "Sign In" to navigate to **Login** page
    3. Authenticate using email/password (Supabase)
    4. Upon success, access the full dashboard and features
    5. User context is maintained via `AuthProvider`

    ## 🎨 UI/UX Highlights

    - **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
    - **Dark Mode Support**: Follows system preferences with TailwindCSS
    - **Smooth Animations**: Framer Motion provides polished transitions
    - **Accessible Components**: Built with accessibility in mind using Radix UI primitives
    - **Modern Aesthetics**: Clean, calming design focused on mental health

    ## 🧪 Testing

    Run the test suite with:
    ```bash
    bun run test
    ```

    Watch mode for development:
    ```bash
    bun run test:watch
    ```

    ## 📊 Future Enhancements

    - Advanced analytics and mood pattern analysis
    - Integration with wearable devices for holistic wellness tracking
    - Therapist recommendations based on assessments
    - Community support groups and forums
    - Mobile app (React Native)
    - Multi-language support
    - Export mood data and reports

    ## 📝 License

    [Add your license information here]

    ## 🤝 Contributing

    Contributions are welcome! Please follow these steps:
    1. Fork the repository
    2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
    3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
    4. Push to the branch (`git push origin feature/AmazingFeature`)
    5. Open a Pull Request

    ## 🆘 Support

    For mental health support, please reach out to:
    - **988 Suicide & Crisis Lifeline**: Call or text 988
    - **Crisis Text Line**: Text HOME to 741741
    - **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

    ## 📧 Contact & Feedback

    Have feedback or questions? Feel free to open an issue or reach out to the development team.

    ---

    **Built with ❤️ for mental health and wellness.**

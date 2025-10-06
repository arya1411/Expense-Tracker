# 💰 Expense Tracker

A full-stack web application for tracking personal income and expenses with beautiful visualizations and comprehensive financial management features.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT-based authentication
- **Income Management**: Add, view, edit, and delete income entries
- **Expense Tracking**: Comprehensive expense tracking with categories
- **Dashboard Analytics**: Visual representation of financial data with charts
- **File Uploads**: Support for receipt/document uploads
- **Excel Export**: Export financial data to Excel format
- **Responsive Design**: Modern UI built with React and TailwindCSS
- **Real-time Updates**: Instant feedback with toast notifications

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **Emoji Picker React** - Emoji selection

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication tokens
- **Bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **XLSX** - Excel file generation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/arya1411/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 3. Frontend Setup

```bash
cd Frontend/expense-tracker
npm install
```

Create a `.env` file in the Frontend/expense-tracker directory (if needed):
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

## 🚦 Running the Application

1. Start MongoDB service
2. Start the backend server (runs on port 5000)
3. Start the frontend development server (runs on port 5173)
4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
Expense_Tracker/
├── Backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware (auth, etc.)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files storage
│   ├── server.js        # Entry point
│   └── package.json
│
└── Frontend/
    └── expense-tracker/
        ├── src/
        │   ├── components/  # Reusable components
        │   ├── context/     # React context providers
        │   ├── pages/       # Page components
        │   └── App.jsx      # Main app component
        ├── public/
        └── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login

### Income
- `GET /api/v1/income` - Get all income entries
- `POST /api/v1/income` - Create income entry
- `PUT /api/v1/income/:id` - Update income entry
- `DELETE /api/v1/income/:id` - Delete income entry

### Expense
- `GET /api/v1/expense` - Get all expense entries
- `POST /api/v1/expense` - Create expense entry
- `PUT /api/v1/expense/:id` - Update expense entry
- `DELETE /api/v1/expense/:id` - Delete expense entry

### Dashboard
- `GET /api/v1/dashboard` - Get dashboard analytics

## 🎨 Features in Detail

### Dashboard
- Total income and expense overview
- Balance calculation
- Visual charts and graphs
- Recent transactions list

### Income & Expense Management
- Add entries with title, amount, date, and category
- Emoji support for categories
- File attachment support
- Edit and delete functionality
- Filter and search capabilities

### User Experience
- Clean and intuitive interface
- Responsive design for all devices
- Real-time validation
- Loading states and error handling
- Toast notifications for user feedback

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Arya**
- GitHub: [@arya1411](https://github.com/arya1411)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- UI components inspired by modern design principles

---

Made with ❤️ by Arya

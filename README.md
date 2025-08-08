AI Enhanced E-commerce Product Catalog

An intelligent e-commerce product catalog application featuring AI powered product recommendations, advanced search capabilities, and dynamic filtering.

I chose option C

AI Feature Implemented
here is overview loom link :https://www.loom.com/share/ad3f87c8d2c34839bc2bf767f1e662ed?sid=c87181bf-c568-4bed-8b71-1c658b62808e
Recommendation System
A sophisticated rule based AI recommendation engine that suggests products based on:
• User preferences (categories, budget, rating preferences)
• Product similarity (category matching, price proximity)
• Product quality (ratings and reviews)
• Intelligent scoring algorithm with randomization for variety

Features

Core Functionality
• Product Catalog: Display of 12 curated products with complete details
• Advanced Search: Text based search across product names, descriptions, and categories
• Price Filtering: Dynamic price range filtering with visual sliders
• Category Filtering: Filter by electronics, men's clothing, women's clothing, and jewelry

AI Powered Features
• Personalized Recommendations: AI suggests 4 products based on user preferences
• User Preference Learning: System learns and remembers user preferences locally
• Smart Scoring Algorithm: Combines multiple factors for intelligent product recommendations
• Real time Updates: Recommendations update instantly as preferences change

Product Information
Each product includes:
• Product name and description
• Price and category
• Star ratings (visual and numeric)
• High quality product images
• Add to cart functionality

Tools & Libraries Used

• Frontend: React 18.2.0, React Router DOM 6.4.0
• State Management: Redux 4.2.0, React Redux 8.0.2
• UI Components: Bootstrap 5.2.1, Reactstrap 9.2.2
• User Experience: React Hot Toast 2.4.1, React Loading Skeleton 3.1.0
• AI Implementation: Custom rule based recommendation algorithm
• Data Storage: Local JSON data, localStorage for user preferences

Installation & Setup

Prerequisites
• Node.js (version 14 or higher)
• npm or yarn package manager

Installation Steps

Clone or navigate to the project directory:

bash
Copy
Edit
cd ecommerce
Install dependencies (use legacy peer deps to resolve React version conflicts):

css
Copy
Edit
npm install --legacy-peer-deps
Start the application:

Copy
Edit
npm start
Access the application:

arduino
Copy
Edit
http://localhost:3000
AI Implementation Details

Recommendation Algorithm
The AI recommendation system uses a sophisticated scoring algorithm:

Category Matching (30 points): Products in similar categories get priority

Price Proximity (20 points): Products with similar price ranges are preferred

Rating Boost (10 points per rating): Higher rated products score better

User Preference Match (25 points): Products matching user's preferred categories

Budget Alignment (15 points): Products within user's specified budget range

Quality Preference (20 points): Bonus for highly rated products when user prefers quality

Randomization (5 points): Small random factor for variety

User Preference System
• Persistent Storage: User preferences saved in localStorage
• Multi Category Selection: Users can select multiple preferred categories
• Dynamic Budget Range: Adjustable min/max price preferences
• Quality Preference: Option to prioritize highly rated products
• Real time Updates: Recommendations refresh immediately on preference changes

Notable Assumptions

Static Product Data: Uses curated JSON data instead of external APIs for reliability

Client side Recommendations: AI runs in browser for instant responses

Local Storage: User preferences stored locally (no user accounts needed)

Rule based AI: Deterministic algorithm with controlled randomization

Bootstrap Styling: Leveraged existing Bootstrap for consistent UI

Blockchain Integration Possibilities

The AI recommendation system could be enhanced with blockchain features:

Token Gated Pricing: NFT holders could receive exclusive discounts or access to premium products, with the recommendation engine prioritizing token gated items for verified holders

On Chain User Preferences: User preferences and browsing history could be stored on chain as encrypted data, enabling cross platform personalization while maintaining privacy through zero knowledge proofs

Loyalty Smart Contracts: A decentralized loyalty program where users earn tokens for purchases and engagement, with the AI adjusting recommendations based on token holdings and reward tier status

Video Walkthrough

A 2 to 3 minute video demonstration would showcase the AI recommendation system, user preference settings, search/filter functionality, and the overall user experience

Project Structure

sql
Copy
Edit
src/
├── components/
│ ├── Products.jsx Main product catalog with search/filter
│ ├── RecommendationEngine.jsx AI recommendation system
│ ├── UserPreferences.jsx User preference management
│ └── ...
├── data/
│ └── products.json Product catalog data
└── ...
Performance & Scalability

• Optimized React components with proper state management
• Efficient filtering and search algorithms
• Responsive design for all device types
• Lazy loading for improved performance
• Modular architecture for easy feature expansion

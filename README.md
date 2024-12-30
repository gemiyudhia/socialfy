# Socialfy  

**Socialfy** is a social media web application.  

## Features  

- **User Authentication**: Users can register and log in to their accounts.  
- **User Profiles**: Each user has a personal profile page.  
- **Posts**: Users can create posts.  
- **Social Interactions**: Users can like and comment on posts.  

## Technologies Used  

- **Next.js**: A React framework for server-side rendering and web app development.  
- **Tailwind CSS**: A utility-first CSS framework for responsive designs.  
- **TypeScript**: A JavaScript superset that adds static typing.  
- **Firebase**: A backend platform for authentication and data storage.  

## Installation  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/gemiyudhia/socialfy.git
   ```  

2. **Navigate to the project directory**:  
   ```bash
   cd socialfy
   ```  

3. **Install dependencies**:  
   ```bash
   npm install
   ```  

4. **Configure Firebase and NextAuth**:  
   - Create a project on [Firebase Console](https://console.firebase.google.com/).  
   - Set up [NextAuth.js](https://next-auth.js.org/) with your preferred provider.  
   - Obtain your Firebase configuration and create a `.env` file in the project root with the following content:  

     ```plaintext
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     
     # NextAuth Secret
     NEXTAUTH_SECRET=your_secret
     ```  

5. **Run the application**:  
   ```bash
   npm run dev
   ```  

   The app will run at `http://localhost:3000`.  

## Usage  

- **Sign Up**: New users can register by filling out the sign-up form.  
- **Log In**: Registered users can log in with their credentials.  
- **Create Posts**: Once logged in, users can create new posts.  
- **Engage**: Users can like and comment on posts.  

## Contribution  

This project still has many areas for improvement. If you'd like to contribute, feel free to fork this repository and submit a pull request with your proposed changes. Let's collaborate and make Socialfy better together!  

## License  

This project is licensed under the [MIT License](LICENSE).  

## Contact  

If you have any questions, feel free to reach out via Instagram DM at [@yuudhia](https://instagram.com/yuudhia) or email me at gemiyudhiaa@gmail.com.  

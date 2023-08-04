# Law Reading Robot Frontend

This is the frontend for the Law Reading Robot app, a part of the Code For Pittsburgh initiative. The backend code can be found at the partner repo: [https://github.com/CodeForPittsburgh/law-reading-robot-data/tree/master](https://github.com/CodeForPittsburgh/law-reading-robot-data/tree/master).

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

You will need to obtain the database connection string and key from a Code for Pittsburgh member and add them to a `.env.local` file on your local machine to access the app's database. The `.env.local` file should contain the following variables:

```bash
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SUPABASE_URL=your_supabase_url
```

Please request these details in the Code for Pittsburgh Slack channel.

## Development

The following scripts are available for you to run:
1. **Install all Packages**
   ```
   npm install
   ```
2. **Start the Development Server**
   ```
   npm start
   ```
   This script runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make changes. Any lint errors will be visible in the console.

3. **Run Tests**
   ```
   npm test
   ```
   This script launches the test runner in the interactive watch mode. More information about running tests can be found [here](https://facebook.github.io/create-react-app/docs/running-tests).

4. **Build the App**
   ```
   npm run build
   ```
   This script builds the app for production to the `build` folder, correctly bundling React in production mode and optimizing the build for the best performance. More information about deployment can be found [here](https://facebook.github.io/create-react-app/docs/deployment).

5. **Eject**
   ```
   npm run eject
   ```
   **Note: `eject` is a one-way operation. Once you `eject`, you can't go back!** If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command removes the single build dependency from your project, providing you full control over the build tool configuration.

## Additional Resources

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Troubleshooting: 'npm run build' fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Remember, you never have to use `eject`. It's a powerful tool for customizing your build configuration, but it's a one-way operation and is only necessary if you're not satisfied with the default configuration.

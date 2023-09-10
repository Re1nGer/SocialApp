# React Social App

![React Logo](https://img.icons8.com/color/48/000000/react-native.png)
![TypeScript Logo](https://img.icons8.com/color/48/000000/typescript.png)
![TailwindCSS Logo](https://img.icons8.com/color/48/000000/tailwindcss.png)
![Firebase Logo](https://img.icons8.com/color/48/000000/firebase.png)
![ASP.NET Logo](https://img.icons8.com/color/48/000000/asp.png)

This is a social app written in React that allows users to upload and share posts, send friend requests, and chat on DM. The app uses various technologies including React, CSS, Firebase, MongoDb, Postgres, and Asp.NET WEB API.

## Technologies Used

- React
- TailwindCSS
- Firebase Auth
- Postgres
- Asp.NET WEB API
- GetSreamIO

## Before you run
Before you can run this project, you need to set up the following environment variables:

1. `VITE_RAPID_URL`: The URL for the Rapid API service.
2. `VITE_RAPID_HOST`: The host name for the Rapid API service.
3. `VITE_RAPID_KEY`: Your API key for the Rapid API service.
4. `VITE_STREAM_KEY`: The stream key for your application.
5. `VITE_API_DOMAIN`: The domain for your API.

Follow these steps to set up the environment variables:

### Using a `.env` File

1. Create a file named `.env` in the root directory of the project.
2. Open the `.env` file in a text editor.

```plaintext
VITE_RAPID_URL=your_rapid_url
VITE_RAPID_HOST=your_rapid_host
VITE_RAPID_KEY=your_rapid_key
VITE_STREAM_KEY=your_stream_key
VITE_API_DOMAIN=your_api_domain
```

## Obtaining Required Environment Variables

To successfully set up the environment variables, you need to obtain specific values for each variable. Follow the instructions below to acquire them:

### `VITE_RAPID_URL`, `VITE_RAPID_HOST`, `VITE_RAPID_KEY`

1. Visit [RapidAPI Documentation](https://docs.rapidapi.com/) to create an account and log in.
2. Follow the documentation to find the RapidAPI service you need for your project.
3. Obtain the `VITE_RAPID_URL`, `VITE_RAPID_HOST`, and `VITE_RAPID_KEY` values provided by RapidAPI.

### `VITE_STREAM_KEY`

1. Go to [GetStream](https://getstream.io/) and create an account or log in.
2. Follow their documentation to create a new application.
3. Obtain the `VITE_STREAM_KEY` from your GetStream application.

### `VITE_API_DOMAIN`

1. Clone the backend repository for your project by running the following command:

```bash
git clone https://github.com/Re1nGer/SocialAppBackend.git
```

## Getting Started

To get started with this app, follow the instructions below:

### Prerequisites

Make sure you have installed the following software on your machine:

- Node.js
- Git

### Installing

1. Clone this repository using Git:
    ```
    git clone https://github.com/your-username/your-repo.git
    ```
2. Navigate to the project directory:
    ```
    cd your-repo
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Start the app:
    ```
    npm start
    ```
5. Note you need to get NewsCatcherAPI to get Feed Page working correcrtly

The app should now be running on [http://127.0.0.1:5173/](http://127.0.0.1:5173) in your browser.

## Features

- Dalle II integtated for image generation
- Rapid API for generating caption out of image
- Google SignIn
- Post Creating
- Post liking and commenting
- Friend requests
- DM chat
  

## Images

![image](https://github.com/Re1nGer/SocialApp/assets/63101847/546b5a4b-5e39-4989-99a2-e45f55cb8d4f)


## Contributing

If you are interested in contributing to this project, please fork the repository and submit a pull request. We welcome contributions of all types, including bug fixes, feature requests, and documentation improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

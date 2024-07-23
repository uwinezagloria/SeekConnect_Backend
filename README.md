# SeekConnect_Backend
# SeekConnect Backend Project

## Project Overview
SeekConnect is a platform designed to help individuals who have lost their important documents, such as National ID, Driving License, and other critical items, to report their loss and facilitate the process of recovering these documents if found by someone else and also missing people. The platform allows users to report their lost items and people, and if someone finds these documents  and people, they can post them on the platform. The public can view these posts, and if the document and missing people matches the lost item and missing people, they can contact us. Additionally, the system notifies the user via email if a found document matches their reported lost item.SeekConnect also includes a mechanism to avoid duplicate reports by checking if a reported lost document has already been found by someone else before allowing a new report

## Features
- **Report Lost Documents**: Users can report their lost documents with details.
- **Post Found Documents**: Users who find lost documents can post them on the platform.
- **Public View**: The public can view the posted found documents.
- **Notification System**: The platform notifies users via email when a found document matches their reported lost document.
- **Full CRUD Operations**: The platform supports full Create, Read, Update, and Delete operations for managing user information and reported documents.

## Technologies Used
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**:jsonwebtoken(jwt)
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary for storing images of documents
- **Email Service**: NodeMailer for sending email notifications
- **Hashing password**: Bcrypt for hashing passwords
- **API Documentation**: swagger-jsdoc and swagger-ui-express for swagger documentation
## Endpoints
### User Endpoints
- **POST /create/user**: Register a new user
- **GET /all/users**: Get all users
- **GET /user/email**: Get user by email
- **GET /user/id**: Get user by ID
- **DELETE /user/id**: Delete user by ID
- **PATCH /user/id**: Update user details

### Authentication Endpoints
- **POST /verify/otp**: Verify OTP
- **POST /login**: User login

### Contact Us Endpoints
- **POST /create/contactUs**: Create a contact us entry
- **GET /all/contactUs**: Get all contact us entries
- **DELETE /remove/contactUs**: Delete a contact us entry

### Business Endpoints
- **POST /create/business**: Create a new business

## Getting Started
### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
    ```sh
    git@github.com:uwinezagloria/SeekConnect_Backend.git
    ```
2. Install dependencies:
    ```sh
    cd  SeekConnect_Backend
    npm install
    ```
3. Set up environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    PORT=1000(example but add yours)
    MONGODB_URI=your_mongodb_uri
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_pass
    ```

### Running the Server
Start the development server:
```sh
npm run dev

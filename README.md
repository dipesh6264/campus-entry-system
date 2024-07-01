# E-Gate System

The E-Gate System is designed to streamline the entry process for students, visitors, and cab drivers at IIT Gandhinagar. This project includes modules for user authentication, QR code generation, and entry logging. Guards can verify users and grant access based on their QR codes.

## Modules

### 1. Student Module

Allows students to register by providing their name, roll number, mobile number, and IITGN email ID. An OTP is sent to their email for verification. Once verified, a QR code is generated for entry.

### 2. Visitor Module

Visitors can register by providing their details and the person they are visiting. An OTP is sent to their email for verification. Once verified, a QR code is generated for entry.

### 3. Guard Module

Guards can log in to access the interface for scanning QR codes and viewing logs. They can also generate QR codes for cab drivers by verifying their details.

### 4. Cab Driver Module

Cab drivers need to visit Gate 1 at IIT Gandhinagar. The guard will verify their information and generate a QR code for them, which they can use for subsequent entries.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Steps to Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/dipesh6262/campus-entry-system.git
    ```
2. Navigate to the project directory:
    ```sh
    cd campus-entry-system
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up the environment variables in a `.env` file:
    ```plaintext
   MONGODB_URI=mongodb://localhost:27017/campus_entry_system
   PORT=3000
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=
   EMAIL_PASS=
   GUARD_NAME = guard
   GUARD_PASSWORD = password
    ```
5. Start the application:
    ```sh
    node app.js
    ```

## Demonstration
<img width="700" alt="chat2" src="https://github.com/dipesh6264/campus-entry-system/assets/134261406/760913fc-6482-4738-86d7-63f7837543c0">

### Student Registration

1. Go to the student registration page: `/student`
2. Fill in your details and click **Verify Email**.
3. Enter the OTP sent to your email and click **Generate QR Code**.

<img width="700" alt="chat2" src="https://github.com/dipesh6264/campus-entry-system/assets/134261406/168cd89b-90b6-4f9d-8ba3-65c92a679b99">



### Visitor Registration

1. Go to the visitor registration page: `/visitor`
2. Fill in your details and click **Verify Email**.
3. Enter the OTP sent to your email and click **Generate QR Code**.
<img width="700" alt="chat2" src="https://github.com/dipesh6264/campus-entry-system/assets/134261406/43629824-679d-48f2-ab51-c429cd856dce">



### Guard Login and Actions

1. Go to the guard login page: `/guard`
2. Enter your username and password and click **Login**.
3. After logging in, you can scan QR codes or view scan logs.
<img width="700" alt="chat2" src="https://github.com/dipesh6264/campus-entry-system/assets/134261406/09313172-a1b7-439f-8bba-7c58f652d508">


### Cab Driver QR Code Generation

Cab drivers should visit Gate 1 at IIT Gandhinagar. The guard will verify the driver's information and generate a QR code, which can be used for subsequent entries.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

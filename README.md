# E-Gate System

Welcome to the E-Gate System project. This application is designed to manage and verify entry for students, visitors, and cab drivers at IIT Gandhinagar. The system uses QR codes for verification and logging entries.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Modules](#modules)
- [Setup](#setup)
- [Usage](#usage)
- [Demonstration](#demonstration)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The E-Gate System is a comprehensive application that facilitates secure and efficient entry management for IIT Gandhinagar. It includes modules for students, visitors, cab drivers, and guards, each with specific functionalities.

## Features

- **Student Module**: Registration, OTP verification, QR code generation.
- **Visitor Module**: Registration and QR code generation.
- **Cab Driver Module**: Registration, vehicle information verification, and QR code generation.
- **Guard Module**: Login, QR code scanning, and data display.

## Modules

### Student Module
- Registration form to input name, roll number, mobile number, and email ID.
- Email verification with OTP.
- QR code generation upon successful verification.

### Visitor Module
- Registration form for visitor information.
- QR code generation for entry.

### Cab Driver Module
- Form to input driver name, mobile number, car number, and car name.
- Verification by guard and QR code generation for entry.

### Guard Module
- Login form for guards.
- QR code scanning for verifying students and visitors.
- Display of scanned data.
- Cab driver QR code generation.

## Setup

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/e-gate-system.git
   cd e-gate-system ```


2. Set up environment variables
Create a .env file in the root directory and add the following variables:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/egate
SESSION_SECRET=your_secret_key ```



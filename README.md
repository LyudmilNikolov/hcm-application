# Human Capital Management App

This is a Human Capital Management (HCM) application that helps manage employee information and operations. Follow the steps below to set up and run the application.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js 18.17.1](https://nodejs.org/)
- [Angular CLI 17](https://cli.angular.io/)
- [JSON Server](https://www.npmjs.com/package/json-server) (for running a local database)

## Installation

Follow these steps to set up the application environment:

1. **Clone the repository:**

```bash
git clone https://github.com/LyudmilNikolov/ukg_front_end_assignment_2024_hcm_lyudmil_nikolov.git
```

2. **Navigate to the project directory:**

```bash
cd ukg_front_end_assignment_2024_hcm_lyudmil_nikolov
```

3. **Install the dependencies:**

```bash
npm install
```

4. **Start the Angular Development Server:**

```bash
ng serve
```

## Setting up the Backend

The application uses JSON Server to mock a backend that provides a REST API interface.

1. **Install JSON Server globally:**

```bash
npm install -g json-server
```

2. **Start JSON Server with the provided dataset:**

```bash
json-server --watch src/assets/data/db.json
```

JSON Server will run on http://localhost:3000 by default. The application's API calls will be directed to this serve

## Logging In

To log in to the HCM application, use an email from the provided dataset in `db.json`. There are different user roles with different levels of access:

- **HR Super User:**

  - Email: `trinaconrad@ezent.com`
  - Password: Any non-empty value (e.g., `password`)

- **Normal User:**
  - Email: `cooperdodson@mobildata.com`
  - Password: Any non-empty value (e.g., `password`)

Please note that there is no registration feature, and you must log in using the pre-defined users in the database.

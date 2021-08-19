<center><img src="https://i.ibb.co/MsPChWS/lenucar.png" id="header" ></center>

---

> Len-U-Car is an application that connects people who want to rent out their cars with people who are looking to borrow a car in that locale.

### Table of Content

- [Description](#description)
- [Technologies](#technologies)
- [Wireframes](#wireframes)
- [User Stories](#user-stories)
- [Author Info](#author-info)

---

## Description

Len-U-Car is an application that is modelled after Airbnb. It takes on the clean and intuitive design of Airbnb to provide a smooth and easy navigation for both the car providers and consumers.

<div align="right">
    <b><a href="#header">↥ back to top</a></b>
</div>

## Technologies

### Built with

1. Postgresql
   - Redis
   - Knex
2. Cloudinary
3. Multer
4. Express
   - Bcrypt
   - Sessions
5. React
   - React Modern Calendar Datepicker
   - Hooks: useState, useEffect
   - React Dropzone
   - React Query
   - Material-UI
   - React Slick
   - Typescript
   - JS Cookie
   - Formik
   - Yup
6. Node
7. AJAX/ Axios
8. Heroku

### Setting up Dev

To develop the app, clone the project and install the dependencies listed in `package.json` with:

```
git clone https://github.com/SparrowMike/len-u-car.git
cd len-u-car
npm ci
```

You may host the services on your preferred cloud service and set up your `.env` with your local ports, e.g.,

```
PORT = 4000
SECRET=YourSecretHere
REDISPW=YourRedisPassword
POSTGRESPW=YourPostgresqlPassword
CLOUDINARY_API_KEY=CloudinaryAPIKey
CLOUDINARY_API_SECRET=CloudinarySecretHere
CLOUDINARY_NAME=CloudinaryName
HEROKU_POSTGRESQL_URL=postgres://user:password@host:port/database
```

After which, install the React app in the `client` folder

```
cd client
npm ci
```

<div align="right">
    <b><a href="#header">↥ back to top</a></b>
</div>

## Wireframes

### Landing Page

<img src="https://i.ibb.co/2h5vH0d/Landing.png" width="500px">

### Register/ Login Page

<img src="https://i.ibb.co/yVwLtNF/Register.png" width="500px">

### Profile Page

<img src="https://i.ibb.co/SKjkXTr/Profile.png" width="500px">

### Browse Page

<img src="https://i.ibb.co/sybT63R/Browse.png" width="500px">

### Car Details Page

<img src="https://i.ibb.co/4F6RvXw/Detail.png" width="500px">

<div align="right">
    <b><a href="#header">↥ back to top</a></b>
</div>

## User Stories

### Landing Page

1. A user should be able to navigate to "Browse", "Register" or "Login".
2. A user should be able to view the cars on display but not able to access the full details.

### Authentication

1. A user should be able to register an account with simple details.
2. A user should be able to log into the newly created account.

### Profile

1. A user should be able to edit his personal details.
2. A user should be able to register his personal car and its image.
3. A user should be able to change password of his account.
4. A user should be view all his bookings.
5. On the "Bookings" page, a user should be able to review his bookings and archive them.

### Browse

1. A user should be able to access any car displayed on screen.
2. A user should be able to filter the cars according to the type, transmission and engine type.

### Details Page

1. A user should be able to see the full details of the car owner and the car details.
2. A user should be able to select the date and book it.
3. A user should not be able to choose dates which are already booked.
4. A user should be able to view the ratings and reviews left by past users of the car.

<div align="right">
    <b><a href="#header">↥ back to top</a></b>
</div>

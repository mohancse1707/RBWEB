## ReserveBuddy Web Application

### Introduction

Travel Portal Application for Flight bookings

### Technologies

**Frontend**

* [Node] v12.18.3 
* Npm v6.x.x
* React Redux
* Typescript
* Webpack
* AntD

### App Structure

```bash

├── reserve-buddy-web
│   ├── src
│   │   ├── main
│   │   │   ├── web
│   │   │   |   ├── app
│   │   │   │   |  ├──common
│   │   │   │   |  ├──modules
│   │   │   │   |  ├──settings
│   │   │   │   |  ├──routes.tsx
│   │   │   │   |  ├──index.tsx
│   │   │   |.  ├── index.html
│   │── webpack

```
Let's get into build and deployment steps. 

### Development Profile

Open the terminal or command-line shell then navigate to the application path and execute the below script. 

**Run the react client**

In Terminal#1 Navigate to ```reserve-buddy-web``` and execute below command 

> Terminal#1: npm install && npm run staging


[Node]:https://nodejs.org/download/release/v12.18.3/
[Java]:https://www.npmjs.com/package/jest
[Maven]:https://www.npmjs.com/package/express

```node
npm i -S @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome axios bootstrap loaders.css lodash moment react react-dom react-hot-loader react-loadable react-redux  react-redux-loading-bar react-router-dom react-toastify react-transition-group reactstrap redux redux-devtools redux-promise-middleware redux-thunk tslib uuid jquery
```

```node
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"admin","password":"xyz","emailId":"mohan.cse17@gmail.com","firstName":"Mohan","lastName":"Rathinam"}' \
  http://localhost:8080/app/rest/myaccount/customer/registerCustomer
```

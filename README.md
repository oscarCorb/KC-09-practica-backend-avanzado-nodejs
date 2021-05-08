# nodeCasa 🏠 Household articles API


### Deploy

Rename .env-example to test API

```
mv .env-example .env
```


### How to run the API

Load sample products into local MongoDB:

```bash
npm run init-db
```

Run the API server:

```bash
npm run dev
```


### How to run microservices (thumbnail generation)

Go to microservices folder

```bash
cd microservices
```

Run Thumbnail microservice

```bash
npm run thumbnailService
```


## API Documentation

Get JWT to authenticate

```
/api/authenticate
```

The whole API documentation is available at the following link: [https://documenter.getpostman.com/view/13659366/TW74jkVD#a26e78be-45a5-4e05-af88-879a49448d24](https://documenter.getpostman.com/view/13659366/TW74jkVD#a26e78be-45a5-4e05-af88-879a49448d24)


## Front-end website

Product list: [http://localhost:3000/products](http://localhost:3000/products)

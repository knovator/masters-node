<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/knovator/masters-node">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">@knovator/masters-node</h3>

  <p align="center">
    NodeJS package that integrate API for @knovator/masters-node in nodejs application
    <br />
    <a href="https://github.com/knovator/masters-node"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/knovator/masters-node">View Demo</a>
    ·
    <a href="https://github.com/knovator/masters-node/issues">Report Bug</a>
    ·
    <a href="https://github.com/knovator/masters-node/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#parameter-explanations">Parameter Explanations</a></li>
      </ul>
    </li>
    <li>
      <a href="#routes-infomration">Routes Information</a>
      <ul>
        <li><a href="#response-codes">Response Codes</a></li>
        <li><a href="#custom-validation-messages">Validation Messages</a></li>
        <li><a href="#http-status-codes">HTTP Status Codes</a></li>
        <li><a href="#routes">Routes</a></li>
        <li><a href="#i18n-code-for-messages">i18n Message Codes</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

`@knovator/masters-node` is built with intent to faster development cycle by providing plug & play facility for masters/submasters, that is used almost on every project.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Typescript](https://www.typescriptlang.org/)
* [mongoose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To integrate `@knovator/masters-node`, you should be having basic `nodejs` application up and running with `express` (optionally using `mongoose` for `mongodb` database). `@knovator/masters-node` add routes for **masters** in application.

### Prerequisites

- It's good start to have `nodejs` application up and running with `express` (optionally using `mongoose` for `mongodb` database). Good to have used [i18next](https://www.npmjs.com/package/i18next) to add message in response codes.
- `routes` uses `mongoose` connection established by application, so it's required to connect to database before using package. Example,
  ```js
  // db.js
  const mongoose = require('mongoose');

  mongoose
    .connect('mongodb://localhost:27017/knovator')
    .then(() => console.info('Database connected'))
    .catch((err) => {
      console.error('DB Error', err);
    });

  module.exports = mongoose;
  ```
- Image upload route for `upload` & `remove` is needed to declare externally. Example,
  ```js
  // fileRoute.js
  const express = require('express');
  const router = express.Router();

  router.post(`/files/upload`, (req, res) => {
      // TO DO: some file storage operation
      let uri = "/image.jpg";
      let id = "62c54b15524b6b59d2313c02";
      res.json({
        code: 'SUCCESS',
        data: { id, uri },
        message: 'File uploaded successfully'
      });
  });

  router.delete(`/files/remove/:id`, (req, res) => {
      // TO DO: some file remove operation
      res.json({
          code: 'SUCCESS',
          data: {},
          message: 'File removed successfully'
      })
  })

  module.exports = router;
  ```



**Sample App file**
  ```js
    require('./src/db');
    require('./src/models/file');

    const cors = require('cors');
    const express = require("express");
    const fileRoutes = require('./fileRoute.js');
    const PORT = 8080;

    const app = express();
    app.use(cors());
    app.use(express.static("public"));
    app.use(fileRoutes);

    // ...
    app.listen(PORT, () => {
        console.log(`App started on ${PORT}`);
    });
  ```


### Installation

<!-- 1. Get a free API Key at [https://example.com](https://example.com) -->
1. Install library
   ```sh
   npm install @knovator/masters-node
   # or
   yarn add @knovator/masters-node
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

App/Main file is a good place to use `@knovator/masters-node`
  ```js
    ...
    const { masters } = require('masters-node');
    
    // ...
    app.use("/admin/masters", masters());
    app.listen(PORT, () => {
        console.log(`App started on ${PORT}`);
    });
  ```

Masters package allows providing `authentication`, `logger` and `catchAsync` functions as parameters.
  ```js
  app.use("/admin/masters", masters({
    authentication: (req, res, next) => {...},
    logger: console,
    catchAsync: (function) => (req, res, next) => {...}
  }));
  ```

### parameter explanations

- `authentication`
  - Provides ability to add authentication to routes
    ```js
    // default
    (_req, _res, next) => {
      return next();
    }
    ```
- `logger`
  - Provides ability to add logging for Database and Validation
    ```js
    // default
    console
    ```
- `catchAsync`
  - Wraps functions to handle async errors
      ```js
      // default
      function catchAsync(fn) {
        return function (req, res, next) {
          Promise.resolve(fn(req, res, next)).catch((err) => {
            // this.logger.error(err.message);
            res.status(internalServerError).json({
              code: RESPONSE_CODE.ERROR,
              message: err.message,
              data: {},
            });
          });
        };
      }
      ```
## Routes Infomration

Response follows following structure
```js
{
  code: RESPONSE_CODES,
  message: "" // if internationalized is applied
  data: {}
}
```

### Response Codes
| Code | Description |
| --- | ----------- |
| SUCCESS | When request fullfiled without error |
| ERROR | When request fullfiled with error |

### Custom Validation messages
| Message | Description |
| --- | ----------- |
| Master exists | When master/submaster with same code is exist in database |

### HTTP Status Codes
| HTTP | Description |
| --- | ----------- |
| 200 | When request fullfiled without error |
| 201 | When document is created |
| 500 | When internal server occurred |
| 422 | When Validation error occurred |

### Routes
| Route | Description |
| --- | ----------- |
| `/create` | Creates Master/SubMaster record |
| `/update:id` | Updates Master/SubMaster record |
| `/partial-update/activate/:id` | Turn on/off `isActive` field based on body data |
| `/partial-update/default/:id` | Turn on/off `isDefault` field based on body data |
| `/partial-update/web-visible/:id` | Turn on/off `isWebVisible` field based on body data |
| `/partial-update/sequence/:id` | Sets sequence of record with `:id`, and updates affected records sequence |
| `/delete` | Delete the record whose `id` send in body |

### `i18n` code for messages

Nextjs [i18n](https://www.npmjs.com/package/i18next) package adds facility for internationalization in nodejs application, and it's used in following mannerr
```js
// usage
req?.i18n?.(CODE)
```
| CODE | Description |
| --- | ----------- |
| `(master/submaster).create` | When record is created |
| `(master/submaster).update` | When record is updated |
| `(master/submaster).activate` | When `isActive` is set to true |
| `(master/submaster).deactivate` | When `isActive` is set to false |
| `(master/submaster).display` | When `isWebVisible` is set to true |
| `(master/submaster).notDisplay` | When `isWebVisible` is set to false |
| `(master/submaster).default` | When `isDefault` is set to true |
| `(master/submaster).notDefault` | When `isDefault` is set to false |
| `submaster.seq` | When sequence is updated |
| `(master/submaster).delete` | When delete is performed |
| `(master/submaster).findAll` | When all data is fetched |
| `(master/submaster).notFound` | When Master/Submaster data is not found |

### `descriptor` codes
| Code | Description |
| --- | ----------- |
| `master.create` | For Create API |
| `master.update` | For Update API |
| `master.active` | For `isActive` toggle API |
| `master.default` | For `isDefault` toggle API |
| `master.webVisible` | For `isWebVisible` toggle API |
| `master.sequence` | For `sequence` update API |
| `master.softDelete` | For Soft-Delete API |
| `master.list` | For List API |

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Knovator Technologies
- Twitter [@knovator](https://twitter.com/knovator)
- Web [https://knovator.com/](https://knovator.com/)

Project Link: [https://github.com/knovator/masters-node](https://github.com/knovator/masters-node)

<p align="right">(<a href="#top">back to top</a>)</p>
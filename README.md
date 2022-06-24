<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/knovator/masters">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">@knovator/masters-node</h3>

  <p align="center">
    NodeJS package that integrate API for @knovator/masters in nodejs application
    <br />
    <a href="https://github.com/knovator/masters"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/knovator/masters">View Demo</a>
    ·
    <a href="https://github.com/knovator/masters/issues">Report Bug</a>
    ·
    <a href="https://github.com/knovator/masters/issues">Request Feature</a>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `knovator`, `masters`

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

To integrate `@knovator/masters`, you should be having basic `nodejs` application up and running with `express` (optionally using `mongoose` for `mongodb` database). `@knovator/masters` add routes for **masters** in application.

### Prerequisites

As mentioned it's good start to have `nodejs` application up and running with `express` (optionally using `mongoose` for `mongodb` database). Good to have used [i18next](https://www.npmjs.com/package/i18next) to add message in response codes.
* Sample App file
  ```js
    const express = require("express");
    const app = express();

    ...
    app.listen(PORT);
  ```


### Installation

<!-- 1. Get a free API Key at [https://example.com](https://example.com) -->
1. Install library
   ```sh
   npm install @knovator/masters-node
   or
   yarn add @knovator/masters-node
   ```
2. Enter database & timezone information in `.env`
   ```js
        DB_CONNECTION=mongodb
        DB_HOST=localhost
        DB_PORT=27017
        DB_DATABASE=knovator
        TZ=Asia/Colcutta
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

App/Main file is a good place to use `@knovator/masters`
  ```js
    const express = require("express");
    const app = express();
    const { masters } = require('masters-node');
    
    ...
    app.use("/admin/masters", masters());
    app.listen(PORT);
  ```

Masters package allows providing `authentication`, `logger`, `convertToTz` and `catchAsync` functions as parameters.
  ```js
  app.use("/admin/masters", masters({
    authentication: (req, res, next) => {...},
    logger: console,
    catchAsync: (function) => (req, res, next) => {...},
    convertToTz: ({ tz, date }) => {...}
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
- `convertToTz`
  - Provides ability to convert date to other timezone
    ```js
    // default
    function convertToTz({ date, tz }) {
      return date
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
| `/soft-delete` | Soft Delete (fill `deletedAt` field) of record `id` send in body |

### `i18n` code for messages

Nextjs [i18n](https://www.npmjs.com/package/i18next) package adds facility for internationalization in nodejs application, and it's used in following mannerr
```js
// usage
req?.i18n?.(CODE)
```
| CODE | Description |
| --- | ----------- |
| `master.codeExists` | When master/submaster record is exist with same code |
| `master.create` | When record is created |
| `master.update` | When record is updated |
| `master.activate` | When `isActive` is set to true |
| `master.deactivate` | When `isActive` is set to false |
| `master.display` | When `isWebVisible` is set to true |
| `master.notDisplay` | When `isWebVisible` is set to false |
| `master.default` | When `isDefault` is set to true |
| `master.notDefault` | When `isDefault` is set to false |
| `master.seq` | When sequence is updated |
| `master.delete` | When delete is performed |
| `master.findAll` | When all data is fetched |
| `master.masterNotFound` | When Master data is not found |


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

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/knovator/masters](https://github.com/knovator/masters)

<p align="right">(<a href="#top">back to top</a>)</p>

# HPSA Client project

This is the first iteration of HPSA Client project.
Dev environment for this project bootstrapped from [angular-seed] project.

## Getting Started

To get you started you can simply clone the HPSA Client repository and install the dependencies.

### Prerequisites

You need [git] & [node] to be installed on your computer.

### Clone hpsa-client

Clone the hpsa-client repository using [git]:

*TBD: Add link to hpsa-client repository from bitbucket server*

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Current Scope

Iteration 1

1. Application should include three web pages.

        1.1. Page 1 has a link to page 2

        1.2. Page 2 has table of items (expenses)

                        1.2.1. Expenses table should have the following columns

                                        a) Date

                                        b) Category

                                        c) Vendor

                                        d) Amount

                                        e) Receipt - link to page with receipt image

                                        f) Personal

        1.3. Page 3 has image of the receipt

        1.4. Each page should have the following counters:

                        1.4.1. Server name from which page is got

                        1.4.2. Time took to generate the page

[angular-seed]: https://github.com/angular/angular-seed.git
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server

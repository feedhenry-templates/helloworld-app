# Helloworld app
---------
Author: Erik Jan de Wit   
Level: Intermediate   
Technologies: Javascript, Cordova, RHMAP   
Summary: A demonstration of how to use [FH JavaScript SDK](https://github.com/feedhenry/fh-js-sdk) with RHMAP.   
Community Project: [Feed Henry](http://feedhenry.org)   
Target Product: RHMAP   
Product Versions: RHMAP 3.8.0+   
Source: https://github.com/feedhenry-templates/sync-cordova-app   
Prerequisites: fh-js-sdk : 2.14.+, Cordova 5.0+   

## What is it?

This application shows how you can use cloud call with the RHMAP platform, it should be used in combination with the [HelloWorld cloud app](https://github.com/feedhenry-templates/helloworld-cloud). Refer to [fhconfig.json](www/fhconfig.json) for configuration.

If you do not have access to a RHMAP instance, you can sign up for a free instance at [https://openshift.feedhenry.com/](https://openshift.feedhenry.com/).

## How do I run it?  

### RHMAP Studio

This application and its cloud services are available as a project template in RHMAP as part of the "Hello World Project" template.

### Local Clone (ideal for Open Source Development)
If you wish to contribute to this template, the following information may be helpful; otherwise, RHMAP and its build facilities are the preferred solution.

###  Prerequisites  
 * fh-js-sdk : 2.14.+
 * cordova: 5.0+

## Build instructions
 * npm install
 * Edit [fhconfig.json](www/fhconfig.json) to include the relevant information from RHMAP.  
 * Build and run locally
```
cordova serve  
```
Go to [http://localhost:8000/](http://localhost:8000/)

### npm dependencies
The `fh-js-sdk` and other development dependencies are defined in [package.json](package.json) and included in a [browserified script](www/main.js).

* This generated [main.js](www/main.js) file is checked-in to allow RHMAP studio preview to statically serve dependencies.

* The [init.js](www/js/init.js) file is browserified and acts as a bridge between template script and npm dependencies. 

* All the other JavaScript files in the template app will not be browserified, in order for you to be able to experiment live edit in RHMAP Studio preview.

### Updating fh-js-sdk version
To update the JS SDK:
- change the version in [package.json](package.json)
- run `npm install` a grunt task is automatically ran to regenerate main.js
- check-in git repo the npackage.json + main.js

### Grunt

This template uses [Grunt](http://gruntjs.com/), the Javascript Task Runner. To use Grunt with this Template App, do the following:

* Install grunt: ```npm install -g grunt-cli```
* In your App directory, run: ```npm install```. This installs Grunt plugins, etc for use with this App.
* Run ```grunt serve``` to preview this App locally


### FeedHenry local development

You can also use Grunt to point your App at a local developement server. To do this, use the ```grunt serve:local``` command. Some notes on using the serve:local task:

* by default, the local server development url is: http://localhost:8001
* you can change this directly in your local Gruntfile.js, in the app config:

```
  app: {
    // configurable paths
    app: 'www',
    url: '',
    default_local_server_url: 'http://localhost:8001'
  },
```

* you can also pass a 'url' optional flag to server:local, e.g. ```grunt serve:local --url=http://localhost:9000```

* We can also write your own tasks by extending the Gruntfile.js, e.g. add a 'serve:live' target that hits your server in your FeedHenry live enivronment.






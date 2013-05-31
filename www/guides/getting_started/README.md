# Getting Started with Sencha Touch

## What is Sencha Touch?

Sencha Touch enables you to quickly and easily create HTML5-based apps that work on 
mobile devices, and produce a native-app-like experience inside a browser or in a hybrid shell.
Sencha Touch supports Android, iOS, Windows Phone, Microsoft Surface Pro and RT, and Blackberry devices.

## Prerequisites

Download the free [Sencha Touch SDK](http://www.sencha.com/products/touch/download/) and
[Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download) from the Sencha website. Sencha Cmd also 
installs Ant, Ruby, Sass, and Compass, which you can use to build applications and other useful tasks.

You also need:

 - A web server running locally on your computer, for example, [XAMPP](http://www.apachefriends.org/en/xampp.html)
 - A modern web browser; [Chrome](https://www.google.com/chrome) and [Safari](http://www.apple.com/safari/download/) are recommended

If you are running the IIS web server on Windows, manually add `application/x-json` 
as a MIME Type for Sencha Touch to work properly. For information on adding this MIME type 
see the following link: [http://stackoverflow.com/a/1121114/273985](http://stackoverflow.com/a/1121114/273985).

## Installation

Extract the SDK zip file to your projects directory. Ideally, this folder is accessible 
to your HTTP server. For example, you should be able to navigate to the installed 
http://localhost/sencha-touch-2.n directory from your browser and see the Sencha Touch documentation.

You also need to run the Sencha Cmd installer. The installer adds the `sencha` command line tool 
to your path, enabling you to generate a fresh application template, among other things. 
To check that you have correctly installed Sencha Cmd, change to your Sencha Touch directory,
and type the `sencha` command, for example:

    $ cd ~/webroot/sencha-touch-2.n/
    $ sencha
    Sencha Cmd v3.1.n
    ...

**Note** When using the `sencha` command, you *must* be inside either the 
downloaded SDK directory or a generated Touch app. For further details see 
the [Sencha Cmd](#!/guide/command) documentation.

## Generating Your First App

Now that you have Sencha Touch and Sencha Cmd installed, you can generate an application. 
While still in the Sencha Touch SDK folder, type the following:

    $ sencha generate app MyApp ../MyApp
    [INFO] Created file ...
    ...

This generates a skeleton Sencha Touch application namespaced to the `MyApp` variable 
and located in the `../MyApp` directory (one level up from the Sencha Touch SDK directory). 
The skeleton app contains all the files you need to create a Sencha Touch application, 
including the default index.html file, a copy of the Touch SDK, the CSS file, images 
and configuration files for creating native packages for your app.

You can verify if your application has generated successfully by opening it in a 
web browser. Assuming that you extracted the SDK to your webroot folder, you should 
be able to navigate to `http://localhost/MyApp`.

## Explore the Code

The following listing provides a short description of each file and directory, 
the complete list of the generated files can be found in the [Sencha Cmd](#!/guide/command) documentation:

  - **`app`** - The directory containing the Models, Views, Controllers, and Stores for your app.
  - **`app.js`** - The main JavaScript entry point for your app.
  - **`app.json`** - The configuration file for your app. 
  - **`index.html`** - The HTML file for your app.
  - **`packager.json`** - The configuration file used by Sencha Cmd for creating native packages for your application.
  - **`resources`** - The directory containing the CSS and the images for your app

Open `app.js`, the main entry point for your app, in your editor.

The `launch` function is the entry point to your application. 
In the default application, hide the application loading indicator, 
and create an instance of our Main view and add it to the Viewport.

The Viewport is a {@link Ext.layout.Card Card layout} to which 
you can add application components. The default app adds the 
`Main` view to the viewport so it becomes visible on the screen. 

Look at the code inside the Main view.

Open `app/view/Main.js` in your code editor and change a title line to:

    title: 'Home Tab'

Then change another line as follows:

    title: 'Woohoo!'

Also, change lines as follows:

    html: [
        "I changed the default <b>HTML Contents</b> to something different!"
    ].join("")

Refresh the app in your browser to see the effects of your changes.


## Next Steps

The next step is to follow the [First Application guide](#!/guide/first_app), 
which builds on this guide, and which guides you through 
creating a simple but powerful app in around 15 minutes. 

If you would like to skip ahead or find out more detailed information about 
other aspects of the framework, view the following guides and resources:

### Guides

* [What's New in Sencha Touch](#!/guide/whats_new)
* [Components and Containers](#!/guide/components)
* [Intro to Applications](#!/guide/apps_intro)
* [The Layout System](#!/guide/layouts)
* [The Data Package](#!/guide/data)

### Application Examples

* [Kitchen Sink](#!/example/kitchen-sink)
* [Twitter](#!/example/twitter)
* [Kiva](#!/example/kiva)

### Component Examples

* [Carousel](#!/example/carousel)
* [Forms](#!/example/forms)
* [Date Picker](#!/example/pickers)

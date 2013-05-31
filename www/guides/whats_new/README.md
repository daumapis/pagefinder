# What's New in Sencha Touch

The following is a list of the new features and functionalities in Sencha Touch.

## Welcome to Sencha Touch

Sencha Touch provides an HTML5 mobile framework.

## Sencha Touch 2.2 Features

Sencha Touch 2.2 adds support for new tools and devices, and
lets you measure performance with these features:

- Sencha Cmd 3.1 and Sencha Architect 2.2 support
- Internet Explorer 10 support
- Microsoft Surface Pro and Surface RT, Windows Phone, and BlackBerry 10 support
- Icon font-face support
- Platform detection in app.json for changing themes
- Platform config option to change settings by platform or theme
- Performance improvements
- Measure performance with the showfps URL option
- Experimental support for FireFox 21, Opera Mobile, Chrome pixel mouse and touch inputs
- User interface changes

In addition, extensive bug fixes were made - see the Release Notes.

<a name="SenCmd"></a>
### Sencha Cmd 3.1 and Sencha Architect 2.2 Support

Sencha Touch 2.2 requires the use of the free
[Sencha Cmd 3.1](http://www.sencha.com/products/sencha-cmd/download) or later to package apps.
Sencha Architect 2.2 also requires use of Sencha Cmd 3.1 or later.
Sencha Cmd 3.1 removes the need to have Sass and Compass installed on your computer
since it uses its own bundled version of Sass and Compass. Sencha Cmd 3.1 also provides Ant
and the new "sencha app package" command for packaging apps for mobile devices.

<a name="ie10"></a>
### Internet Explorer 10 Support

Internet Explorer 10 has its own theme or can use the Sencha Touch theme. In the
current release, Back and Forward buttons with an arrow on the left or right side
of the button render without the arrow. Buttons with arrows are only supported on
WebKit browsers.

<a name="SurfBB"></a>
### Surface and BlackBerry 10 Support

Sencha Touch features now work on the Microsoft Surface Pro, Surface RT,
Windows Phone, and BlackBerry 10 devices.
Theming support is provided for the BlackBerry 10.
If you are developing an app for Windows Phone or BlackBerry, you can
use [Apache Cordova](http://cordova.apache.org/) to package your app.

<a name="fontface"></a>
### CSS3 font-face Support

Sencha Touch no longer uses WebKit masks for icons and now uses CSS3 font-face.
This change significantly improves performance and scaling.
This change requires that you convert your icons into a font file and specify
the file's URL in your application's CSS file. For more information on font-face,
see [font-face rule](http://www.w3.org/TR/css3-fonts/#font-face-rule). The font
file can be True Type (TTF), Scaled Vector Graphics (SVG), or Embedded Open Type (EOT).
The web provides many tools for converting a PNG graphics file to a font, for example,
[Pictos Server](http://pictos.cc/server/) or [Pictonic](https://pictonic.co/).

You can view the [Sencha Touch icon font](http://www.pictos.cc/font) library. Sencha
lets you use this font in your apps free of charge and without a license. The font is
provided in the Touch 2.2 and later software download distribution as an EOT, SVG,
and TTF file. For Android and iOS apps, Touch automatically
adds the font library to an app you package using Sencha Cmd 3.1 or later.

<a name="platdet"></a>
### Platform Detection for Themes

Sencha Touch uses a whitelist to detect platforms for themes the same as ExtJS.
The Touch theme feature is also implemented similar to ExtJS except that
Touch has three schemes, plus the base class, and you can add custom themes.
Touch themes are .scss files generated through use of Sass.
[Sencha Cmd 3.1](http://www.sencha.com/products/sencha-cmd/download) installs Ruby and Sass for you.

Touch also differs from ExtJS by its
DOM structure that enables Touch to normalize browser access for its
components.

Touch detects the Chrome, Safari, and iOS platforms, and loads the Touch theme as
the default. If you don't specify a theme, Touch uses its default theme. Touch
provides three themes: Sencha Touch default, IE10, and BlackBerry 10. These
themes extend the Touch base class, which is in the base.scss file in the software
distribution.

To create a theme, install [Sencha Cmd 3.1](http://www.sencha.com/products/sencha-cmd/download) 
or later on your computer.
In Touch, creating a theme means creating a .scss file using Sass. You can
also extend any of the Touch themes or the base class.

For more information on creating and using themes, see
[Theming](http://docs.sencha.com/ext-js/4-2/#!/guide/theming) in the ExtJS
documentation.

**Note** As you add settings to your theme, test their performance using the
new showfps feature, which lets you view how theme settings
affect animation performance.

The Touch software distribution provides SCSS files for the themes that you can
use or change as required. Each component has its own CSS file, for example button.css
is for buttons and a button.js file that accompanies use of the component.
Update a Ruby Sass file which generates the CSS file.

**Important** To use themes, in Touch 2.2, you must include the base class
base.css file in your app in addition to your theme's CSS file.

<a name="platfig"></a>
### Platform Config Option

This feature lets you modify configuration options depending on what platform you're
using or what theme you're using. An example of how to use this is for scaling graphics
between operating system types. For example, for a Mac you may want to use one size
graphic and on Windows another size.

<a name="perfim"></a>
### Performance Improvements

The following improvements in Sencha Touch 2.2 improve performance:

- Scrolling indicators were refactored and cleaned up to use the fastest indicators
for each platform
- Translatable class logic improved and optimized for each platform
- ScrollPosition has been updated to use a static large size instead of having to dynamically
measure, which improves performance for Android 2 and Internet Explorer - this is created as
a 1 million-pixel &lt;div&gt; block to ensure any scroll component fits
- Unified animation queue that improves performance - use the [showfps option](#showfps)
feature to measure the performance
- Updated the List component to improve performance
- Memory leak issues for charts and datastore were fixed
- Chart type renderers APIs were unified and cleaned up so that all follow the same pattern.
Anyone who created customizations for the chart APIs may need to rework their code accordingly
- Refactored the pullToRefresh plugin for performance and consistency

<a name="showfps"></a>
### Measure Animation Performance With the showfps URL Option

For debug applications, add the **?showfps** option to the URL to display animation
performance information about an application where you enable debugging. The display lists the
performance information for the average number of animation transitions, the current transition,
and the minimum and maximum values for the last 1000 transitions. This feature is very
useful for performance testing and creating benchmark data.

**Note** The showfps feature only works on browsers that support requestAnimationFrame. If
the browser only uses a fallback, a message appears indicating that the results may not be
accurate. In this case, the information measures how fast JavaScript runs the app, but
not how fast the animation draws on the screen. The native Android browsers do not support
requestAnimationFrame, but Chrome for Android does. In the case of the native Android
browsers, the animation sampling is based on 60 frames per second; however, this does not
necessarily mean the browser is painting the animation at that rate. Browsers that do support
requestAnimationFrame means that the showfps feature accurately measures each animation
display.

<a name="exsu"></a>
### Experimental Support

Sencha Touch provides support for FireFox 21, which is currently in Alpha.
The Mozilla implementation is experimental and relies on the FireFox 21 nightly
build of its flexible box implementation. Sencha is working with the Mozilla team on known
layout issues. Most examples run, including the Kitchen Sink, but your mileage
may vary. Do not use this for production applications.

<a name="uichg"></a>
### User Interface Changes

The IconMask option in the button components was removed. In Touch 2.2, icons no longer use masks,
they now use the CSS3 font-face feature.

## Sencha Touch 2.1 Features

Version 2.1 focused on performance -- getting apps running fast
and on as many devices as possible. In Sencha Touch
version 2.1 and later, apps start much faster, provide a much
snappier initial rendering and layout, and redraw immediately
when users rotate a device.

Version 2.1 enhancements:

 - A new scroller, optimized for each platform and faster than
ever - especially on Android devices. The rendering process has
been optimized and components are reused without the app having
to instantiate new ones.

 - Many innovations that originate from Ext JS 4, including the
new advanced class system, reconfigurable components, and
improvements to the application architecture.

 - Increased support for a wider range of devices with reduced
emphasis on WebKit, and a more robust platform that can be used
to support more devices over time.

## Smaller, Faster Layout Engine

Sencha Touch offers a very flexible layout system that makes it
easy to lay out apps for a variety of device shapes and sizes.
Sencha Touch provides a layout engine that runs much more like
the browser's optimized CSS engine, the result being enormously
improved performance in several key areas:

* On startup, apps render and display faster
* After rotating the device, updating the screen is much faster
* The layout engine is much smaller, resulting in faster download

The result is a massively improved layout performance across all
areas. Screens are rendered much faster when navigating through
the app, giving a much more fluid experience. The most dramatic
improvement occurs when a device changes orientation. To see the
impact of the new layout engine, here is a video of the
Kitchen Sink buttons example running on the current Sencha Touch
and its previous version, slowed down to one quarter of its normal speed:

<a style="text-align: center" href="http://vimeo.com/30296006"><img src="http://img1.sencha.com/files/misc/20111010-video-full.jpg" /></a>

## Stronger, Smarter Core

Sencha Touch benefits from a development environment that is shared
with Ext JS. The Ext JS 4 environment brought about a range of new
innovations that are now also build into Sencha Touch, including the following:

* Upgraded class system with support for dynamic loading and dependencies
* Support for class configurations as a core construct, which provides you
with free getter and setter functions and results in a clean, consistent API

## Faster Start up Time

Sencha Touch starts faster, providing nearly
a 10% to 25% improvement in startup time on a range of devices, as
shown when testing the Kitchen Sink example. On many devices, the
current version of Sencha Touch loads apps almost a second faster
than previous versions:

<img src="http://img1.sencha.com/files/misc/20111010-sencha-touch-startup-times.png" />

## Class System and Apps

Sencha Touch uses the powerful new class system derived from Ext JS 4.
This provides all the benefits of dynamic loading, intelligent builds
that only include the classes you use, mixins, configurations, and all
the other features of the new engine. For details, see the
[How to use classes in Sencha Touch 2](#!/guide/class_system) guide.

Sencha Touch also includes the Ext JS 4 application architecture,
including ComponentQuery and production build support.

## Config-driven Components

One of the benefits of the Sencha Touch class system is its
'configs', simple properties that automatically provide getter and
setter functions, defaults, and more.

Sencha Touch makes use of the config system throughout the framework.
Whenever you see a config on a class, you already know that you can
reconfigure it at any time (even after it is rendered). Even better,
because the config's setter name always follows the same pattern,
you already know what function to call.

For example, you can give a {@link Ext.form.Text Text Field} a label
when you instantiate it and can easily change it later:

	var text = Ext.create('Ext.form.Text', {
		label: 'My Field'
	});

	//anything we can configure also has a setter function
	//its name always follows the setConfigName pattern
	text.setLabel('Another Field');

Configs are an important enhancement because they give classes a very
clean API. For each class, everything you see in the 'Config options'
section in the API documentation is a true config, complete with
standardized getter and setter functions.

For a full overview of the new capabilities see the
<a href="#!/guide/class_system">Class System guide</a>.

## Improved MVC Capabilities

Sencha Touch provides a simple way to organize your application
based on the Model View Controller (MVC) paradigm and incorporates
full history support, a powerful way to control Components,
and a powerful way to customize your application for
different screen sizes.

In addition, the data package has been ported to use the
new class system, making it much more flexible and improving
performance. For a full overview on the MVC improvements in
Sencha Touch see the following guides:

* <a href="#!/guide/apps_intro">Intro to Applications</a>
* <a href="#!/guide/profiles">Profiles</a>
* <a href="#!/guide/controllers">Controllers</a>
* <a href="#!/guide/history_support">History Support</a>

## Much Better Android Support

Sencha Touch provides Android performance enhancements for
scrolling and animation, and an optimized mechanism for
achieving both smooth scrolling and fast, fluid animations,
as illustrated by the following video that demonstrates
Touch v1 versus v2 performance improvements on Android devices:

<a style="text-align: center" href="http://vimeo.com/30324079"><img src="http://img1.sencha.com/files/misc/20111010-video-sm.jpg" /></a>

## Native Packaging

Sencha Touch makes it easy to build and deploy apps to both the
Google Play store and the Apple App Store. The Sencha Cmd utility, which
is available for Mac OS X and Windows, provides the packaging
capabilities as well as new APIs to access native device functionality.
For all the details on how to use the new packaging capabilities,
see [Native Packaging guides](#!/guide/native_packaging).

If you are developing an app for Windows Phone or BlackBerry, you can
use [Apache Cordova](http://cordova.apache.org/) to package your app.

## Improved Docs

Sencha Touch features excellent documentation in the API reference documentation,
which include live examples that you can run from within your browser
to let you see (and even modify) the example code. Touch also
brings all of the Sass variables for each component into the API docs,
making it much easier to see the items that you can customize.

The Sencha Touch [guides](#!/guide) have been updated and refreshed.
We provide guides that explain core concepts such as layouts, components,
and classes, and others that cover how to use components such as tab panels,
forms, and carousels. The documentation also includes a new
Getting Started guide that takes you through building your first app from scratch.

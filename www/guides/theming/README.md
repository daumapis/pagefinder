# Theming Sencha Touch

Sencha Touch theming works the same as in ExtJS. For more information, see 
the [ExtJS Theming Guide](http://docs.sencha.com/ext-js/#!/guide/theming).

Touch 2.2 introduced these new features and changes:

 - [Platforms](#Platforms)
 - [Themes](#Themes)
 - [platformConfig](#PlatformConfig)
 - [Base Theme](#BaseTheme)
 - [List Component](#ListComponent)
 - [Icon Fonts](#IconFonts)

<a name="Platforms"></a>
## Platforms

Sencha Touch 2.2 introduces the capability of defining platforms, which gives you the ability to load 
specific resources in your application based on the platform on which your app runs. 

In the following example from an application's `app.json` file, the application loads the 
`sencha-touch.css` file when the app runs on Chrome, Safari, iOS, Android, or Firefox:

    "css": [
        {
            "path": "resources/css/sencha-touch.css",
            "platform": ["chrome", "safari", "ios", "android", "firefox"]
        }
    ]

You can specify multiple platforms and use it to load JS resources. In this example, the `vendorfiles.js` 
resource loads when the platform is Chrome, Safari, or iOS:

    "js": [
        {
            "path": "vendorfiles.js",
            "platform": ["chrome", "safari", "ios"]
        }
    ]

Each loads only if the platform of the device running the app matches a platform you specify 
for the resource. 

You can test this functionality by using the `platform` parameter in a URL:

    http://localhost/sdk/touch/examples/kitchensink/index.html?platform=ie10

You can also detect which platform the device is running on from within your application by using 
`platformConfig`.

The list of available platforms are:

- android
- blackberry
- chrome
- desktop
- firefox
- ie10
- ios
- phone
- safari
- tablet

<a name="Themes"></a>
## Themes

Themes are a set of CSS styles you can set
to change an application's appearance for a device or platform. You can reference the styles
as resources in your `app.json` file for your application. 

Sencha Touch provides a base theme that you can 
customize, a Sencha Touch theme, an IE10 theme for Windows Phone and Surface, and a BlackBerry 10 theme. 
To code a theme, use Compass and Sass, which are provided when you install 
[Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download).

In this example, the `Apple` theme loads only when the platform is iOS. When the iOS platform loads, 
your app knows that the current theme is `Apple`:

    "css": [
        {
            "path": "resources/css/sencha-touch.css",
            "platform": ["ios"],
            "Theme": "Apple"
        }
    ]

Within your application, you can access a theme name by using `Ext.theme.name`.

If you do not define a theme, the theme name is `Default`.

You can test themes by using the `theme` parameter in the URL when running your app:

    http://localhost/sdk/touch/examples/kitchensink/index.html?theme=Apple

**Important**  The framework uses the `Windows` and `Blackberry` themes to change the functionality 
of the framework **if** that theme is in use. If you want to replicate that functionality, and 
you intend to use either the `Windows` or `Blackberry` themes, you should also use those names.

<a name="PlatformConfig"></a>
## platformConfig

The `platformConfig` feature lets you define config values 
based on the current platform, or theme, on which your application is running. 

This example defines a new class `Example.view.Login` that uses a simple login form. 
The value for the FieldSet title is specfied as `Login`, however by using `platformConfig`, 
you can set the value of the title based on the platform - in this case, `ie10`.

        Ext.define('Example.view.Login', {
                extend: 'Ext.panel.FieldSet',
                
                config: {
                        title: 'Login'
                },
                
                platformConfig: [{
                        platform: 'ie10',
                        title: 'Microsoft Login'
                }]
        });

A more complex example could display your view differently or change the items in your view 
based on the platform you are running.

The config system in Sencha Touch is incredibly powerful. It allows you to develop applications 
with lots of functionality, very quickly. For more information about the config system, 
read the [Class System](http://docs.sencha.com/touch/#!/guide/class_system) guide.

<a name="BaseTheme"></a>
## Base Theme

The base theme is the required styling to lay out 
components of Sencha Touch. There are no colors or custom styling like gradients and margins 
and padding. It is simply the starting point of actual themes. 

In previous Touch versions, if you wanted to create highly customized themes, you had to override a 
lot of the styling of the Default theme by using lots of hacks like `!important`.

Developing themes for Sencha Touch was made simple with the use of Sass, Compass and their features. 
This lets you dynamically change colors and measurements using variables, and create new UIs by using mixins. 
This rapidly speeds up development of custom themes based on the default Sencha Touch theme.


Advantages of the new base theme:

 - No layouts for Sencha Touch components. These are already handled for you in the base. 
All you have to do is style a component for how you want it.
 - No overriding default styles, because there are none. The base theme only 
lays out components, which means it is actually usable. You need to build on the base theme to style it, 
but there is no longer any need to use hacks to remove the existing styling. 
Which in turn, reduces the file style of your CSS because you no longer have all that default styling.
 - Faster CSS compiles. Along with reduced size, themes provide faster compile times. 
Sencha Touch uses Compass to compile 
stylesheets from Sass to CSS. In older Sencha Touch versions, Compass could take multiple seconds
to compile because it had to compile the default theme along with all your custom styling. 
Now that the base is separate, you only have to compile your custom styling - which means 
compiling themes has dropped to fractions of seconds. This makes writing stylesheets much quicker.

{@img base-theme.png}


## Upgrading Themes From Sencha Touch 2.1 to 2.2

There are a lot of changes from Sencha Touch 2.1 to 2.2, but the upgrade path is rather simple.

The most important change to be aware of is the move away from using mixins for each component. 
We found that using mixins for each component was quite slow when compiling your Sass, 
so we decided to simply move to using `@import` to just include each component.

In Touch 2.1, your stylesheet looked like this:

	@import 'sencha-touch/default/all';

	@include sencha-panel;
	@include sencha-buttons;
	// and other components…
	
In Touch 2.2, it looks like this:

	@import 'sencha-touch/default';
	
	@import 'sencha-touch/default/Panel';
	@import 'sencha-touch/default/Button';
	// and other components
	
Instead of using `@include` to include a component mixin, use `@import` to import the component.

To include all default components in Sencha Touch 2.2, use:

	@import 'sencha-touch/default';
	@import 'sencha-touch/default/all';

The same goes for when you are using other themes. 

Windows:

	@import 'sencha-touch/windows';
	@import 'sencha-touch/windows/all';
	
BlackBerry:

	@import 'sencha-touch/bb10';
	@import 'sencha-touch/bb10/all';
	
To include only the base theme:

	@import 'sencha-touch/base';
	@import 'sencha-touch/base/all';

The base theme does not have styling like the Default, Windows, and BlackBerry themes.

<a name="ListComponent"></a>
## List Component

The List component has been optimized to ensure performance is best in every scenario. 
Lists now have these modes:

- Normal items
- Infinite
- Simple items
- Items with different heights

Unfortunately this means that the DOM structure of list items can change depending on the mode the list is running. 
Therefore if you have custom styling on lists or list items, change the selectors to match the new selectors used in 2.2.

## Using an Existing Theme

Using one of the default themes in your Sencha Touch 2.2 application is simple. 
Just include the appropriate theme stylesheet into your `app.json` file:

    "css": [
        {
            "path": "resources/css/wp.css",
            "update": "delta"
        }
    ]
    
This example includes only the Windows theme in the wp.css file. Ensure that the path points 
to the correct stylesheet within the SDK folder.

If you want to load different themes depending on the platform, include them in your `app.json` file:

    "css": [
        {
            "path": "resources/css/sencha-touch.css",
            "platform": ["chrome", "safari", "ios", "android", "firefox"],
            "theme": "Default",
            "update": "delta"
        },
        {
            "path": "resources/css/wp.css",
            "platform": ["ie10"],
            "theme": "Windows",
            "update": "delta"
        },
        {
            "path": "resources/css/bb10.css",
            "platform": ["blackberry"],
            "theme": "Blackberry",
            "update": "delta"
        }
    ]
   
In this example, the Windows theme loads on the "ie10" platform and the BlackBerry theme loads on "blackberry". 
All other devices uses the Default Sencha Touch theme.

## Extending an Existing Theme

Extending one of the default themes in Sencha Touch 2.2 is also simple. 

To extend a custom theme:

1. Open your `resources/sass/app.scss` stylesheet which is automatically generated when creating an 
application using [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download).
2. Include the Sencha Touch theme you want. This example uses the default theme:

		@import 'sencha-touch/default';
		@import 'sencha-touch/default/all';
		
	Or the Windows theme:
	
		@import 'sencha-touch/windows';
		@import 'sencha-touch/windows/all';
	
3. Add your custom Sass styles.
4. Compile and launch your application:

		compass compile resources/sass

## Creating a New Theme

Creating a new theme is very similiar to extending a default theme, 
except that you only want to include the base theme. 

To create a theme:

1. Open your `resources/sass/app.scss` stylesheet which is automatically generated when 
creating an application using [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download).
2. Include the Sencha Touch base theme:
	
		@import 'sencha-touch/base';
		@import 'sencha-touch/base/all';
	
Now you can write the custom Sass required to theme your app.

### Custom Theme Tips

- Sencha Touch components always have a baseCls that matches the name of the component. Some example of this are:

	* `Ext.List` -> `.x-list`
	* `Ext.field.Text` -> `.x-field-text`
	* `Ext.field.Numer` -> `.x-field-number`
	* `Ext.panel.Form` -> `.x-form-panel`

- If you are not familiar with the DOM structure of Sencha Touch applications, 
use the Web Inspector of your browser to inspect the DOM to determine what elements you need to style.
- You can also use the Web Inspector to detect what the base theme uses as selectors:

1. Navigate to a list example with just the base theme
2. Select a list item and open it in the Web Inspector
	
	{@img list-select-1.png}
	
3. Navigate the DOM until you see the selected class 'x-item-selected' (it may even be the select DOM element)
	
	{@img list-select-2.png}
	
4. Use the styles panel to see and copy the selector used in the base theme.
	
	{@img list-select-3.png}
	
5. Paste the selector into your `app.scss` file and style as needed:
	
	.x-list .x-list-item.x-item-selected .x-dock-horizontal,
	.x-list .x-list-item.x-item-selected.x-list-item-tpl {
		color: red;
	}

<a name="IconFonts"></a>
## Icon Fonts

New in Touch 2.2, icons are now handled as fonts, which enables very fast scaling 
without the need to redraw the picture. Icons appear on buttons and tabs.

Previously, scaling icons required more overhead for an application 
to draw a picture for an icon and then redraw, rescale, and change it as 
the app appeared on different browsers and devices.

To convert your existing icons to fonts, you can use Pictos Server, Pictonic, 
icomoon.io, or http://fontstruct.com/ — some of these are free or available with trial subscriptions.

### Using the Pictos Font

The Pictos font provides a large collection of free icons. You can find a full list of characters 
available for the Pictos font at [http://www.pictos.cc](http://www.pictos.cc). 
Sencha Touch provides free access to the [Pictos Font Pack](http://pictos.cc/font/).

When you build your application using Sencha Cmd, the font libraries are copied to your application file.

Just like Sencha Touch 1 and 2, Sencha Touch 2.2 maps icon names to actual 
icons so you can use them within your application:

	{
		xtype: 'button',
		iconCls: 'home',
		title: 'Home'
	}
	
For a full list of `iconCls` functions that are available, refer to the `Ext.Button` class documentation.

Alternatively, you can use the Compass icon mixin to map a specific character of the 
icon font to an iconCls which you can use in your app:

<pre>
@include icon('home', 'H');
</pre>

### Using Other Icon Fonts

The Pictos font is not the only font you can use in your application. 
If you know of another font or you have custom converted your icons to fonts, 
it is very easy to use that font with the icon mixin.

Just like with the Pictos font, you need to specify the iconCls and character 
to be used for the icon. Additionally, you need to specify the name of the icon font, 
which needs to match the font family of the icon font you have, plus you need to 
make sure the font has been included in your CSS using the icon-font mixin.

This example specifies the Home icon in the custom MyFont:

<pre>
@include icon('home', 'H', 'MyFont');
</pre>

The following example shows how to include the Pictos font using the icon-font mixin:

<pre>
@include icon-font('Pictos', inline-font-files('pictos/pictos-web.woff', woff, 'pictos/pictos-web.ttf', truetype,'pictos/pictos-web.svg', svg));
</pre>
 
The first parameter is the name of the font face, which must match the name 
you use as the CSS font-family. The second parameter uses the inline-font-files 
Compass function to base64-encode the font file inline into the CSS file with 
paths to the WOFF, TTF, and SVG versions of the font files.

A good list of other icon fonts (some paid and some free) is available at 
[http://css-tricks.com/flat-icons-icon-fonts/](http://css-tricks.com/flat-icons-icon-fonts/)

Sencha Touch 1 and 2 used `-webkit-maask` to display and style fonts. 
Unfortuantely, although `webkit-mask` functionality works on most WebKit browsers, 
it does not work on non-WebKit browsers like Internet Explorer. 
Sencha Touch 2.2 fully supports IE10, so `webkit-mask` is no longer an option.

### Creating a Custom Font

There are many tools available online to create your own icon font. 
A good example of this is [icomoon](http://icomoon.io/app/).

Advantages of creating your own icon font:

 - You can pick the icons you want to use in your application.
 - Because you are choosing your own icons, you can reduce the file size of the font, 
which in turn reduces the size of your stylesheet.

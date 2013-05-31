Ext.data.JsonP.mvc_dependencies({"guide":"<h1 id='mvc_dependencies-section-managing-dependencies-with-mvc'>Managing Dependencies with MVC</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/mvc_dependencies-section-application-dependencies'>Application Dependencies</a></li>\n<li><a href='#!/guide/mvc_dependencies-section-profile-specific-dependencies'>Profile-specific Dependencies</a></li>\n<li><a href='#!/guide/mvc_dependencies-section-nested-dependencies'>Nested Dependencies</a></li>\n<li><a href='#!/guide/mvc_dependencies-section-external-dependencies'>External Dependencies</a></li>\n<li><a href='#!/guide/mvc_dependencies-section-where-each-dependency-belongs'>Where Each Dependency Belongs</a></li>\n<li><a href='#!/guide/mvc_dependencies-section-changes-since-sencha-touch-1-x'>Changes since Sencha Touch 1.x</a></li>\n</ol>\n</div>\n\n<p>There are two main places that dependencies can be defined in a Sencha Touch app - on the application itself\nor inside the application classes. This guide gives some advice on how and where to declare dependencies in your app.</p>\n\n<h2 id='mvc_dependencies-section-application-dependencies'>Application Dependencies</h2>\n\n<p>When you create an MVC application, your <a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a> gives you a convenient way of specifying the models,\nviews, controllers, stores and profiles that your application uses. Here's an example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>({\n    name: 'MyApp',\n\n    views: ['Login'],\n    models: ['User'],\n    controllers: ['Users'],\n    stores: ['Products'],\n    profiles: ['Phone', 'Tablet']\n});\n</code></pre>\n\n<p>These five configuration options are convenient ways to load the types of files that applications usually\nconsist of - models, views, controllers, stores, and profiles. Specifying these configurations means your\napplication will automatically load the following files:</p>\n\n<ul>\n<li>app/view/Login.js</li>\n<li>app/model/User.js</li>\n<li>app/controller/Users.js</li>\n<li>app/store/Products.js</li>\n<li>app/profile/Phone.js</li>\n<li>app/profile/Tablet.js</li>\n</ul>\n\n\n<p>In terms of entities that get loaded, the example above is equivalent to manually defining dependencies like this:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-require\" rel=\"Ext-method-require\" class=\"docClass\">Ext.require</a>([\n    'MyApp.view.Login',\n    'MyApp.model.User',\n    'MyApp.controller.Users',\n    'MyApp.store.Products',\n    'MyApp.profile.Phone',\n    'MyApp.profile.Tablet'\n]);\n</code></pre>\n\n<p>As you add more classes to your application, these configurations become more and more useful in helping\nyou avoid typing out the full class names for every file. Be aware, however, that three of those configurations\ndo more than just load files--they also do the following:</p>\n\n<ul>\n<li><strong>profiles</strong> - Instantiates each Profile and determines if it should be <a href=\"#!/api/Ext.app.Profile-method-isActive\" rel=\"Ext.app.Profile-method-isActive\" class=\"docClass\">active</a>. If so, the Profile's own dependencies are also loaded.</li>\n<li><strong>controllers</strong> - Instantiates each Controller after loading.</li>\n<li><strong>stores</strong> - Instantiates each Store, giving it a default store ID if one is not specified.</li>\n</ul>\n\n\n<p>This means that if you want to take advantage of all of the convenience MVC offers you,<br/>\nuse these configuration options when defining your application dependencies.</p>\n\n<h2 id='mvc_dependencies-section-profile-specific-dependencies'>Profile-specific Dependencies</h2>\n\n<p>When using <a href=\"#!/guide/profiles\">Device Profiles</a>, chances are that you have some\nclasses that are used only on certain devices. For example, the Tablet version of your app\nprobably contains more functionality than the Phone version, which usually means it ill needs\nto load more classes. Additional dependencies can be specified inside each Profile:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.profile.Tablet', {\n    extend: '<a href=\"#!/api/Ext.app.Profile\" rel=\"Ext.app.Profile\" class=\"docClass\">Ext.app.Profile</a>',\n\n    config: {\n        views: ['SpecialView'],\n        controllers: ['Main'],\n        models: ['MyApp.model.SuperUser']\n    },\n\n    isActive: function() {\n        return Ext.os.is.Tablet;\n    }\n});\n</code></pre>\n\n<p>The dependencies specified in each Profile are loaded regardless of whether or not a Profile is active.\nThe difference is that, even though they are loaded, the Application does not know how to do the\nadditional processing, such as instantiating profile-specific Controllers if the profile is not active.</p>\n\n<p>This probably sounds counter-intuitive - why download classes that are not going to be used?\nThe reason we do this is to produce a universal production build that can be deployed to any device,\ndetect which profile it should use and then boot the app. The alternative is to create custom builds\nfor each profile, create a micro-loader than can detect which profile a device should activate and\nthen download the code for that profile.</p>\n\n<p>While the universal build approach means that you are downloading code you do not need on every\ndevice, for the vast majority of apps this amounts to very little additional size.</p>\n\n<h2 id='mvc_dependencies-section-nested-dependencies'>Nested Dependencies</h2>\n\n<p>For larger apps it is common to split the models, views, and controllers into subfolders so\nkeep the project organized. This is especially true of views - since it is not uncommon for\nlarge apps to have over a hundred separate view classes, organizing them into folders can\nmake maintenance much simpler.</p>\n\n<p>To specify dependencies in subfolders use a period (\".\") to specify the folder:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>({\n    name: 'MyApp',\n\n    controllers: ['Users', 'nested.MyController'],\n    views: ['products.Show', 'products.Edit', 'user.Login']\n});\n</code></pre>\n\n<p>In this case, the following five files load:</p>\n\n<ul>\n<li>app/controller/Users.js</li>\n<li>app/controller/nested/MyController.js</li>\n<li>app/view/products/Show.js</li>\n<li>app/view/products/Edit.js</li>\n<li>app/view/user/Login.js</li>\n</ul>\n\n\n<p><strong>Note</strong> We can mix and match within each configuration here - for each model, view, controller,\nprofile or store, you can specify either the final part of the class name (if you follow the\ndirectory conventions), or the full class name.</p>\n\n<h2 id='mvc_dependencies-section-external-dependencies'>External Dependencies</h2>\n\n<p>We can specify application dependencies from outside our application by fully-qualifying the\nclasses we want to load. A common use case for this is sharing authentication logic between\nmultiple applications. Perhaps you have several apps that login via a common user database\nand you want to share that code between them. An easy way to do this is to create a folder\nalongside your app folder and then add its contents as dependencies for your app.</p>\n\n<p>For example, assuming that our shared login code contains a login controller, a user model,\nand a login form view, we want to use all of these in our application:</p>\n\n<pre><code><a href=\"#!/api/Ext.Loader-method-setPath\" rel=\"Ext.Loader-method-setPath\" class=\"docClass\">Ext.Loader.setPath</a>({\n    'Auth': 'Auth'\n});\n\n<a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>({\n    views: ['Auth.view.LoginForm', 'Welcome'],\n    controllers: ['Auth.controller.Sessions', 'Main'],\n    models: ['Auth.model.User']\n});\n</code></pre>\n\n<p>This loads the following files:</p>\n\n<ul>\n<li>Auth/view/LoginForm.js</li>\n<li>Auth/controller/Sessions.js</li>\n<li>Auth/model/User.js</li>\n<li>app/view/Welcome.js</li>\n<li>app/controller/Main.js</li>\n</ul>\n\n\n<p>The first three files load from outside our application, the last two from the application\nitself.</p>\n\n<p><strong>Notes</strong>\n* You can mix and match application files and external dependency files.\n* To load external dependencies, tell the Loader where to find those files with the <a href=\"#!/api/Ext.Loader-method-setPath\" rel=\"Ext.Loader-method-setPath\" class=\"docClass\">Ext.Loader.setPath</a> call.\nIn this example, the Loader finds classes starting with the 'Auth' namespace inside our 'Auth' folder.\nWe can drop our common Auth code into our application alongside the app folder,\nand the framework figures out how to load everything.</p>\n\n<h2 id='mvc_dependencies-section-where-each-dependency-belongs'>Where Each Dependency Belongs</h2>\n\n<p>The general rule when deciding where to declare each dependency is to keep your classes\ncompletely self-contained. For example, if you have a view that contains several other views,\nyou should declare those dependencies inside the view class, not the application:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.view.Main', {\n    extend: '<a href=\"#!/api/Ext.Container\" rel=\"Ext.Container\" class=\"docClass\">Ext.Container</a>',\n\n    requires: [\n        'MyApp.view.Navigation',\n        'MyApp.view.MainList'\n    ],\n\n    config: {\n        items: [\n            {\n                xtype: 'navigation'\n            },\n            {\n                xtype: 'mainlist'\n            }\n        ]\n    }\n});\n</code></pre>\n\n<p>You can then use the following code in your app.js:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>({\n    views: ['Main']\n});\n</code></pre>\n\n<p>This is the best way to declare those dependencies for two reasons - it keeps your app.js\nclean and enables you to reliably require your MyApp.view.Main while knowing that it already\nhas all of its dependencies satisfied. The alternative would be to list all of your views\ninside app.js like in the following example:</p>\n\n<pre><code>//this is bad\n<a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>({\n    views: ['Main', 'Navigation', 'MainList']\n});\n</code></pre>\n\n<p>A simple way of thinking about this is that app.js only contains top-level views. If you use\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.SomeView') inside your app, that view can be considered top-level.\nWhenever a view is only constructed as a sub-view of another view\n(as with MyApp.view.Navigation and MyApp.view.MainList above), it does not belong in app.js.</p>\n\n<h2 id='mvc_dependencies-section-changes-since-sencha-touch-1-x'>Changes since Sencha Touch 1.x</h2>\n\n<p>In Sencha Touch 1.x, dependencies were often specified in Controllers, as well as in the\n<a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a> call. While this approach offered some conveniences, it also masked the\ntrue architecture of the system and coupled views, models, and stores too closely to\ncontrollers. The following sample shows code that was possible in 1.x:</p>\n\n<pre><code>//1.x code, deprecated\n<a href=\"#!/api/Ext-method-regController\" rel=\"Ext-method-regController\" class=\"docClass\">Ext.regController</a>('SomeController', {\n    views: ['Login'],\n    models: ['User'],\n    stores: ['Products']\n});\n</code></pre>\n\n<p>This is the same as defining the views, models, and stores inside <a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>,\nbut also gave some convenience methods for accessing those classes inside your\ncontroller. 1.x generated two functions - <em>getLoginView()</em> and <em>getUserModel()</em> - and\nexposed a <em>getStore()</em> function that returned a reference to any of the Stores defined\nin this Controller. In Sencha Touch 2.x these functions no longer exist, but it is easy\nto use the alternatives.</p>\n\n<p>In the following example the first line refers to Sencha Touch 1.x code, while\nthe second line shows the 2.x way:</p>\n\n<pre><code>//creating a view - 2.x uses the standardized <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>\nthis.getLoginView().create();\n<a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.Login');\n\n//getting a Model - just type out the Model name (it's shorter and faster)\nthis.getUserModel();\nMyApp.model.User;\n\n//<a href=\"#!/api/Ext-method-getStore\" rel=\"Ext-method-getStore\" class=\"docClass\">Ext.getStore</a> can access any Store whereas the old this.getStore only\n//accessed those Stores listed in your Controller\nthis.getStore('Products');\n<a href=\"#!/api/Ext-method-getStore\" rel=\"Ext-method-getStore\" class=\"docClass\">Ext.getStore</a>('Products');\n</code></pre>\n\n<p>Removing these functions speeds up application launching because the framework no longer\nneeds to generate one function for each model and view defined in each Controller. It also\nmeans that the conventions for MVC match the conventions for the rest of the framework,\nwhich leads to a more predictable API.</p>\n","title":"Dependencies and MVC"});
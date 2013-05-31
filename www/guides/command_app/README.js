Ext.data.JsonP.command_app({"guide":"<h1 id='command_app-section-using-sencha-cmd-with-sencha-touch'>Using Sencha Cmd with Sencha Touch</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/command_app-section-introduction'>Introduction</a></li>\n<li><a href='#!/guide/command_app-section-creating-a-new-application'>Creating a New Application</a></li>\n<li><a href='#!/guide/command_app-section-understanding-your-application-s-structure'>Understanding Your Application's Structure</a></li>\n<li><a href='#!/guide/command_app-section-developing-your-application'>Developing Your Application</a></li>\n<li><a href='#!/guide/command_app-section-upgrading-your-application'>Upgrading Your Application</a></li>\n<li><a href='#!/guide/command_app-section-deploying-your-application'>Deploying Your Application</a></li>\n<li><a href='#!/guide/command_app-section-packaging-your-application-for-distribution-in-app-stores'>Packaging Your Application for Distribution in App Stores</a></li>\n<li><a href='#!/guide/command_app-section-troubleshooting'>Troubleshooting</a></li>\n</ol>\n</div>\n\n<p><p class='screenshot'><img src='guides/command_app/../command/sencha-command-128.png' alt=''><span></span></p></p>\n\n<h2 id='command_app-section-introduction'>Introduction</h2>\n\n<p>This guide walks through the process of using Sencha Cmd with Sencha Touch\napplications starting with the <code>sencha generate app</code> command and ending with a\nrunning application.</p>\n\n<p>This guide applies to both new Sencha Touch applications as well as upgrades of\nexisting Sencha Touch 2 applications.</p>\n\n<p>For a general introduction, see <a href=\"#!/guide/command\">Introducing Sencha Cmd</a>.</p>\n\n<p>To share code between Sencha Touch applications or between Sencha Touch and Ext JS, please\nrefer to <a href=\"#!/guide/command_workspace\">Workspaces in Sencha Cmd</a>.</p>\n\n<h2 id='command_app-section-creating-a-new-application'>Creating a New Application</h2>\n\n<p>The following command generates a new application with the namespace <code>MyApp</code> to\n\"/path/to/www/myapp\":</p>\n\n<pre><code>#  Make sure the current working directory is the Sencha Touch 2 SDK\ncd /path/to/sencha-touch-2-sdk\nsencha generate app MyApp /path/to/www/myapp\n</code></pre>\n\n<p>Or, you can specify the path to the SDK on the command line:</p>\n\n<pre><code>sencha -sdk /path/to/sencha-touch-2-sdk generate app MyApp /path/to/www/myapp\n</code></pre>\n\n<p>To try it out, simply point any WebKit-based browser to <code>http://localhost/myapp</code>.</p>\n\n<p>Congratulations. You have just created a fully working Sencha Touch 2 application in seconds.</p>\n\n<h2 id='command_app-section-understanding-your-application-s-structure'>Understanding Your Application's Structure</h2>\n\n<p>The generated application should have the following file structure:</p>\n\n<pre><code>.sencha/                # Sencha-specific files (e.g. configuration)\n    app/                # Application-specific content\n        sencha.cfg      # Configuration file for Sencha Cmd\n        plugin.xml      # Plugin for Sencha Cmd\n    workspace/          # Workspace-specific content (see below)\n        sencha.cfg      # Configuration file for Sencha Cmd\n        plugin.xml      # Plugin for Sencha Cmd\n\ntouch/                  # A copy of the Sencha Touch SDK\n    cmd/                # Sencha Touch-specific content for Sencha Cmd\n        sencha.cfg      # Configuration file for Sencha Cmd\n        plugin.xml      # Plugin for Sencha Cmd\n    src/                # The Sench Touch source\n    sencha-touch-*.js   # Pre-compiled and bootstrap files\n    ...\n\napp                     # Your application's source code in MVC structure\n    controller\n    model\n    profile\n    store\n    view\n        Main.js         # The main view of the application\n\nresources\n    css\n        app.css         # The main stylesheet, compiled from app.scss\n\n    sass\n        app.scss        # The Sass file which compiles to app.css above,\n                        # includes Sencha Touch 2 theme by default\n\n    icons               # Application icons for all mobile devices\n                        # When replacing these default images with your own,\n                        # make sure the file name and the dimension stays exactly the same\n        ...\n    loading             # Application start-up screens for iOS devices\n                        # Similarly to icons, make sure the file names and\n                        # dimension stays the same\n        ...\n    images              # Put other images used by your application here\n\nindex.html\napp.js                  # Contains application's initialization logics\napp.json                # Configuration for deployment\npackager.json           # Configuration for native packaging\n</code></pre>\n\n<p>Both \"app.json\" and \"packager.json\" have inline documentation for each configurable item. Simply\nopen the files and edit them as you need.</p>\n\n<h2 id='command_app-section-developing-your-application'>Developing Your Application</h2>\n\n<p>Using the family of <code>sencha generate</code> commands helps you quickly generate common MVC\ncomponents.</p>\n\n<p><strong>Important.</strong> Be sure to make your current directory your application's root folder.</p>\n\n<p>For example:</p>\n\n<pre><code>cd /path/to/www/myapp\nsencha generate model User --fields=id:int,name,email\n</code></pre>\n\n<p>This command generates a new Model class named <code>User</code> with three fields named <code>id</code>, <code>name</code>, and\n<code>email</code> to \"app/model/User.js\" and add its reference to your \"app.js\" file.</p>\n\n<h2 id='command_app-section-upgrading-your-application'>Upgrading Your Application</h2>\n\n<p>Generated applications always have their own copies of the SDK from which they were\noriginally generated. Upgrading your application to a new version of the SDK means that you\nhave to replace the old version with the new one. Do this with the command <code>sencha app upgrade</code>.</p>\n\n<p><strong>Important</strong> Be sure to make your current directory your application's root folder.</p>\n\n<p>Here's a more complete example:</p>\n\n<pre><code>cd /path/to/www/myapp\nsencha app upgrade /path/to/new_version_of_sdk\n</code></pre>\n\n<h2 id='command_app-section-deploying-your-application'>Deploying Your Application</h2>\n\n<p>Developing your application simply means editing source code and refreshing the browser.\nAll source files are dynamically loaded on demand. There's no building process involved.\nWhen it comes to deployment, Sencha Cmd provides the following four build environment options:</p>\n\n<ul>\n<li><code>testing</code> - intended for QA prior to production. All JavaScript and CSS source files are\nbundled, but not minified, which makes it easier to debug.</li>\n<li><code>package</code> - creates a self-contained, redistributable production build that normally runs\nfrom the local file system without a web server.</li>\n<li><code>production</code> - creates a production build that is normally hosted on a web server and\nserves multiple clients (devices). The build is offline-capable using HTML 5 application\ncache, and is enabled to perform over-the-air updates.</li>\n<li><code>native</code> - first generates a <code>package</code> build, then packages it as a native application,\nready to be deployed to native platforms.</li>\n</ul>\n\n\n<p>As an example, the following command generates a <code>testing</code> build of your application.</p>\n\n<p><strong>Important.</strong> Be sure to make your current directory your application's root folder.</p>\n\n<pre><code>cd /path/to/www/myapp\nsencha app build testing\n</code></pre>\n\n<p>And similarly when you're ready for production deployment:</p>\n\n<pre><code>cd /path/to/www/myapp\nsencha app build production\n</code></pre>\n\n<p>The default deployment paths are taken from the <code>buildPaths</code> item inside <code>app.json</code>. For\nmore details on optional arguments, run the following command:</p>\n\n<pre><code>cd /path/to/www/myapp\nsencha help app build\n</code></pre>\n\n<p>Sencha Cmd automates all optimizations for your application, including the following:</p>\n\n<ul>\n<li>Resolving dependencies required by the application and only including exactly what is\nused for optimal file size/performance.</li>\n<li>Enabling HTML5 application cache via automatic generation of \"cache.manifest\" and resources\nchecksum.</li>\n<li>Minifying all JavaScript and CSS assets.</li>\n<li>Storing all JavaScript and CSS assets inside local storage on first load and patching them\nvia delta updates between releases.</li>\n</ul>\n\n\n<p>As a result, your production build can load instantly on subsequent access and updates on the\nfly with minimal network transfer.</p>\n\n<p><strong>Important.</strong> The <code>cache.manifest</code> file is automatically generated for you. Make sure your\nweb server serves it with the correct <code>Content-Type</code> header of <code>text/cache-manifest</code>. To learn\nmore about HTML5 application cache, see the HTML5 Rocks tutorial\n<a href=\"http://www.html5rocks.com/en/tutorials/appcache/beginner/\">A Beginner's Guide to Using the Application Cache</a>.</p>\n\n<h2 id='command_app-section-packaging-your-application-for-distribution-in-app-stores'>Packaging Your Application for Distribution in App Stores</h2>\n\n<p><code>packager.json</code> contains all configurable values to package your application.</p>\n\n<p>If you're using OS X and have XCode installed, the following command packages your\napplication and runs it on the iOS Simulator:</p>\n\n<pre><code>sencha app build native\n</code></pre>\n\n<p>For more details on working with <code>packager.json</code>, please refer to the\n<a href=\"#!/guide/native_packaging\">Native Package guide</a></p>\n\n<h2 id='command_app-section-troubleshooting'>Troubleshooting</h2>\n\n<p>For common problems using Sencha Cmd, see the Troubleshooting section of\n<a href=\"#!/guide/command\">Introduction to Sencha Cmd</a>.</p>\n\n<h3 id='command_app-section-errors-while-resolving-dependencies-part-2'>Errors While Resolving Dependencies - Part 2</h3>\n\n<p>The new Sencha Cmd compiler is used by default to determine dependencies. Unlike previous\nreleases, the compiler determines dependencies by processing source code (application and\nframework). In some cases this can lead to missing dependencies, that is, dependencies\nthat were automatically detected in previous releases but are not detected by the compiler.</p>\n\n<p>The ideal solution in this case is to add the missing <code>requires</code> statements to resolve the\nissue. This may include switching overrides to the new, named form, such as:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.patches.foo.Bar', {\n    override: 'Ext.foo.Bar',\n    ...\n});\n</code></pre>\n\n<p>This enables overrides to be required by their name and therefore for the compiler to\nprocess them in the right sequence.</p>\n\n<p>If that effort needs to be postponed, you can enable V2 compatibility mode (based on\nlaunching your application via file system protocol inside of a headless WebView to\nextract dependencies). To do this, use this command instead of <code>sencha app build</code>:</p>\n\n<pre><code>sencha config -prop v2deps=true then app build\n</code></pre>\n\n<p>Alternatively, you could add the following line to your \".sencha/app/sencha.cfg\" file and\nrun <code>sencha app build</code> as before:</p>\n\n<pre><code>v2deps=true\n</code></pre>\n\n<p>In this legacy mode, if your application relies on any dynamic server-side scripting (for\nexample, loading a class configuration from a PHP script), you must set the <code>url</code> item\ninside <code>app.json</code> to the absolute URL from which your application can be loaded on a web\nbrowser. For example:</p>\n\n<pre><code>// app.json\n{\n    \"url\": \"http://localhost/myapp/\",\n    // ...\n}\n</code></pre>\n\n<p>This should be viewed as a temporary measure, since it won't allow planned compiler\noptimizations to automatically benefit your application.</p>\n","title":"Using Sencha Cmd with Sencha Touch"});
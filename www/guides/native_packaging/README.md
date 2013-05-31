# Native Packaging for Mobile Devices

This guide describes how to package a Sencha Touch app to run natively on mobile devices 
using the Sencha Touch Native Packager tool. This tool supports packaging for iOS and Android. 

**Note** If your app is for Internet Explorer, Windows Phone, or BlackBerry 10, 
use [Apache Cordova](http://cordova.apache.org/) to package your app.


## Native App Packaging General Procedures

The app packaging process is similar whether you target iOS or Android devices. The main difference is that each environment requires that you complete different prerequisites. Additionally, creating the config file differ between the two environments.

Basic steps for app packaging:

1. Provisioning - For iOS, complete iOS provisioning on the 
[Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password).
including certificates and devices set up through the provisioning portal and Xcode.
Android provisioning requires that you obtain an Android ready certificate (debug or release) to sign your application.
2. Create config file - Create a packaging configuration file for use with the Native Packager.
3. Package your app - Run the packager to create a packaged `\<application\>.app` file for iOS or an `.apk` file for Android.
	
Each step is detailed in this guide.

## Required Software

Before you begin, make sure your computer is running:

 - **JRE** Sencha Cmd is written in Java and requires 
   [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html) 
   version 1.6 or 1.7 (best)
 - [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download)
 - **Ruby 1.9.3** (or earlier): Sencha Cmd does not work with Ruby 2.0. Ruby differs by OS:
  - **Windows**: Download Ruby 1.9.3.n from [rubyinstaller.org](http://rubyinstaller.org/downloads/).
    Get the .exe file version of the software and install it.
  - **Mac OS**: Ruby is pre-installed. You can test which version you have with the 
    **Ruby -v** command. If you have version 2.0, download the [Ruby version manager](https://rvm.io/) (rvm). 
    Use this command to download and install Ruby: **rvm install 1.9.3 --with-gcc=clang** and set 
    your PATH variable to point to the Ruby 1.9.3 install directory.
  - **Ubuntu**: Use **sudo apt-get install ruby1.9.3** to download Ruby 1.9.3.
 - **iOS Packaging**: Apple [Xcode](https://developer.apple.com/xcode/)
 - **Android Packaging**: [Android SDK Tools](http://developer.android.com/sdk/index.html) and [Eclipse](http://www.eclipse.org/) (optional).

<a name="provis"></a>
## Step 1: Provisioning

Provisioning differs by platform:

**iOS:** Refer to the [Native iOS Provisioning Guide](#!/guide/native_provisioning) and use 
the [Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password) to get a development or distribution certificate and profiles. 
Create an App ID and provision your application. You need your App ID and App Name to package your app. 
Refer to the How-To section in the 
[Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) for help.

**Android:** Use the Android SDK Keytool to create a certificate to sign your Android application. 
The following example Keytool command generates a private key:

<pre>
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name
    -keyalg RSA -keysize 2048 -validity 10000
</pre>

For more information, see the 
Android [Signing Your Applications](http://developer.android.com/tools/publishing/app-signing.html).

<a name="install"></a>
## Step 2: Install the packager

  - Download [Sencha Cmd 3.1](http://www.sencha.com/products/sencha-cmd/download).
  - Use the `sencha` command with the package option to install your app to the correct location 
during installation. 

<a name="cfg"></a>
## Step 3: Create a packaging configuration file

Create a configuration file template by running the following command in the Terminal:

    sencha app package generate <configTemplate.json>

`<configTemplate.json>` is the name of the configuration file. The file name cannot contain spaces.

  - Mac OS:  **./stbuild generate config.json**
  - Windows: **stbuild generate config.json**

The rest of this section provides details about each parameter, noting environment-specific settings.

### `applicationName`

The name of your application, which a device displays to the user after the app is installed. 

**iOS:** The application name should match the name provided in the 
[iOS Provisioning Portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password), in the App IDs section. Here's an example iOS App ID, 
showing both the name and the ID:

{@img idScreen.png App ID}

This example uses the following:

  - AppName: Sencha Touch Packaging
  - AppID: com.Sencha.TouchPackage

**Note** The App ID is the same as the one you put in the Identifier field in Xcode.

**Android:** The output file has the name \<AppName\>.apk.

### `applicationId`
	
The ID for your app. Use a nameSpace for your app such as `com.sencha.TouchPackage`, as shown in the example above. For iOS, this can also be found in the provisioning portal.

### `bundleSeedId` (iOS only)
	
The ten character string in front of the iOS application ID obtained from 
the [iOS Provisioning Portal](https://developer.apple.com/ios/manage/overview/index.action) 
(requires an Apple ID and password). In the example shown above under `applicationName`, it's `H8A8ADYR7H`.

### `versionString`
	
This is the version number of your application. This can be a string such as `1.0-beta`.

### `versionCode` (Android only)

The build number of an Android app, also called the integer version code.

### `icon`

The icon that displays to a user along with your app name on the device's home screen.

**iOS:** Specify the icon file to be used for your application. Specify a Retina icon with `@2x` at 
the end of the icon name. A regular icon name looks like `icon.png`, while a Retina icon looks 
like `(regular) andicon@2x.png`. If a Retina icon with the `@2x.png` exists, the packager includes the Retina icon. 

For iOS, refer to the [Apple documentation about icon sizes](https://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html)

For Android, refer to the [Google Launcher icons guide](http://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html).

iOS uses 57, 72, 114 and 144 pixel icons. Android uses 36, 48 and 72 pixel icons. 
If you package for Android, you can ignore iOS icons and vice versa.

Specify a target device for your app as follows:

<pre>
"icon": {
    "36":"resources/icons/Icon_Android36.png",
    "48":"resources/icons/Icon_Android48.png",
    "57": "resources/icons/Icon.png",
    "72": "resources/icons/Icon~ipad.png",
    "114": "resources/icons/Icon@2x.png",
    "144": "resources/icons/Icon~ipad@2x.png"
}
</pre>

Refer to the [Apple documentation](https://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html) for specific information about icon sizes.

**Android:** Specifies the launcher icon file to be used for your application. Refer to the [Android Launcher Icons guide](http://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html) for more information.

### `inputPath`

The location of your Sencha Touch application, relative to the configuration file.

### `outputPath`

The output location of the packaged application, where the built application file is saved.

### `rawConfig` (iOS only)

"Raw" keys that can be included with `info.plist` configuration with iOS apps. `info.plist` is the name of an information property list file, a structure text file with configuration information for a bundled executable. See [Information Property List Files](https://developer.apple.com/library/ios/#documentation/MacOSX/Conceptual/BPRuntimeConfig/Articles/ConfigFiles.html) in the iOS Developer Library for more information.

### `configuration`

Indicates whether you are building the debug or release configuration of your application. `Debug` should be used unless you are submitting your app to an online store, in which case `Release` should be specified.

### `notificationConfiguration` (iOS only)

Optional for apps that use push notifications. Use `Debug` unless you are submitting your app to an online store, in which case `Release` should be specified. If app doesn't use push notifications, leave blank or remove parameter.

### `platform`

Indicate the platform on which your application runs.

- **iOS:** Options are `iOSSimulator` or `iOS`.
- **Android:** Options are `Android` or `AndroidEmulator`.

### `deviceType` (iOS only)

Indicates the iOS device type on which your application runs. Available options are:

 - iPhone
 - iPad
 - Universal

### `certificatePath`

The location of your certificate, which is required when you are developing for Android or Windows.

### `certificateAlias` (Optional)

Indicates the name of your certificate. It this is not specified when developing on Mac OS X, the packaging tool automatically tries to find the certificate using the applicationId. 

Can be just a simple matcher. For example, if your certificate name is "iPhone Developer: Robert Dougan (ABCDEFGHIJ)", you can just enter `iPhone Developer`.

Not required when using a `certificatePath` on Windows.

### `certificatePassword` (Optional)

Use only if password was specified when generating certificate for release build of Android (iOS or Windows) or any iOS build on Windows. Indicates password set for certificate. If no password set, leave blank or eliminate parameter.

### `permissions` (Android only)

Array of permissions to use services called from an Android app, including coarse location, fine location, information about networks, the camera, and so on. See the [complete list](http://developer.android.com/reference/android/Manifest.permission.html) of permissions for Android app services.

### `sdkPath` (Android only)

Indicates the path to the Android SDK.


### `androidAPILevel` (Android only)

Indicates the Android API level, which is the version of Android SDK to use. For more information, 
see [What is API Level](http://developer.android.com/guide/appendix/api-levels.html) 
in the Android SDK documentation. Be sure to install the corresponding platform API 
in the Android SDK manager (*android_sdk/tools/android*). 

### `minOSVersion` (iOS only)

Indicates number of lowest iOS version required for app to run. 

### `orientations`

Indicates the device orientations in which the application can run. Options are:

- portrait
- landscapeLeft
- landscapeRight
- portraitUpsideDown

**Note** If omitted, the default orientations setting is all four orientations.

<a name="pkg"></a>
## Step 4: Run the packager to create the packaged application

After creating the config file, the next step is to package the app. Here are the procedures for packaging both debug and release versions of an app for both iOS and Android.

### iOS: Package a Debug Application 

The appropriate `platform` and `configuration` settings need to be made in the config file, for example:

    platform: iOSSimulator
    configuration: Debug

If `platform` and `configuration` are not set, the packaged app will not run correctly.

With these configs set properly, issue the following command in Terminal:

    sencha app package run <configFile.json>

In this example, which targets the iOS Simulator in the `platform` config parameter, successful completion of the `package` command launches the iOS simulator with the application running natively. Note that the `deviceType` identifier  -- `iPhone` or `iPad` -- has to be set properly to trigger the appropriate simulator.

### iOS: Package a Release Application 

To package a signed application to run on the device, issue the following command in the terminal:

    sencha app package <configFile.json>

**Note** an `<AppName.app>` is created in the specified output location. This is the application that you can use to deploy to the iOS device.

### Android: Package a Debug App and Run it on the Android Emulator

The appropriate `platform` and `configuration` settings need to be made in the config file, for example:

    platform: AndroidEmulator
    configuration: Debug

If `platform` and `configuration` are not set, the packaged app won't run correctly.

With these configs set properly, start the Android Emulator and issue the following command:
    
    sencha app package run <configFile.json>

In this example, which targets the Android Emulator in the `platform` config parameter, successful completion of the `package` command launches the app in the already running emulator. If `package` is successful, an `.apk` is available in the application output location for you to manually test on an Android Emulator or a device.

More information about the Android Emulator can be found in [Android Developer Guide: Using the Android Emulator](http://developer.android.com/tools/devices/emulator.html).

### Android: Package an application for distribution

To package a signed application to run on the device, issue the following command:

    sencha app package <configFile.json>

An `<AppName.apk>` is created in the specified output location. This is the application that you can use to release for distribution.

## Additional Resources

### iOS Resources

  1. [Native iOS Provisioning](#!/guide/native_provisioning)
  2. [Apple iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action) (requires an Apple ID and password)

### Android Resources

  1. [Signing Your Applications](http://developer.android.com/tools/publishing/app-signing.html)
  2. [Installing the ADT Plugin for Eclipse](http://developer.android.com/tools/sdk/eclipse-adt.html)
  3. [Eclipse](http://www.eclipse.org/)
  4. [Managing Virtual Devices for Android Emulator](http://developer.android.com/tools/publishing/app-signing.html), "Setting up Virtual Devices".

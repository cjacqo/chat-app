
# Chat App

A mobile application built with React Native. The main purpose of this app is to provide users with the ability to send and receive messages that can either be text, an image or their location.

## Technologies Used

* React Native
* React Native Gifted Chat
* React Native Maps
* Google Firestore DB
* Google Firestore Authentication
* Google Cloud Storage
* AsyncStorage for offline use
* Expo
* Expo ImagePicker
* Expo location

## First Steps
```
# Install Expo CLI globally
npm install -g expo-cli

# Start Expo
npm start

```

## Configure Database

In order to create your own database:

&nbsp;&nbsp;1. Create a project on Firebase

&nbsp;&nbsp;2. Install Firebase:

```
npm install firebase
```

&nbsp;&nbsp;3. Return to the Firebase and create a new database: Build > Firestore Databse > Create new

&nbsp;&nbsp;4. Go to: Project Settings > General > Your apps > Web app (</>) and follow steps to create the web app

&nbsp;&nbsp;5. Copy the config code and place it within your App.js component

## Set Up Emulator

&nbsp;&nbsp;1. Download [Android Studio](https://developer.android.com/studio)

&nbsp;&nbsp;2. Set up Android Emulator

* Keep clicking **next** through the default settings of the installation process
* If you're asked to **Select Components to Install**, make sure "Android Virtual Device" is selected
* You may also need to define the location on your device where you want to install Android Studio. Make sure to add a logical file path
* At the end of the installation, accept all the license agreements. Select each of them, then tick the **Accept** button
* Finally, click **Finish** to start downloading all the selected Components

&nbsp;&nbsp;3. Configure Android Studio from the Welcom Screen

* After opening Android Studio you will see a welcome screen
* You should see a dropdown list labeled **More Actions**. Click this dropdown then select **SDK Manager**
* When the modal opens, in the bottom right, select **Show Package Details**
* Make sure the following options are selected

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Check which Android SDK Platform is installed by default (or select an Android SDK Platform to install)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Select the corresponding Google Play System Image to install

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Ensure the Google Play System Image selected corresponds to your open

* Once these options are selected, click the **Apply Button** to begin the System Image download and installation process

&nbsp;&nbsp;4. After the System Image Download and installation process is complete, navigate to the **SDK Tools** tab

* Once the SDK tools list appears, you’ll see that a few items have been checked by default, such as “Android SDK Platform-Tools”
* Check that you have “Android SDK Build-Tools” installed. You’ll need this set of tools later to run the command to build your app. If it’s not installed, check the box next to “Android SDK Build-Tools,” then click **Apply** at the bottom of the modal (and confirm that you’d like to download the latest version)

#### For MacOS Users

You’ll need to add the location of the Android SDK to your PATH (the list of directories that will be searched when you type anything in the command line) so that the build process can be properly executed on your device from the command line. Adding the Android SDK to your PATH tells your system where to look for executables when you ask for them

To do this, follow these steps:

&nbsp;&nbsp;1. Copy the path next to "Android SDK Location"

&nbsp;&nbsp;2. Check what shell your terminal is using (bash, bashrc or zshrc)

&nbsp;&nbsp;3. Locate and open your \~/.bash\_profile or \~/.bashrc file

&nbsp;&nbsp;4. Add the default stored location of ANDROID_SDK on your system by adding the following to your \~/.bash\_profile or \~/.bashrc file or \~/.zshrc

`export ANDROID_SDK=/Users/myuser/Library/Android/sdk`

&nbsp;&nbsp;5. Add the location for the tools you’ll need to interact with the Android device by adding Platform-Tools

`export PATH=$ANDROID_SDK/platform-tools:$PATH`

&nbsp;&nbsp;6. Save and close the file


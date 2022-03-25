<div align = "center">
  <h1>Widget Builder</h1>
  <p>Develop, install, and distribute HTML widgets for your Windows desktop with a simple CLI</p>
</div>
<br />

# Table of Contents
1. [Installation](#installation)
2. [Quickstart Guide](#quickstart-guide)
3. [Publishing and installing](#publishing-and-installing-widgets)
   1. [Publishing](#publishing)
   2. [Installing](#installing)
3. [The Config File](#the-config-file)
4. [Using the CLI](#using-the-cli)

<br />

# Installation
Download, unzip, navigate to the folder, and install with `npm`:
```
$ npm install -g
$ npm start
```

# Quickstart Guide
1) Create a new folder
2) `cd` to the folder, enter `widgets init`, and fill in your project's name
3) Mess around with the generated HTML file to customize your widget's appearance
4) Add and link JavaScript or CSS files to your master HTML file
5) Modify the config file
6) Navigate to the folder and enter `widgets build` to locally build and install your widget

<br />

# Publishing and installing widgets
### Publishing
So you want to share your widget for distribution? Here's what to do:
1) `cd` to your project folder
2) Run `widgets publish`
3) A new `dist` folder will be generated in the same directory as your project folder. You can now distribute this folder, and others can install it with `widgets install`

### Installing
Here's how to install a widget that was shared with you:
1) Navigate to the folder
2) Run `widgets install`

<br />

# The Config File
Every widgets project contains a `config.json` file. This file tells the program what settings you would like to use for your widget.<br />
Here's a standard config file:
```json
{
  "name": "widget",
  "version": "1.0.0",
  "description": "Custom desktop widget",
  "index": "./index.html",
  "properties": {
    "x": 100,
    "y": 100,
    "width": 100,
    "height": 100,
    "transparent": false,
    "interact": true,
    "draggable": true
  }
}
```
| Property | Definition |
| ---- | ---- |
| `name` (string) | Project name |
| `version` (string) | Project version |
| `index` (string) | The reference to your master HTML file. Other references (like JS or CSS) should be linked in this file. |
| `x`, `y`, `width`, and `height` (integers) | The position and dimensions of your widget when it is first start up |
| `transparent` (boolean) | Make the widget's background transparent |
| `interact` (boolean) | Make the widget interactable |
| `draggable` (boolean) | Make the widget draggable |

<br />

# Using the CLI
Once widget builder is installed, the CLI can be accessed with the keyword `widgets`

### Commands
| Command | Definition |
| ---- | ---- |
| `widgets build [folder]`     | Builds HTML files to desktop widget and installs |
| `widgets publish [folder]`   | Generates a dist file that can be installed by the widgets cli |
| `widgets install [folder]`   | Installs widget at folder |
| `widgets init [folder]`      | Initializes widgets project |
| `widgets list`               | Lists all installed widgets |
| `widgets uninstall <widget>` | Uninstall widget by name |

### Options
| Command | Definition |
| ---- | ---- |
| `widgets --help`     | Show help |
| `widgets --version`   | Displays the current version |

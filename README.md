# grunt-version-compile

[![NPM](https://nodei.co/npm/grunt-version-compile.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-version-compile/)

> Browserify centric plugin that allows multiple builds, rename files with known extensions in order to provide alternative versions of apps and components

## Getting Started
This plugin requires Grunt `>=0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-version-compile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-version-compile');
```

## The "compileVersion" task

### Overview
In your project's Gruntfile, add a section named `compileVersion` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  compileVersion: {
    versions: [''],
    root: '',
    task: ''
  },
});
```

### Options

#### options.versions
Type: `Array of strings`

An array of version names to use. These must match the filenames you want to scan for. So 'alt' will search for .alt.js or .alt.css files

#### options.root
Type: `String`
Default value: `'.'`

So you can reduce the amount of scanning you do and restrict the search to a specific directory

#### options.task
Type: `String`

What task to run for each language. The language will be appended to the task, so if your task is `build` and your versions contains `alt` the task `build:alt` will be run, as well as just 'build'.

### Usage Examples

This will:

1. Run the build task
2. Rename all `.alt.js` files found recursively in the `lib` directory to `.js`, renaming the existing file to `-old.js`
3. Run the `build:alt` task. This allows you to have multiple outputs
4. Rename all `-old.js` files back to their original name, and rename the `.js` files back to `.alt.js`

```js
grunt.initConfig({
  compileVersion: {
      versions: ['alt'],
      root: 'lib',
      task: 'build'
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 Initial release
0.1.1 Initial release
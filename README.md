fs.js
=====

This module provides a wrapper for the HTML5 File System API inspired in nodejs fs module.
While the underlying HTML5 API is quite feature rich, it is low level and difficult to use.

fs.js provides a good tradeoff between easy to use and flexibility with a cleaner api.

Note that this module is *inspired* by node js, not a port, and will therefore not be 
totally compatible with it. Also the module provides some useful methods that only
make sense on a browser environment (such as getting the url pointing to a local file).


Install
=======

Just pick up fs.js and include it in a script tag or use it with an AMD compatible loader. 
If you want to run the unit tests you can install the module via npm:

        npm install fs.js
        

Unit tests
==========

The unit tests are writte using mocha. For running the unit tests you need to use node and a webbrowser
with File System API capabilities (only Chrome at the moment).

Go to the test directory and run the test server:

        node server.js
        
Open a webbrowser pointing to http://localhost:8080


Quick Start
===========

Start by creating a file system. Note that we support a prefix for every file system.
This prefix allows us to have several independent file systems:

        var sizeInBytes = 1024 * 1024,
          prefix = 'filetest';
  
        FSFactory.create(sizeInBytes, 'test_fs', function(err, fs) {
          fs.read('foo', function(err, data){
            // data contains file contents.
          });
        });


Check the methods section for all the methods provided by the file system object.

## Methods

<a name="remove"/>

Renames a file or directory.

### rename(oldPath, newPath, function(err))

__Arguments__
 
    oldPath   {String} Old path.
    newPath   {String} New path name.
    callback  {Function} Callback called when finished.

---------------------------------------

<a name="stats"/>

Gives stats metadata of a file or directory

The received metadata in the callback contains the following properties:
isFile, isDirectory, size, mtime (modification time)

### stats(path, function(err, meta))

__Arguments__
 
    path   {String} Path to file or directory.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="exists"/>

Checks if a file exists or not.

### exists(path, function(err, exists))

__Arguments__
 
    path   {String} Path to file or directory.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="remove"/>

Removes the given file from the filesystem.

###   remove(path, function(err))
###   unlink(path, function(err))

__Arguments__
 
    path     {String} Path to file.
    callback {Function} Callback called when finished.
 
---------------------------------------

<a name="rmdir"/>

Removes the dir at the given path (and all its contents
including subdirs and files).

###   rmdir(path, function(err))

__Arguments__
 
    path     {String} Path to directory.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="mkdir"/>

Makes a directory in the given path.

###   mkdir(path, function(err, direntry))

__Arguments__
 
    path     {String} Path to directory.
    callback {Function} Callback called when finished.


---------------------------------------

<a name="mkpath"/>

Makes a directory and all the subdirectories (if needed) to the 
given path.

###   mkpath(path, function(err, direntry))

__Arguments__
 
    path     {String} Path to directory.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="readdir"/>

Reads the contents of a directory at the given path.

###   readdir(path, function(err, entries))

__Arguments__
 
    path     {String} Path to directory.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="readFile"/>

Reads the content of a file specified at the given path.
The contents of the file are returned as binary data (ArrayBuffer), 
or as text depending on the selected encoding.

###   readFile(path, encoding, function(err, data))

__Arguments__
 
    path     {String} Path to a file.
    encoding [{String}] Optional encoding (such as 'UTF-8'), otherwise returns data as
    an ArrayBuffer.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="readFileAsBlob"/>

Reads the content of a file specified at the given path as a Blob.

###   readFileAsBlob(path, function(err, blob))

__Arguments__
 
    path     {String} Path to a file.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="readFileAsUrl"/>

Reads the content of a file specified at the given path as a URL.
This function is useful for setting local binary files as 
images, videos, sounds, fonts, etc.

###   readFileAsUrl(path, function(err, url))

__Arguments__
 
    path     {String} Path to a file.
    callback {Function} Callback called when finished.

---------------------------------------

<a name="writeFile"/>

Writes a string, Blob or ArrayBuffer data to a file.

###   writeFile(path, data, function(err))

__Arguments__
 
    path     {String} Path to a file.
    data     {String|Blob|ArrayBuffer} Data to write to the file.
    callback {Function} Callback called when finished.


---------------------------------------

<a name="appendFile"/>

Appends a string, Blob or ArrayBuffer to a file.

###   appendFile(path, data, function(err))

__Arguments__
 
    path     {String} Path to a file.
    data     {String|Blob|ArrayBuffer} Data to append to the file.
    callback {Function} Callback called when finished.
    
---------------------------------------

<a name="wipe"/>

Wipes the whole file system. 

Use full = true if you want to wipe the root dir of the filesystem,
after doing this, the instance cannot be used anymore.

###   wipe(function(), [full])

__Arguments__
 
    callback {Function} Callback called when finished.
    full     {Boolean} true if all filesystems should be removed.


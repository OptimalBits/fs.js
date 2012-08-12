fs.js
=====

This module provides a wrapper for the HTML5 File System API inspired in nodejs fs module.
While the underlying HTML5 API is quite feature rich, it is low level and difficult to use.

fs.js provides a good tradeoff between easy to use and flexibility with a cleaner api.

Note that this module is *inspired* by node js, not a port, and will therefore not be 
totally compatible with it. Also the module provides some useful methods that only
make sense on a browser environment (such as getting the url to a local file).


Install
=======

Just pick up fs.js and include it in a script tag or use an AMD compatible loader. If you
want to run the unit tests you can install the module via npm:

        npm install fs.js
        

Examples
========

Start by creating a file system. Note that we support a prefix for every file system.
This prefix allows us to have several independent file systems:

        var sizeInBytes = 1024 * 1024,
          prefix = 'filetest';
  
        FSFactory.create(sizeInBytes, 'test_fs', function(err, fs) {
        
          
        
        
        });


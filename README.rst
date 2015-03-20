Phestum
=======


To write JS tests that runs on PhantomJS.

How to Use
----------

Put test scripts into '/tests' directory. Run phestum.js. Pass scripts that should be loaded as arguments. 

::

    phantomjs phestum.js /lib/lib1.js

Write tests as method of 'Tests'. Method name must contains 'Test'.

::

    Tests.Test1 = function () {
        phestum.assertEqual(1, 1);
        phestum.assertNotEqual(1, 0);
    };

If files exist in /tests/files/, it can access the data via 'Tests.files'.

::

    Tests.ShowFilesTest = function () {
        var files = Tests.files;
        for (var key in files) {
            console.log(key + ": " + files[key]);
        }
    };

License
-------

This software is released under the MIT License, see LICENSE.txt.

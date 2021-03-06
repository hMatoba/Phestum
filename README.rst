Phestum
=======

.. image:: https://travis-ci.org/hMatoba/Phestum.svg?branch=master
    :target: https://travis-ci.org/hMatoba/Phestum

To write JS tests that run on PhantomJS. Easy to use local files in tests.

How to Use
----------

Write tests as method of 'Tests'. Method name must contain 'Test'.

::

    // tests.js
    Tests.Test1 = function () {
        phestum.assertEqual(1, 1);
        phestum.assertNotEqual(1, 0);
    };

Put the test scripts into 'tests' directory. Run phestum.js.

::

    phantomjs phestum.js

Pass script path as argument that should be loaded.

::

    phantomjs phestum.js lib/lib1.js lib/lib2.js

If files exist in tests/files/, it can access the data via 'Tests.files'.

::

    Tests.ShowFilesTest = function () {
        var files = Tests.files;
        for (var filename in files) {
            console.log(filename + ": " + files[filename]);
        }
    };

License
-------

This software is released under the MIT License, see LICENSE.txt.

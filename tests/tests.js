// Write test as method of 'Tests'. The method's name must contains 'Test'.


Tests.Foo = function () {
    console.log("Not printed this.");  // Not 'Test' method.
}


Tests.Test1 = function () {
    console.log("do nothing");
};


Tests.AssertTest = function () {
    phestum.assertEqual(null, null);
    phestum.assertEqual(undefined, undefined);
    
    phestum.assertEqual(1, 1);
    phestum.assertEqual(0.1, 0.1);
    
    phestum.assertEqual("", "");
    phestum.assertEqual("1", "1");

    phestum.assertEqual([], []);
    phestum.assertEqual([0, 1], [0, 1]);
    phestum.assertEqual([[0, 1], [0, 1]], [[0, 1], [0, 1]]);

    phestum.assertEqual({"0":"0"}, {"0":"0"});
    phestum.assertEqual({"0":"0", "1":"1"}, {"1":"1", "0":"0"});
    phestum.assertEqual({"str":"0", "num":0}, {"str":"0", "num":0});
    phestum.assertEqual({"obj":{"array":[0, 1]}}, {"obj":{"array":[0, 1]}});
    
    
    phestum.assertNotEqual("", null);
    phestum.assertNotEqual(0, null);
    phestum.assertNotEqual(undefined, null);
    
    phestum.assertNotEqual(0, 1);
    phestum.assertNotEqual(1, 0.1);
    
    phestum.assertNotEqual("", "1");

    phestum.assertNotEqual([], [1]);
    phestum.assertNotEqual([0], [1]);
    phestum.assertNotEqual([0], [0, 1]);
    phestum.assertNotEqual([[0, 1], [0, 0]], [[0, 1], [0, 1]]);

    phestum.assertNotEqual({"0":"0"}, {"0":"1"});
    phestum.assertNotEqual({"0":"0"}, {"1":"0"});
    phestum.assertNotEqual({"str":"0", "num":0}, {"str":"0", "num":1});
    phestum.assertNotEqual({"obj":{"array":[0, 0]}}, {"obj":{"array":[0, 1]}});
    
    console.log("pass assert test.");
};


// If files exist in /tests/files/, it can access the data via 'Tests.files'.
Tests.ShowFilesTest = function () {
    var files = Tests.files;
    for (var filename in files) {
        console.log(filename + ": " + files[filename]);
    }
};


Tests.LibTest = function () {
    dummyLib1();
    dummyLib2();
};


Tests.FailTest1 = function () {
    phestum.assertFail(function () {
        throw("fail test");
    });
};


// If test includes async process, method's name must contain 'Async'.
// Normally, test method starts and it elapses 1.5 sec , phestum checks test finish.
Tests.AsyncTest = function () {
    setTimeout(function () {
        console.log("I'm async process.");
        Tests._AsyncTest = 1; // When async test finish, set 'Tests._[theTestMethodName] = 1;'
    }, 100);
};


//Tests.failAsyncTest1 = function () {
//    setTimeout(function () {
//        console.log("I'm async process.");
//        phestum.assertEqual(0, 1);
//        Tests._AsyncTest = 1;
//    }, 100);
//};
//
//Tests.failAsyncTest2 = function () {
//    setTimeout(function () {
//        console.log("I'm async process.");
//    }, 100);
//};
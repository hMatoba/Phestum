// If test includes async process, method's name must contain 'Async'.
Tests.AsyncTest1 = function (finish) {
    var img = new Image();
    img.src = "data:image/jpeg;base64," + btoa(Tests.files["foo.jpg"]);
    img.onload = function () {
        phestum.assertEqual([img.width, img.height], [1366, 720]);
        console.log("foo.jpg size: " + JSON.stringify([img.width, img.height]));
        finish(); // When async test finish, run first argument as function.
    };
};


// Normally, test method starts and it elapses 1.0 sec, phestum checks test finish.
// If you want set a time to wait check, run second argument with sec to wait.
Tests.AsyncTest2 = function (finish, willFinish) {
    willFinish(3.0);
    setTimeout(function () {
        console.log("I'm async process.");
        finish();
    }, 2000);
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

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


// Normally, test method starts and it elapses 0.1 sec, it checks test finish.
// If you want set a time to wait for checking, run second argument with sec to wait.
Tests.AsyncTest2 = function (finish, willFinish) {
    willFinish(1.2);
    setTimeout(function () {
        console.log("I'm async process.");
        finish();
    }, 1000);
};

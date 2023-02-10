(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/main.ts
  var delayMillis = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));
  var greet = (name) => `Hello ${name}`;
  var foo = () => __async(void 0, null, function* () {
    console.log(greet("World"));
    yield delayMillis(1e3);
    console.log("done");
    return true;
  });

  // src/browser.ts
  window.foo = foo;
  console.log('Method "foo" was added to the window object. You can try it yourself by just entering "await foo()"');
})();

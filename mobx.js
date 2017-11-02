const express = require('express');
const server = express();
const { observable, action, autorun, computed } = require('mobx');

function asyncRequest() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(Math.ceil(Math.random() * 10));
      } else {
        reject(new Error('something wrong'));
      }
    }, Math.random * 600 + 100);
  });
}

//observable
const counter = observable(0);

//computed

const sqrt = computed(() => {
  console.log('computing ...');
  return Math.sqrt(counter.get());
});

//action
function increment() {
  counter.set(counter.get() + 1);
  console.log(`increment, counter value is ${counter.get() + 1}`);
}

function asyncIncrement() {
  console.log('asyncIncrement start');
  asyncRequest()
    .then(n => {
      console.log(`asyncIncrement success, counter value is ${counter.get() + n}`);
      counter.set(counter.get() + n);
    })
    .catch(error => {
      console.log(error.message);
      console.log('asyncIncrement failed');
    });
}


//view to trigger by action
increment();
console.log('-------')
setInterval(asyncIncrement, 5000);

//observe
//render view once data changed
let t = 0;
autorun(() => {
  t++;
  console.log(`render,value ---> ${counter.get()}`);

  if (t % 2 === 0) {
    console.log(`render,computed value ---> ${sqrt}`);
  }

});

server.listen(3000);

// async function asyncIncrement() {
//   try {
//     //start
//     console.log('asyncIncrement start');
//     const n = await asyncRequest();
//     //success
//     console.log('asyncIncrement success');
//     counter.set(counter.get() + n);

//   } catch (error) {
//     //failed
//     console.log('asyncIncrement failed');
//   }
// }

// class Counter {
//   @observable
//   value = 1;

//   @action
//   increment() {
//     this.value++;
//   }

//   @action
//   async asyncIncrement() {
//     try {
//       //start
//       const n = await asyncRequest();
//       //sucees
//       this.value += n;
//     } catch (error) {
//       //failed
//     }
//   }
// }

// const counter = new Counter();
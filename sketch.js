let training_data = [
  {
    inputs: [0, 1],
    targets: [1]
  },
  {
    inputs: [1, 0],
    targets: [1]
  },
  {
    inputs: [0, 0],
    targets: [0]
  },
  {
    inputs: [1, 1],
    targets: [0]
  }
];



function setup() {
  // Add your setup code here

  let nn = new NeuralNetwork(2, 2, 1);


  for(let i = 0 ; i < 5000 ; i++ ) {

  for(data of training_data) {

  let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }
}

console.log(nn.feedforward([0, 1]));
console.log(nn.feedforward([1, 1]));
console.log(nn.feedforward([1, 0]));
console.log(nn.feedforward([0, 0]));

}

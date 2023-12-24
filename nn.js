class ActivationFunction {
    constructor(func, dfunc) {
      this.func = func;
      this.dfunc = dfunc;
    }
  }
  
  let sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
  );
  

class NeuralNetwork {
    constructor(a, b, c) {

        if (a instanceof NeuralNetwork) {
            console.log(true)
            this.input_nodes = a.input_nodes;
            this.hidden_nodes = a.hidden_nodes
            this.output_nodes = a.output_nodes

            this.weights_ih = a.weights_ih.copy();
            this.weights_ho = a.weights_ho.copy();

            this.bias_h = a.bias_h.copy();
            this.bias_o = a.bias_o.copy();
        }
         else {
   
        this.input_nodes = a;
        this.hidden_nodes = b;
        this.output_nodes = c;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
        this.learning_rate = 0.1;

        }

// TODO: copy these as well
    this.setLearningRate();
    this.setActivationFunction();

    }



    feedforward(input_array) {


        //generating the hidden outputs

        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);

        hidden.add(this.bias_h);

        // activation function

        hidden.map(sigmoid);

        // generating the output's output

        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);



        return output.toArray();
    }

    setLearningRate(learning_rate = 0.1) {
        this.learning_rate = learning_rate;
      }
    
      setActivationFunction(func = sigmoid) {
        this.activation_function = func;
      }
    

    train(inputs_array, targets_array) {

        let inputs = Matrix.fromArray(inputs_array);

        let hidden = Matrix.multiply(this.weights_ih, inputs);

        hidden.add(this.bias_h);

        // activation function

        hidden.map(this.activation_function.func);

        // generating the output's output



        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(this.activation_function.func);

        // convert array to matrix object
        let targets = Matrix.fromArray(targets_array);



        let output_error = Matrix.subtract(targets, outputs);

        //calculate gradient
        let gradients = Matrix.map(outputs, this.activation_function.dfunc);

        gradients.multiply(output_error);
        gradients.multiply(this.learning_rate);
        //calculate deltas
        let hidden_T = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);


        //adjust the weights by deltas

        this.weights_ho.add(weights_ho_deltas);
        this.bias_o.add(gradients);


        let who_t = Matrix.transpose(this.weights_ho);

        let hidden_error = Matrix.multiply(who_t, output_error);

        //calculate hidden gradient

        let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
        hidden_gradient.multiply(hidden_error);
        hidden_gradient.multiply(this.learning_rate);
        //calculate input->hidden deltas

        let inputs_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

        //adjust the weights by deltas

        this.weights_ih.add(weights_ih_deltas);
        this.bias_h.add(hidden_gradient);


    }




    serialize() {
        return JSON.stringify(this);
      }
    
      static deserialize(data) {
        if (typeof data == 'string') {
          data = JSON.parse(data);
        }
        let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
        nn.weights_ih = Matrix.deserialize(data.weights_ih);
        nn.weights_ho = Matrix.deserialize(data.weights_ho);
        nn.bias_h = Matrix.deserialize(data.bias_h);
        nn.bias_o = Matrix.deserialize(data.bias_o);
        nn.learning_rate = data.learning_rate;
        return nn;
      }
    
 //functions for neuroevolution

      copy() {
        return new NeuralNetwork(this);
      } 


      mutate(rate) {
        function mutate(val) {
            
            if(Math.random() < rate) {
                return Math.random() * 1000 - 1;
            } else {
                return val;
            }
        }

        this.weights_ih.map(mutate);
        this.weights_ho.map(mutate);
        this.bias_h.map(mutate);
        this.bias_o.map(mutate);

      }


}
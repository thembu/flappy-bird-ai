function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));

}

function dsigmoid(y) {
    return y * (1 - y);
}


class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
             this.input_nodes = input_nodes;
             this.hidden_nodes = hidden_nodes;
             this.output_nodes = output_nodes;

             this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
             this.weights_ho =  new Matrix(this.output_nodes, this.hidden_nodes);
             this.weights_ih.randomize();
             this.weights_ho.randomize();

             this.bias_h = new Matrix(this.hidden_nodes, 1);
             this.bias_o = new Matrix(this.output_nodes, 1);
             this.bias_h.randomize();
            this.bias_o.randomize();
            this.learning_rate = 0.1;

    }



    feedforward (input_array) {  


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

    train(inputs_array , targets_array) {
    
        let inputs = Matrix.fromArray(inputs_array);
 
        let hidden = Matrix.multiply(this.weights_ih, inputs);

        hidden.add(this.bias_h);

        // activation function

        hidden.map(sigmoid);

        // generating the output's output



        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid); 
  
        // convert array to matrix object
       let targets = Matrix.fromArray(targets_array);



        let output_error = Matrix.subtract(targets, outputs);

        //calculate gradient
        let gradients = Matrix.map(outputs,dsigmoid);

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

        let hidden_gradient = Matrix.map(hidden,dsigmoid);
        hidden_gradient.multiply(hidden_error);
        hidden_gradient.multiply(this.learning_rate);
        //calculate input->hidden deltas

        let inputs_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

        //adjust the weights by deltas

        this.weights_ih.add(weights_ih_deltas);
        this.bias_h.add(hidden_gradient);
        
        
    }

}
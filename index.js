import   NodeCAM   from './src/nodeCAM.js';
import ConnectorCAM  from './src/connectorCAM.js';




console.log("NODE: \b");
let test_node = new NodeCAM();
test_node.setText("aaa 111555 ccc 444 aaa 111555 ccc 444aaa 444");
test_node.setValue(3);
test_node.printout();


console.log("\b");
console.log("\b");
console.log("EDGE: \b");
let test_connector = new ConnectorCAM();
test_connector.setValue(0);
test_connector.setShape();
test_connector.printout();

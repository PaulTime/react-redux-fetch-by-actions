import * as React from "react";
import * as ReactDOM from "react-dom";

const Test = (): React.ElementType => <div>test</div>;

ReactDOM.render(
    <Test />,
    document.getElementById('root'),
);
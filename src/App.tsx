import { Component } from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: this.props.model,
    };
  }

  updateParamValue = (paramId: number, value: string) => {
    const newModel = {
      ...this.state.model,
      paramValues: this.state.model.paramValues.map(paramValue =>
        paramValue.paramId === paramId
          ? { ...paramValue, value }
          : paramValue
      ),
    };
    this.setState({ model: newModel });
  };

  render() {
    return (
      <div>
        {this.props.params.map(param => (
          <div key={param.id}>
            <label>
              {param.name}:
              <input
                type="text"
                value={
                  this.state.model.paramValues.find(pv => pv.paramId === param.id)?.value || ''
                }
                onChange={e =>
                  this.updateParamValue(param.id, e.target.value)
                }
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

const params = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model = {
  paramValues: [
    { paramId: 1, value: 'посвященное' },
    { paramId: 2, value: 'макси' },
  ],
};

function App() {
  return (
    <div className="App">
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;

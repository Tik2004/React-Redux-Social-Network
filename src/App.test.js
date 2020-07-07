import React from 'react';
import { render } from '@testing-library/react';
import CoolApp from "./App";
import {unmountComponentAtNode} from "react-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<CoolApp />, div);
  unmountComponentAtNode(div);
});

import React from 'react';
import { TodoList } from './TodoList';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<TodoList />', () => {
  it('calls addTodo Redux action creator with button click', () => {
    const props = {
      addTodo: jest.fn(),
      todos: []
    };
    const wrapper = shallow(<TodoList {...props} />);
    wrapper.find('input').simulate('change', {currentTarget: {value: 'Buy groceries'}});
    wrapper.find('.todo--button').simulate('click');
    expect(props.addTodo).toHaveBeenCalledWith({text: 'Buy groceries'});
  });

  it('calls removeTodo Redux action creator on li click', () => {
    const props = {
      removeTodo: jest.fn(),
      todos: [{text: 'Buy groceries'}, {text: 'Change oil'}]
    };
    const wrapper = shallow(<TodoList {...props} />);
    wrapper.find('li').at(0).simulate('click');
    expect(props.removeTodo).toHaveBeenCalledWith(0);
  });

  test('matches snapshot', () => {
    const props = {
      todos: []
    };
    const wrapper = shallow(<TodoList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

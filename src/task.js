import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'white'};
  cursor: ${props => (props.isDragDisabled ? 'no-drop' : 'default')};
`;

// 可拖拽的组件
export default class Task extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={this.props.task.disabled}
      >
        {(provided, snapshot) => (
          <Container
            // 提供拖拽的数据
            {...provided.draggableProps}
            // 绑在需要拖拽的地方
            {...provided.dragHandleProps}
            // 暴露DOM给上级对象
            ref={provided.innerRef}
            // 是否拖拽中
            isDragging={snapshot.isDragging}
            // 是否禁用拖拽
            isDragDisabled={this.props.task.disabled}
          >
            {this.props.task.title}
          </Container>
        )}
      </Draggable>
    );
  }
}

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import Column from './column';
import ReactDOM from 'react-dom';

const Container = styled.div`
  display: flex;
`;

class Index extends React.Component {
  state = initialData;

  // 参数: 目标，源， 拖拽ID
  onDragEnd = ({ destination, source, draggableId }) => {
    // 没有目标不处理
    if (!destination) {
      return;
    }

    // 相同的拖拽id(类型)，索引也是一致的情况下，就是没有改动
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // 更新列
    const columns = this.state.columns.map(row => {
      // 和目标列的类型一致，表示是在同一个列中移动
      // 这里的row.id 就是列类型，不是task的类型
      if (row.type === destination.droppableId) {
        // 生成新的数组用于数据处理
        const ids = Array.from(row.taskIds);
        // 和目标列的类型一致，表示是在同一个列中移动
        if (destination.droppableId === source.droppableId) {
          const tmp = ids[source.index];
          ids[source.index] = ids[destination.index];
          ids[destination.index] = tmp;
          return {
            ...row,
            taskIds: ids,
          };
        } else {
          // 在目标位置插入ID
          ids.splice(destination.index, 0, draggableId);
          return {
            ...row,
            taskIds: ids,
          };
        }
      } else if (row.type === source.droppableId) {
        // 拖动ID（类型）等于源表类型，需要过滤掉
        return {
          ...row,
          taskIds: Array.from(row.taskIds).filter(id => id !== draggableId),
        };
      } else {
        return row;
      }
    });

    this.setState({
      ...this.state.list,
      columns,
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columns.map(column => {
            const tasks = column.taskIds.map(id => {
              return this.state.list.find(i => i.id === id);
            });
            return <Column key={column.type} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

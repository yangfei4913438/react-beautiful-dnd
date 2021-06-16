import jsonData from './data.json';

const initialData = {
  list: jsonData.list,
  columns: [
    {
      type: 'init',
      title: '已规划的任务',
      taskIds: jsonData.list.filter(o => o.level === 0).map(o => o.id),
      order: 0,
    },
    {
      type: 'progress',
      title: '执行中的任务',
      taskIds: jsonData.list.filter(o => o.level === 1).map(o => o.id),
      order: 1,
    },
    {
      type: 'done',
      title: '已完成的任务',
      taskIds: jsonData.list.filter(o => o.level === 2).map(o => o.id),
      order: 2,
    },
  ],
};

export default initialData;

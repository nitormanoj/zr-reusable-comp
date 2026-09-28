import { ZrTableColumn, ZrTableRow } from "projects/zr-components/src/lib/ztable/zr-table.types";

 export const columns: ZrTableColumn[] = [
    { field: 'id', header: 'ID', width: '80px' },
    { field: 'projectName', header: 'Project Name', width: '200px' },
    { field: 'clientName', header: 'Client Name', width: '200px' },
    { field: 'projectManager', header: 'Project Manager', width: '180px' },
    { field: 'status', header: 'Status', width: '120px' }
  ];

  export const projects: ZrTableRow[] = [
    {
      id: 101,
      projectName: 'Metro Tower',
      clientName: 'ABC Developers',
      projectManager: 'Rahul Sharma',
      status: 'Active'
    },
    {
      id: 102,
      projectName: 'City Mall',
      clientName: 'XYZ Infrastructure',
      projectManager: 'Priya Patil',
      status: 'Planning'
    },
    {
      id: 103,
      projectName: 'Highway Bridge',
      clientName: 'Government Authority',
      projectManager: 'Amit Deshmukh',
      status: 'Active'
    },
    {
      id: 104,
      projectName: 'Green Valley',
      clientName: 'Green Homes',
      projectManager: 'Sneha Kulkarni',
      status: 'Completed'
    },
    {
      id: 105,
      projectName: 'Tech Park',
      clientName: 'Tech Solutions',
      projectManager: 'Rohan Mehta',
      status: 'Planning'
    },
    {
      id: 106,
      projectName: 'Riverfront',
      clientName: 'Urban Development',
      projectManager: 'Neha Shah',
      status: 'Active'
    }
  ];
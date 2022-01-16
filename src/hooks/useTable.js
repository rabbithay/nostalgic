import { useState } from 'react';
import { Form } from 'antd';

function useTable(tableData, setTableData) {
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  function isEditing(record) {
    return record.id === editingKey;
  }

  function deleteRow({ rowId }) {
    setTableData(tableData.filter((row) => row.id !== rowId));
  }

  function edit({ rowData }) {
    form.setFieldsValue({
      ...rowData,
    });
    setEditingKey(rowData.id);
  }

  function cancelEdit() {
    setEditingKey('');
  }

  async function saveEdit({ key }) {
    try {
      const row = await form.validateFields();
      const newData = [...tableData];
      const index = newData.findIndex((rowInfo) => key === rowInfo.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }

      setTableData(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }

  return {
    editingKey,
    setEditingKey,
    isEditing,
    deleteRow,
    edit,
    cancelEdit,
    saveEdit,
    form,
  };
}

export default useTable;

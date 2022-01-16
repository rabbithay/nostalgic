export function deleteRow({ tableData, setTableData, rowId }) {
  setTableData(tableData.filter((row) => row.id !== rowId));
}

export function edit({ useForm, rowData, setIsEditingKey }) {
  useForm.setFieldsValue({
    ...rowData,
  });
  setIsEditingKey(rowData.id);
}

export function cancelEdit({ setIsEditingKey }) {
  setIsEditingKey('');
}

export async function saveEdit({
  useForm, tableData, setTableData, key, setIsEditingKey,
}) {
  try {
    const row = await useForm.validateFields();
    const newData = [...tableData];
    const index = newData.findIndex((rowInfo) => key === rowInfo.id);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
    } else {
      newData.push(row);
    }
    setTableData(newData);
    setIsEditingKey('');
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
}

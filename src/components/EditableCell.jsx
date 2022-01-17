/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form, InputNumber, Input, Select,
} from 'antd';

export function EditableCell({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  selectOptions,
  ...restProps
}) {
  const typeInputNode = {
    text: <Input />,
    number: <InputNumber />,
    select: selectOptions
  && (
  <Select>
    {
      selectOptions.map((option) => (
        <Select.Option value={option.value}>{option.text}</Select.Option>
      ))
    }
  </Select>
  ),
  };

  const inputNode = typeInputNode[inputType];

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

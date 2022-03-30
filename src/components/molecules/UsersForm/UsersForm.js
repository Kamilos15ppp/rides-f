import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message, Select } from 'antd';
import { AntdFormWrapper } from 'components/atoms/AntdFormWrapper/AntdFormWrapper';

const UsersForm = ({ onFinish, isLoading = false }) => {
  const [adminOption, setAdminOption] = useState();
  const [form] = Form.useForm();
  const { Option } = Select;
  const onFinishFailed = (errorInfo) => {
    if (errorInfo) {
      message.error('Wprowadź poprawne dane');
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChange = (adminOpt) => setAdminOption(adminOpt);

  return (
    <AntdFormWrapper>
      <Form
        form={form}
        name="usersForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        size="default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny nick',
            },
          ]}
        >
          <Input placeholder="nick" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny email',
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawne hasło',
            },
          ]}
        >
          <Input.Password placeholder="hasło" />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: 'Wprowadź ponownie hasło',
            },
          ]}
        >
          <Input.Password placeholder="powtórz hasło" />
        </Form.Item>
        <Form.Item
          name="is_admin"
          rules={[
            {
              required: true,
              message: 'Wybierz poprawną opcję',
            },
          ]}
        >
          <Select
            value={adminOption}
            style={{
              width: 100,
              margin: '0 8px',
            }}
            onChange={onChange}
            placeholder="admin"
          >
            <Option value="0">Nie</Option>
            <Option value="1">Tak</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            shape="round"
          >
            Zapisz
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button htmlType="button" onClick={onReset} shape="round">
            Wyczyść
          </Button>
        </Form.Item>
      </Form>
    </AntdFormWrapper>
  );
};

export default UsersForm;

UsersForm.propTypes = {
  onFinish: PropTypes.func,
  isLoading: PropTypes.bool,
};

import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Wrapper } from './LoginForm.styles';

const LoginForm = ({ onFinish }) => {
  const onFinishFailed = (errorInfo) => {
    if (errorInfo) {
      message.error('Wprowadź poprawne dane');
    }
  };
  return (
    <Wrapper>
      <Form
        name="loginForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hasło"
          name="password"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawne hasło',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" shape="round">
            Zaloguj
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message } from 'antd';
import { AntdFormWrapper } from 'components/atoms/AntdFormWrapper/AntdFormWrapper';

const ChangePasswordForm = ({ onFinish, isLoading = false }) => {
  const onFinishFailed = (errorInfo) => {
    if (errorInfo) {
      message.error('Wprowadź poprawne dane');
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    const clearFieldsTimeout = setTimeout(() => {
      onReset();
    }, 1000);
    return () => clearTimeout(clearFieldsTimeout);
  }, [isLoading]);

  return (
    <AntdFormWrapper>
      <Form
        form={form}
        name="changePasswordForm"
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
          name="old_password"
          rules={[
            {
              required: true,
              message: 'Wprowadź stare hasło',
            },
          ]}
        >
          <Input.Password placeholder="stare hasło" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Wprowadź nowe hasło',
            },
          ]}
        >
          <Input.Password placeholder="nowe hasło" />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: 'Wprowadź ponownie nowe hasło',
            },
          ]}
        >
          <Input.Password placeholder="potwierdź hasło" />
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
            Potwierdź
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

export default ChangePasswordForm;

ChangePasswordForm.propTypes = {
  onFinish: PropTypes.func,
  isLoading: PropTypes.bool,
};

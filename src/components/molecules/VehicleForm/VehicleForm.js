import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message, Select } from 'antd';
import { AntdFormWrapper } from 'components/atoms/AntdFormWrapper/AntdFormWrapper';

const { Option } = Select;

const VehicleForm = ({ onFinish, isLoading = false }) => {
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    if (errorInfo) {
      message.error('Wprowadź poprawne dane');
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <AntdFormWrapper>
      <Form
        form={form}
        name="vehicleForm"
        labelCol={{
          span: 20,
        }}
        wrapperCol={{
          span: 25,
        }}
        size="default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="tabor"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny nr taborowy',
            },
          ]}
        >
          <Input placeholder="taborowy" />
        </Form.Item>
        <Form.Item
          name="producer"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawną nazwę producenta',
            },
          ]}
        >
          <Input placeholder="producent" />
        </Form.Item>
        <Form.Item
          name="model"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny model',
            },
          ]}
        >
          <Input placeholder="model" />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny typ',
            },
          ]}
        >
          <Select style={{ width: 180 }} placeholder="typ">
            <Option value="A">Autobus</Option>
            <Option value="T">Tramwaj</Option>
            <Option value="Z">Zabytek</Option>
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
            Dodaj
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

export default VehicleForm;

VehicleForm.propTypes = {
  onFinish: PropTypes.func,
  isLoading: PropTypes.bool,
};

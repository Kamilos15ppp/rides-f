import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Wrapper } from './RidesForm.styles';

const RidesForm = ({
  fields = null,
  onFinish,
  isLoading = false,
  isEditing = false,
}) => {
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
    onReset();
  }, [fields]);

  return (
    <Wrapper>
      <Form
        form={form}
        name="ridesForm"
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
          name="tabor"
          initialValue={fields ? fields[0].value : ''}
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
          name="line"
          initialValue={fields ? fields[1].value : ''}
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawną linię',
            },
          ]}
        >
          <Input placeholder="linia" />
        </Form.Item>
        <Form.Item
          name="direction"
          initialValue={fields ? fields[2].value : ''}
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny kierunek',
            },
          ]}
        >
          <Input placeholder="kierunek" />
        </Form.Item>
        <Form.Item
          name="first"
          initialValue={fields ? fields[3].value : ''}
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny przystanek',
            },
          ]}
        >
          <Input placeholder="przystanek początkowy" />
        </Form.Item>
        <Form.Item
          name="last"
          initialValue={fields ? fields[4].value : ''}
          rules={[
            {
              required: true,
              message: 'Wprowadź poprawny przystanek',
            },
          ]}
        >
          <Input placeholder="przystanek końcowy" />
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
        {!isEditing && (
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
        )}
      </Form>
    </Wrapper>
  );
};

export default RidesForm;

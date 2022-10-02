import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AutoComplete, Button, Form, Input, message, Switch } from 'antd';
import { AntdFormWrapper } from 'components/atoms/AntdFormWrapper/AntdFormWrapper';
import { useChangeUserHintsMutation } from 'store';
import { useGetUserMutation } from 'store/api/user';
import { updateUserInfo } from 'store/userSlice';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const RidesForm = ({
  fields = null,
  options = {},
  onFinish,
  isLoading = false,
  isEditing = false,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userHints = useSelector((state) => state.user.isHint);
  const [email, setEmail] = useState(null);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [changeUserHints, rest] = useChangeUserHintsMutation();
  const [getUser] = useGetUserMutation();
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    if (errorInfo) {
      message.error('Wprowadź poprawne dane');
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onHintsChange = () => {
    setIsSwitchLoading(true);
  };

  const replaceStopsValues = () => {
    const { first, last } = form.getFieldsValue();
    form.setFieldValue('first', last);
    form.setFieldValue('last', first);
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (email) {
      const is_hint = userHints === 0 ? 1 : 0;
      changeUserHints({ is_hint, email });
    } else {
      setEmail(user.email);
    }
    getUser().then((res) => dispatch(updateUserInfo(res.data)));
  }, [isSwitchLoading]);

  useEffect(() => {
    const { isSuccess, isError } = rest;
    if (isSuccess) {
      setIsSwitchLoading(false);
    }
    if (isError) {
      message.error('Coś poszło nie tak, spróbuj ponownie później');
      setIsSwitchLoading(false);
    }
  }, [rest.isSuccess, rest.isError]);

  useEffect(() => {
    onReset();
  }, [fields]);

  return (
    <AntdFormWrapper>
      <Form
        form={form}
        name="ridesForm"
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
        <Form.Item label="Podpowiedzi">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={!!userHints}
            loading={isSwitchLoading}
            onChange={onHintsChange}
          />
        </Form.Item>
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
          {userHints ? (
            <AutoComplete
              data-testid="line"
              options={options.fetchedLines}
              style={{
                width: 180,
                textAlign: 'left',
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              placeholder="linia"
            />
          ) : (
            <Input placeholder="linia" />
          )}
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
          {userHints ? (
            <AutoComplete
              data-testid="direction"
              options={options.fetchedDirections}
              style={{
                width: 180,
                textAlign: 'left',
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              placeholder="kierunek"
            />
          ) : (
            <Input placeholder="kierunek" />
          )}
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
          {userHints ? (
            <AutoComplete
              data-testid="first"
              options={options.fetchedStops}
              style={{
                width: 180,
                textAlign: 'left',
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              placeholder="przystanek początkowy"
            />
          ) : (
            <Input placeholder="przystanek początkowy" />
          )}
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
          {userHints ? (
            <AutoComplete
              data-testid="last"
              options={options.fetchedStops}
              style={{
                width: 180,
                textAlign: 'left',
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              placeholder="przystanek końcowy"
            />
          ) : (
            <Input placeholder="przystanek końcowy" />
          )}
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
            <Button
              type="primary"
              htmlType="button"
              onClick={replaceStopsValues}
              shape="round"
            >
              Zamień przystanki
            </Button>
          </Form.Item>
        )}
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
    </AntdFormWrapper>
  );
};

export default RidesForm;

RidesForm.propTypes = {
  fields: PropTypes.array,
  options: PropTypes.object,
  onFinish: PropTypes.func,
  isLoading: PropTypes.bool,
  isEditing: PropTypes.bool,
};

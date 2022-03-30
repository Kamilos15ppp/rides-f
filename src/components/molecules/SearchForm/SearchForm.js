import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntdFormWrapper } from 'components/atoms/AntdFormWrapper/AntdFormWrapper';
import { Form, DatePicker, Input, Select, message, Button } from 'antd';
import {
  saveEndDate,
  saveSearchInfo,
  saveSearchPhrase,
  saveSortField,
  saveStartDate,
} from 'store/searchSlice';

const { Option } = Select;

const SearchForm = ({ onFinish, clear, isLoading }) => {
  const dispatch = useDispatch();
  const isDateSelected = useSelector((state) => state.search.isDateSelected);
  const phrase = useSelector((state) => state.search.phrase);
  const defaultColumn = useSelector((state) => state.search.field);
  const defaultSortColumn = useSelector((state) => state.search.sortField);
  const [placeholder, setPlaceholder] = useState('Wpisz szukaną frazę');
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    if (errorInfo) {
      message.error('Wprowadź poprawne dane');
    }
  };

  const onColumnChange = (value) => {
    const searchObj = {
      phrase,
      field: value,
      isDateSelected: value === 'created_at',
    };
    dispatch(saveSearchInfo(searchObj));
  };

  const onSortColumnChange = (value) => {
    dispatch(saveSortField(value));
  };

  const onReset = () => {
    form.resetFields();
    clear();
  };

  useEffect(() => {
    switch (defaultColumn) {
      case 'tabor':
        setPlaceholder('Wpisz taborowy');
        break;
      case 'line':
        setPlaceholder('Wpisz linię');
        break;
      case 'direction':
        setPlaceholder('Wpisz kierunek');
        break;
      case 'stop':
        setPlaceholder('Wpisz przystanek');
        break;
      default:
        setPlaceholder('Wpisz szukaną frazę');
        break;
    }
  }, [defaultColumn]);

  return (
    <AntdFormWrapper>
      <Form
        form={form}
        name="searchForm"
        labelCol={{
          span: 20,
        }}
        wrapperCol={{
          span: 25,
        }}
        size="default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onReset={onReset}
      >
        <Form.Item
          name="column"
          initialValue={[defaultColumn]}
          rules={[
            {
              required: true,
              message: 'Wybierz po czym chcesz wyszukać',
            },
          ]}
        >
          <Select
            style={{ width: 180 }}
            placeholder="Rodzaj frazy"
            onChange={onColumnChange}
          >
            <Option value="tabor">Taborowy</Option>
            <Option value="line">Linia</Option>
            <Option value="direction">Kierunek</Option>
            <Option value="first">Przystanek początkowy</Option>
            <Option value="last">Przystanek końcowy</Option>
            <Option value="created_at">Data utworzenia</Option>
          </Select>
        </Form.Item>
        {!isDateSelected ? (
          <Form.Item
            name="phrase"
            rules={[
              {
                required: true,
                message: 'Wprowadź frazę',
              },
            ]}
          >
            <Input
              onChange={(e) => dispatch(saveSearchPhrase(e.target.value))}
              placeholder={placeholder}
            />
          </Form.Item>
        ) : null}
        <Form.Item name="startDate">
          <DatePicker
            onChange={(date, dateString) => dispatch(saveStartDate(dateString))}
            format="YYYY-MM-DD"
            style={{ width: 180 }}
            placeholder="Data początkowa"
          />
        </Form.Item>
        <Form.Item name="endDate">
          <DatePicker
            onChange={(date, dateString) => dispatch(saveEndDate(dateString))}
            format="YYYY-MM-DD"
            style={{ width: 180 }}
            placeholder="Data końcowa"
          />
        </Form.Item>
        <Form.Item name="sortColumn" initialValue={[defaultSortColumn]}>
          <Select
            style={{ width: 180 }}
            placeholder="Rodzaj sortowania"
            onChange={onSortColumnChange}
          >
            {!isDateSelected ? (
              <>
                <Option value="tabor-asc">Taborowy Rosnąco</Option>
                <Option value="tabor-desc">Taborowy Malejąco</Option>
                <Option value="line-asc">Linia Rosnąco</Option>
                <Option value="line-desc">Linia Malejąco</Option>
                <Option value="direction-asc">Kierunek Rosnąco</Option>
                <Option value="direction-desc">Kierunek Malejąco</Option>
                <Option value="first-asc">Przyst począt Rosnąco</Option>
                <Option value="first-desc">Przyst począt Malejąco</Option>
                <Option value="last-asc">Przyst końco Rosnąco</Option>
                <Option value="last-desc">Przyst końco Malejąco</Option>
              </>
            ) : null}
            <Option value="created_at-asc">Data utworzenia Rosnąco</Option>
            <Option value="created_at-desc">Data utworzenia Malejąco</Option>
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
            Wyszukaj
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

export default SearchForm;

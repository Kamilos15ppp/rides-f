import React from 'react';
import { Button, Table } from 'antd';

const UsersTable = ({ users, isTableLoading = false, deleteUser }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Imię',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Administrator',
      dataIndex: 'is_admin',
      key: 'is_admin',
    },
    {
      title: 'Utworzono',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Zmieniono',
      dataIndex: 'updated_at',
      key: 'updated_ap',
    },
    {
      title: 'Akcja',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="danger"
          shape="round"
          onClick={() => deleteUser(record.id)}
        >
          Usuń
        </Button>
      ),
    },
  ];

  const data = users
    ? users.map(({ id, email, name, is_admin, created_at, updated_at }) => {
        return {
          key: id,
          id,
          email,
          name,
          is_admin: is_admin ? 'Tak' : 'Nie',
          created_at,
          updated_at,
        };
      })
    : [];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isTableLoading}
        scroll={{ x: 500 }}
        size="middle"
        tableLayout="unset"
        pagination={{ position: ['none', 'bottomCenter'] }}
      />
    </>
  );
};

export default UsersTable;

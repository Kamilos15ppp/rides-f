import React, { useEffect, useState } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import { useDeleteUserMutation, useGetUsersQuery } from 'store';
import { Button, message } from 'antd';

const UsersManagement = () => {
  const [data, setData] = useState(null);
  const [deleteUser, rest] = useDeleteUserMutation();
  const { data: users, isLoading, isSuccess, isFetching } = useGetUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      setData(
        users.map(({ id, email, name, is_admin, created_at, updated_at }) => {
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
      );
    }
  }, [isSuccess, isFetching]);

  useEffect(() => {
    const { isSuccess, isError } = rest;
    if (isSuccess) {
      message.success('Usunięto użytkownika');
    }
    if (isError) {
      message.error('Błąd podczas usuwania użytkownika');
    }
  }, [rest.isSuccess, rest.isError]);

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

  return (
    <TableWrapper>
      <CustomTable
        columns={columns}
        fetchedData={data}
        isTableLoading={isLoading}
        pagination={false}
        scroll={{ x: 500 }}
      />
    </TableWrapper>
  );
};

export default UsersManagement;

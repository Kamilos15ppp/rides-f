import React, { useEffect } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import UsersTable from 'components/molecules/UsersTable/UsersTable';
import { useDeleteUserMutation, useGetUsersQuery } from 'store';
import { message } from 'antd';

const UsersManagement = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [deleteUser, rest] = useDeleteUserMutation();

  useEffect(() => {
    const { isSuccess, isError } = rest;
    if (isSuccess) {
      message.success('Usunięto użytkownika');
    }
    if (isError) {
      message.error('Coś poszło nie tak');
    }
  }, [rest.isSuccess, rest.isError]);

  return (
    <TableWrapper>
      <UsersTable
        users={data}
        isTableLoading={isLoading}
        deleteUser={deleteUser}
      />
    </TableWrapper>
  );
};

export default UsersManagement;

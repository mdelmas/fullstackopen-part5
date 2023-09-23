import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table } from '@mui/material';

const UserList = ({
  users
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Link to={`/users/${user.id}`} style={{ color: 'inherit' }}>
                  { user.username }
                </Link>
              </TableCell>
              <TableCell>{ user.blogs.length }</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};
UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export { UserList };

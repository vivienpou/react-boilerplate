/* eslint-disable prettier/prettier */
/**
 *
 * AdminUsers
 *
 */
import * as React from 'react';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  SortingState,
  EditingState,
  PagingState,
  SummaryState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableFixedColumns,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import ProgressBarCell from 'components/ProgressBarCell';

import { generateRows, globalUsersValues } from 'demo-data-generator-users';
import HighlightedCell from 'components/HighlightedCell';


const styles = theme => ({
  lookupEditCell: {
    padding: theme.spacing(1),
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
  selectMenu: {
    position: 'absolute !important',
  },
});

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button color="primary" onClick={onExecute} title="Create new row">
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const availableValues = {
  // eslint-disable-next-line no-undef
  firstName: globalUsersValues.firstName,
  // eslint-disable-next-line no-undef
  lastName: globalUsersValues.lastName,
  // eslint-disable-next-line no-undef
  login: globalUsersValues.login,
  // eslint-disable-next-line no-undef
  status: globalUsersValues.status,
};

const LookupEditCellBase = ({
  availableColumnValues,
  value,
  onValueChange,
  classes,
}) => (
  <TableCell className={classes.lookupEditCell}>
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      MenuProps={{
        className: classes.selectMenu,
      }}
      input={<Input classes={{ root: classes.inputRoot }} />}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);
export const LookupEditCell = withStyles(styles, {
  name: 'ControlledModeDemo',
})(LookupEditCellBase);

const Cell = props => {
  const { column } = props;
  if (column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

const EditCell = props => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return (
      <LookupEditCell
        {...props}
        availableColumnValues={availableColumnValues}
      />
    );
  }
  return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

export function AdminUsers() {
  const [columns] = useState([
    { name: 'lastName', title: 'Lastname' },
    { name: 'surName', title: 'Surname' },
    { name: 'login', title: 'Login' },
    { name: 'status', title: 'Status' },
  ]);
  const [rows, setRows] = useState(
    // eslint-disable-next-line no-undef
    generateRows({
      // eslint-disable-next-line no-undef
      columnValues: { id: ({ index }) => index, ...globalUsersValues },
      length: 12,
    }),
  );
  const [tableColumnExtensions] = useState([
    { columnName: 'lastName', width: 200 },
    { columnName: 'surName', width: 180 },
    { columnName: 'login', width: 180 },
    { columnName: 'status', width: 180 },
  ]);
  const [sorting, getSorting] = useState([]);
  const [editingRowIds, getEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const [columnOrder, setColumnOrder] = useState([
    'lastName',
    'surName',
    'login',
    'status',
  ]);
  const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);


  const changeAddedRows = value =>
    setAddedRows(
      value.map(row =>
        Object.keys(row).length
          ? row
          : {
            lastName: availableValues.lastName[0],
            surName: availableValues.surName[0],
            login: availableValues.login[0],
            status: availableValues.status[0],
          },
      ),
    );

  const deleteRows = deletedIds => {
    const rowsForDelete = rows.slice();
    deletedIds.forEach(rowId => {
      const index = rowsForDelete.findIndex(row => row.id === rowId);
      if (index > -1) {
        rowsForDelete.splice(index, 1);
      }
    });
    return rowsForDelete;
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row,
      );
    }
    if (deleted) {
      changedRows = deleteRows(deleted);
    }
    setRows(changedRows);
  };

  return (
    <div className="AdminUsers">
      <h2>User list</h2>
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <SortingState sorting={sorting} onSortingChange={getSorting} />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={getEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            onCommitChanges={commitChanges}
          />

          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSummary />


          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={setColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={170}
            showAddCommand={!addedRows.length}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
          />
          <TableSummaryRow />
          <TableFixedColumns leftColumns={leftFixedColumns} />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </Paper>
    </div>
  );
}

AdminUsers.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

LookupEditCellBase.propTypes = {
  availableColumnValues: PropTypes.array,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  classes: PropTypes.object,
};

AddButton.propTypes = { onExecute: PropTypes.func };
EditButton.propTypes = { onExecute: PropTypes.func };
DeleteButton.propTypes = { onExecute: PropTypes.func };
CommitButton.propTypes = { onExecute: PropTypes.func };
CancelButton.propTypes = { onExecute: PropTypes.func };
Command.propTypes = { onExecute: PropTypes.func, id: PropTypes.string };
Cell.propTypes = { column: PropTypes.object };
EditCell.propTypes = { column: PropTypes.object };

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminUsers);
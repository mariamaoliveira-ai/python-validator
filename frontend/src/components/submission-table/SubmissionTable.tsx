import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { type Submission } from '../../api/validatorApi';


function SubmissionTable({ submissions }: { submissions: Submission[] }){
    if (submissions.length === 0) {
        return <p>No submissions found</p>;
    }
    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">File Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Result Execution</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((row) => (
            <TableRow
              key={row.student_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.student_name}
                </TableCell>
                <TableCell align="right">
                    {row.file_name}
                    </TableCell>
                <TableCell align="center">
                    <span className={row.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}>
                    {row.status}
                    </span>
                </TableCell>
                <TableCell align="right">
                    {row.result_execution}
                    </TableCell>
                <TableCell align="right">
                {format(new Date(row.created_at), 'dd-MM-yyyy HH:mm:ss')}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SubmissionTable;
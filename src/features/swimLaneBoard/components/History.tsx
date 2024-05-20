import CustomTable from '@/components/Table';
import { Block, Lane, Priority } from '@/types';

const HISTORY_COLUMNS = [
  { title: 'Name', field: 'name' },
  { title: 'Description', field: 'description' },
  {
    title: 'Priority',
    field: 'priority',
    render: (value: Priority) => value.label
  },
  { title: 'Status', field: 'status', render: (value: Lane) => value.name },
  { title: 'Release Date', field: 'releaseDate' }
];

type HistoryProps = {
  history: (Omit<Block, 'history' | 'id'> & { updatedOn: Date })[];
};

const History = ({ history = [] }: HistoryProps) => {
  return <CustomTable rows={history} columns={HISTORY_COLUMNS} isCompact />;
};

export default History;

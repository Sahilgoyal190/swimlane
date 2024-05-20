import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material';

import { addLaneAction } from '@/slices/lanesSlice';
import { RULES } from '@/constants';
import { useAppDispatch } from '@/store/dispatch';
import { Rule } from '@/types';

const SetupForm = () => {
  const [columnName, setColumnName] = useState('');
  const [rules, setNewRules] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleAddColumn = () => {
    if (columnName.trim()) {
      dispatch(
        addLaneAction({
          name: columnName,
          id: `${Date.now()}`,
          rules: RULES.filter(rule => rules.includes(rule.id)) as Rule[],
          blocks: []
        })
      );
      setColumnName('');
      setNewRules([]);
    }
  };

  const handleSetRules = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setNewRules(rules => [...rules, e.target.value]);
    } else {
      setNewRules(rules => rules.filter(rule => rule !== e.target.value));
    }
  };

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={6}>
        <TextField
          label='New Swimlane Name'
          variant='standard'
          value={columnName}
          onChange={e => setColumnName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          Mandatory Fields
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {RULES.map(rule => {
          return (
            <FormControlLabel
              key={rule.id}
              control={
                <Checkbox
                  size='small'
                  onChange={handleSetRules}
                  checked={rules.includes(rule.id)}
                  value={rule.id}
                />
              }
              label={rule.label}
            />
          );
        })}
      </Grid>

      <Grid item xs={12} alignItems='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={handleAddColumn}
          disabled={!columnName}
        >
          Add Swimlane
        </Button>
      </Grid>
    </Grid>
  );
};

export default SetupForm;

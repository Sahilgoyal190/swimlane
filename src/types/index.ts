export interface Rule {
  id: keyof Block;
  label: string;
}

export interface Lane {
  name: string;
  id: string;
  rules: Rule[];
  blocks: Block[];
}

export interface Priority {
  id: string;
  label: string;
}

export interface Block {
  id: string;
  name: string;
  description: string;
  status: Omit<Lane, 'blocks'>;
  priority: Priority;
  releaseDate: string;
  history: (Omit<Block, 'history' | 'id'> & { updatedOn: Date })[];
}

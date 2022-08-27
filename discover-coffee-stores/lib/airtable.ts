import Airtable, { FieldSet, Record, Records } from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID,
);

const table = base('coffee-stores');

const getMinifiedRecord = (record: Record<FieldSet>) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records: Records<FieldSet>) => {
  return records.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecords };

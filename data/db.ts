import {open} from '@op-engineering/op-sqlite';
import uuid from 'react-native-uuid';

const db_config = {
  name: 'test_sqlite',
};

export const db = open(db_config);

export const enablePragma = () => {
  db.execute('PRAGMA foreign_keys = ON;');
};

export const initDB = async () => {
  await db.transaction(async tx => {
    try {
      await tx.executeAsync(`        
        CREATE TABLE IF NOT EXISTS categories (
            id                 TEXT PRIMARY KEY NOT NULL,
            title              TEXT NOT NULL,
            created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (e) {
      console.log(e);
    }
  });
};

export type CategoryDTO = {
  id: string;
  title: string;
};

export const getAll = async (): Promise<CategoryDTO[]> => {
  const data = await db.executeAsync('SELECT * FROM categories', []);

  return data.rows?._array
    ? data.rows?._array.map((category: any) => {
        return {
          id: category.id,
          title: category.title,
        };
      })
    : ([] as CategoryDTO[]);
};

export const addCategory = async (title: string): Promise<string> => {
  const newId = uuid.v4();
  await db.executeAsync('INSERT INTO categories (id, title) values (?, ?)', [
    newId,
    title,
  ]);

  return newId.toString();
};

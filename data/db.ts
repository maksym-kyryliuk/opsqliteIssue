import {open, SQLBatchTuple} from '@op-engineering/op-sqlite';
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
      await tx.execute(`        
        CREATE TABLE IF NOT EXISTS categories (
            id                 TEXT PRIMARY KEY NOT NULL,
            title              TEXT NOT NULL,
            created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS records (
            id                    TEXT PRIMARY KEY NOT NULL,
            amount                REAL NOT NULL,
            converted_amount      REAL NULL,
            record_type           INTEGER NOT NULL,
            category_id           TEXT NOT NULL,
            created_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(category_id) REFERENCES categories(id)
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
  balance?: number;
};

export const getAll = async (): Promise<CategoryDTO[]> => {
  const {rows} = await db.execute(SQL_CATEGORIES_WITH_SUM, []);

  return rows?.length > 0
    ? rows.map((category: any) => {
        return {
          id: category.id,
          title: category.title,
          balance: category.balance,
        };
      })
    : ([] as CategoryDTO[]);
};

export const addCategory = async (title: string): Promise<string> => {
  const newId = uuid.v4();
  await db.execute('INSERT INTO categories (id, title) values (?, ?)', [
    newId,
    title,
  ]);

  return newId.toString();
};

export const updateCategory = async (category: CategoryDTO): Promise<void> => {
  await db.execute('UPDATE categories SET title = ? WHERE id = ?', [
    category.title,
    category.id,
  ]);
};

export const deleteCategory = async (id: string): Promise<void> => {
  const commands: SQLBatchTuple[] = [
    ['DELETE FROM records WHERE category_id = ?', [id]],
    ['DELETE FROM categories WHERE id = ?', [id]],
  ];
  await db.executeBatch(commands);
};

export const addCategoryWithRecords = async (
  throwError: boolean = false,
): Promise<void> => {
  const category_id = uuid.v4();

  await db.transaction(async tx => {
    try {
      var finalName = nameList[Math.floor(Math.random() * nameList.length)];
      await tx.execute('INSERT INTO categories (id, title) values (?, ?)', [
        category_id,
        finalName,
      ]);

      await tx.execute(
        'INSERT INTO records (id, amount, converted_amount, category_id, record_type) values (?, ?, ?, ?, ?)',
        [
          uuid.v4(),
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1),
          category_id,
          Math.round(Math.random()),
        ],
      );

      await tx.execute(
        'INSERT INTO records (id, amount, converted_amount, category_id, record_type) values (?, ?, ?, ?, ?)',
        [
          uuid.v4(),
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1),
          category_id,
          Math.round(Math.random()),
        ],
      );

      if (throwError) {
        throw new Error('Error thrown');
      }
      await tx.execute(
        'INSERT INTO records (id, amount, converted_amount, category_id, record_type) values (?, ?, ?, ?, ?)',
        [
          uuid.v4(),
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1),
          category_id,
          Math.round(Math.random()),
        ],
      );

      tx.commit();
    } catch (e) {
      tx.rollback();
    }
  });
};

export const SQL_CATEGORIES_WITH_SUM = `
  SELECT c.id, c.title,
    COALESCE(SUM(
      CASE
        WHEN r.record_type = 1 THEN COALESCE(r.converted_amount, r.amount)
        ELSE -COALESCE(r.converted_amount, r.amount) 
      END
    ), 0) AS balance
  FROM categories c
  LEFT JOIN records r ON c.id = r.category_id
  GROUP BY c.id`;

const nameList = [
  'Time',
  'Past',
  'Future',
  'Dev',
  'Fly',
  'Flying',
  'Soar',
  'Soaring',
  'Power',
  'Falling',
  'Fall',
  'Jump',
  'Cliff',
  'Mountain',
  'Rend',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Gold',
  'Demon',
  'Demonic',
  'Panda',
  'Cat',
  'Kitty',
  'Kitten',
  'Zero',
  'Memory',
  'Trooper',
  'XX',
  'Bandit',
  'Fear',
  'Light',
  'Glow',
  'Tread',
  'Deep',
  'Deeper',
  'Deepest',
  'Mine',
  'Your',
  'Worst',
  'Enemy',
  'Hostile',
  'Force',
  'Video',
  'Game',
  'Donkey',
  'Mule',
  'Colt',
  'Cult',
  'Cultist',
  'Magnum',
  'Gun',
  'Assault',
  'Recon',
  'Trap',
  'Trapper',
  'Redeem',
  'Code',
  'Script',
  'Writer',
  'Near',
  'Close',
  'Open',
  'Cube',
  'Circle',
  'Geo',
  'Genome',
  'Germ',
  'Spaz',
  'Shot',
  'Echo',
  'Beta',
  'Alpha',
  'Gamma',
  'Omega',
  'Seal',
  'Squid',
  'Money',
  'Cash',
  'Lord',
  'King',
  'Duke',
  'Rest',
  'Fire',
  'Flame',
  'Morrow',
  'Break',
  'Breaker',
  'Numb',
  'Ice',
  'Cold',
  'Rotten',
  'Sick',
  'Sickly',
  'Janitor',
  'Camel',
  'Rooster',
  'Sand',
  'Desert',
  'Dessert',
  'Hurdle',
  'Racer',
  'Eraser',
  'Erase',
  'Big',
  'Small',
  'Short',
  'Tall',
  'Sith',
  'Bounty',
  'Hunter',
  'Cracked',
  'Broken',
  'Sad',
  'Happy',
  'Joy',
  'Joyful',
  'Crimson',
  'Destiny',
  'Deceit',
  'Lies',
  'Lie',
  'Honest',
  'Destined',
  'Bloxxer',
  'Hawk',
  'Eagle',
  'Hawker',
  'Walker',
  'Zombie',
  'Sarge',
  'Capt',
  'Captain',
  'Punch',
  'One',
  'Two',
  'Uno',
  'Slice',
  'Slash',
  'Melt',
  'Melted',
  'Melting',
  'Fell',
  'Wolf',
  'Hound',
  'Legacy',
  'Sharp',
  'Dead',
  'Mew',
  'Chuckle',
  'Bubba',
  'Bubble',
  'Sandwich',
  'Smasher',
  'Extreme',
  'Multi',
  'Universe',
  'Ultimate',
  'Death',
  'Ready',
  'Monkey',
  'Elevator',
  'Wrench',
  'Grease',
  'Head',
  'Theme',
  'Grand',
  'Cool',
  'Kid',
  'Boy',
  'Girl',
  'Vortex',
  'Paradox',
];

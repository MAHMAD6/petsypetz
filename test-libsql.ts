import { createClient } from '@libsql/client';

const dbPath = process.cwd() + '\\prisma\\dev.db';
const url = `file:${dbPath.replace(/\\/g, '/')}`;

console.log('Testing url:', url);

try {
  const client = createClient({ url });
  
  async function test() {
    try {
      const rs = await client.execute('SELECT * FROM Media LIMIT 1');
      console.log('Success:', rs);
    } catch (e) {
      console.error('Execute error:', e);
    }
  }
  
  test();
} catch (e) {
  console.error('Create error:', e);
}

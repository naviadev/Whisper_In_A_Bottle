import dotenv from 'dotenv';
dotenv.config();

describe('.env Define Test', () => {
  it('Define DB_HOST', () => {
    expect(process.env.DB_HOST).toBeDefined();
  });

  it('Define DB_PORT', () => {
    expect(process.env.DB_PORT).toBeDefined();
  });

  it('Define DB_USER', () => {
    expect(process.env.DB_USER).toBeDefined();
  });

  it('Defined DB_PASSWORD', () => {
    expect(process.env.DB_PASSWORD).toBeDefined();
  });

  it('Define DB_NAME', () => {
    expect(process.env.DB_NAME).toBeDefined();
  });
});

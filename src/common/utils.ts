import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class EnvConfig {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  FRONTEND_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_ISSUER: string;

  @IsString()
  @IsNotEmpty()
  JWT_AUDIENCE: string;

  @IsString()
  @IsNotEmpty()
  PORT: string;
}

export function validateConfig(config: Record<string, string>) {
  const envConfig = new EnvConfig();
  Object.assign(envConfig, config);

  const errors = validateSync(envConfig);

  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.toString()).join(', '));
  }
}

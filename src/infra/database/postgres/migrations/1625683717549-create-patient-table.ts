import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPatientTable1625683717549 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'birthDate',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'height',
            type: 'int',
            isNullable: false
          },
          {
            name: 'weight',
            type: 'float',
            isNullable: false
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients')
    await queryRunner.query('DROP EXTENSION "uuid-ossp')
  }
}

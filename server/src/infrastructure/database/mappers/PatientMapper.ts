import { Patient as DomainPatient } from '../../../domain/entities/Patient';
import { Patient as TypeOrmPatient } from '../entities/Patient';
import { Name } from '../../../domain/value-objects/Name';
import { DateOfBirth } from '../../../domain/value-objects/DateOfBirth';

export class PatientMapper {
  static toDomain(typeOrmPatient: TypeOrmPatient): DomainPatient {
    return new DomainPatient(
      typeOrmPatient.id,
      new Name(typeOrmPatient.name),
      new DateOfBirth(typeOrmPatient.dob),
      [], // Notes will be loaded separately
      typeOrmPatient.createdAt,
      typeOrmPatient.updatedAt
    );
  }

  static toTypeOrm(domainPatient: DomainPatient): TypeOrmPatient {
    const typeOrmPatient = new TypeOrmPatient();
    typeOrmPatient.id = domainPatient.id;
    typeOrmPatient.name = domainPatient.getName().getValue();
    typeOrmPatient.dob = domainPatient.getDob().getValue();
    typeOrmPatient.createdAt = domainPatient.createdAt;
    typeOrmPatient.updatedAt = domainPatient.getUpdatedAt();
    return typeOrmPatient;
  }
} 
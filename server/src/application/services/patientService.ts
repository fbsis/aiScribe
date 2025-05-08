import { PrismaClient } from '@prisma/client';
import { Patient } from '@prisma/client';

export class PatientService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllPatients(): Promise<Patient[]> {
    return this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPatientById(id: string): Promise<Patient | null> {
    return this.prisma.patient.findUnique({
      where: { id },
      include: {
        notes: {
          include: {
            audioFile: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async createPatient(data: { name: string; dob: Date }): Promise<Patient> {
    return this.prisma.patient.create({
      data,
    });
  }

  async updatePatient(
    id: string,
    data: Partial<{ name: string; dob: Date }>
  ): Promise<Patient | null> {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async deletePatient(id: string): Promise<boolean> {
    try {
      await this.prisma.patient.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
} 
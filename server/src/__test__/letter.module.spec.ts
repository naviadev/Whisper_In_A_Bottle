import { Test, TestingModule } from '@nestjs/testing';
import { letterModule } from '../letter/letter.module'; // 경로를 실제 경로로 수정하세요
import { letterGateway } from '../letter/letter.gateway'; // 경로를 실제 경로로 수정하세요

describe('letterModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [letterModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  describe('letterGateway', () => {
    let gateway: letterGateway;

    beforeEach(() => {
      gateway = module.get<letterGateway>(letterGateway);
    });

    it('should be defined', () => {
      expect(gateway).toBeDefined();
    });
  });
});
